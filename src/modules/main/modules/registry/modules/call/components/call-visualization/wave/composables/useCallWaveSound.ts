// Web Audio routing for stereo/mono, per-channel gain, play state, and volume slider handlers.
import { reactive, ref, type Ref } from 'vue';
import type WaveSurfer from 'wavesurfer.js';

export type WaveSurferGetter = () => WaveSurfer | null | undefined;

export function useCallWaveSound(getPlayer: WaveSurferGetter) {
	const volumeLeftGain = ref(1);
	const volumeRightGain = ref(1);
	const isPlaying = ref(false);

	const audioContext: Ref<AudioContext | null> = ref(null);
	const mediaSourceNode: Ref<MediaElementAudioSourceNode | null> = ref(null);
	const soundOptions = reactive<{
		splitter: ChannelSplitterNode | null;
		merger: ChannelMergerNode | null;
		leftGain: GainNode | null;
		rightGain: GainNode | null;
	}>({
		splitter: null,
		merger: null,
		leftGain: null,
		rightGain: null,
	});

	const leftGain = reactive({
		disabled: false,
		muted: false,
		name: 'A',
		audio: null as GainNode | null,
	});
	const rightGain = reactive({
		disabled: true,
		muted: false,
		name: 'B',
		audio: null as GainNode | null,
	});

	let soundListenersRegistered = false;

	function initChannelAudioGraph() {
		const player = getPlayer();
		if (audioContext.value || !player) {
			return;
		}
		const media = player.getMediaElement();
		const decoded = player.getDecodedData();
		const channels = decoded?.numberOfChannels ?? 2;

		const context = new AudioContext();
		audioContext.value = context;
		const source = context.createMediaElementSource(media);
		mediaSourceNode.value = source;

		if (channels >= 2) {
			const splitter = context.createChannelSplitter(2);
			const merger = context.createChannelMerger(2);
			const leftChannelGainNode = context.createGain();
			const rightChannelGainNode = context.createGain();
			soundOptions.splitter = splitter;
			soundOptions.merger = merger;
			soundOptions.leftGain = leftChannelGainNode;
			soundOptions.rightGain = rightChannelGainNode;
			leftGain.audio = leftChannelGainNode;
			rightGain.audio = rightChannelGainNode;
			rightGain.disabled = false;

			source.connect(splitter);
			splitter.connect(leftChannelGainNode, 0);
			splitter.connect(rightChannelGainNode, 1);
			leftChannelGainNode.connect(merger, 0, 0);
			rightChannelGainNode.connect(merger, 0, 1);
			merger.connect(context.destination);
		} else {
			const monoChannelGainNode = context.createGain();
			soundOptions.leftGain = monoChannelGainNode;
			leftGain.audio = monoChannelGainNode;
			rightGain.disabled = true;
			source.connect(monoChannelGainNode);
			monoChannelGainNode.connect(context.destination);
		}

		volumeLeftGain.value = 1;
		volumeRightGain.value = 1;
		if (leftGain.audio) {
			leftGain.audio.gain.value = 1;
		}
		if (rightGain.audio) {
			rightGain.audio.gain.value = 1;
		}
	}

	function resumeAudioContext() {
		if (audioContext.value?.state === 'suspended') {
			void audioContext.value.resume();
		}
	}

	function destroyChannelAudio() {
		mediaSourceNode.value?.disconnect();
		mediaSourceNode.value = null;
		soundOptions.splitter?.disconnect();
		soundOptions.merger?.disconnect();
		soundOptions.leftGain?.disconnect();
		soundOptions.rightGain?.disconnect();
		soundOptions.splitter = null;
		soundOptions.merger = null;
		soundOptions.leftGain = null;
		soundOptions.rightGain = null;
		if (audioContext.value) {
			void audioContext.value.close();
			audioContext.value = null;
		}
		leftGain.audio = null;
		rightGain.audio = null;
	}

	function onLoad() {
		const player = getPlayer();
		if (soundListenersRegistered || !player) {
			return;
		}
		soundListenersRegistered = true;
		player.on('play', resumeAudioContext);
	}

	function changedPlaying() {
		const player = getPlayer();
		isPlaying.value = player?.isPlaying() ?? false;
	}

	function playPause() {
		void getPlayer()?.playPause();
	}

	function redraw() {
		getPlayer()?.getRenderer()?.reRender();
	}

	function volumeLeftChangeHandler(value: number) {
		volumeLeftGain.value = value;
		leftGain.muted = !volumeLeftGain.value;
		if (leftGain.audio) {
			leftGain.audio.gain.value = value;
		}
	}

	function volumeRightChangeHandler(value: number) {
		volumeRightGain.value = value;
		rightGain.muted = !volumeRightGain.value;
		if (rightGain.audio) {
			rightGain.audio.gain.value = value;
		}
	}

	return {
		volumeLeftGain,
		volumeRightGain,
		isPlaying,
		leftGain,
		rightGain,
		initChannelAudioGraph,
		resumeAudioContext,
		destroyChannelAudio,
		onLoad,
		changedPlaying,
		playPause,
		redraw,
		volumeLeftChangeHandler,
		volumeRightChangeHandler,
	};
}
