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

		const ac = new AudioContext();
		audioContext.value = ac;
		const source = ac.createMediaElementSource(media);
		mediaSourceNode.value = source;

		if (channels >= 2) {
			const splitter = ac.createChannelSplitter(2);
			const merger = ac.createChannelMerger(2);
			const lg = ac.createGain();
			const rg = ac.createGain();
			soundOptions.splitter = splitter;
			soundOptions.merger = merger;
			soundOptions.leftGain = lg;
			soundOptions.rightGain = rg;
			leftGain.audio = lg;
			rightGain.audio = rg;
			rightGain.disabled = false;

			source.connect(splitter);
			splitter.connect(lg, 0);
			splitter.connect(rg, 1);
			lg.connect(merger, 0, 0);
			rg.connect(merger, 0, 1);
			merger.connect(ac.destination);
		} else {
			const lg = ac.createGain();
			soundOptions.leftGain = lg;
			leftGain.audio = lg;
			rightGain.disabled = true;
			source.connect(lg);
			lg.connect(ac.destination);
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
