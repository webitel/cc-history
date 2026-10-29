// Web Audio routing for stereo/mono, per-channel gain, play state, and volume slider handlers.
import { reactive, ref } from 'vue';
import type WaveSurfer from 'wavesurfer.js';

type WaveSurferGetter = () => WaveSurfer | null | undefined;

export function useCallWaveSound(getPlayer: WaveSurferGetter) {
	const volumeLeftGain = ref(1);
	const volumeRightGain = ref(1);
	const isPlaying = ref(false);

	const leftGain = reactive({
		disabled: false,
		muted: false,
	});
	const rightGain = reactive({
		disabled: true,
		muted: false,
	});

	// Audio nodes are not rendered, so they stay out of Vue reactivity.
	let audioContext: AudioContext | null = null;
	let audioNodes: AudioNode[] = [];
	let leftGainNode: GainNode | null = null;
	let rightGainNode: GainNode | null = null;
	let soundListenersRegistered = false;

	function initChannelAudioGraph() {
		const player = getPlayer();
		if (audioContext || !player) {
			return;
		}
		const channels = player.getDecodedData()?.numberOfChannels ?? 2;

		audioContext = new AudioContext();
		const source = audioContext.createMediaElementSource(
			player.getMediaElement(),
		);
		leftGainNode = audioContext.createGain();

		if (channels >= 2) {
			const splitter = audioContext.createChannelSplitter(2);
			const merger = audioContext.createChannelMerger(2);
			rightGainNode = audioContext.createGain();
			rightGain.disabled = false;

			source.connect(splitter);
			splitter.connect(leftGainNode, 0);
			splitter.connect(rightGainNode, 1);
			leftGainNode.connect(merger, 0, 0);
			rightGainNode.connect(merger, 0, 1);
			merger.connect(audioContext.destination);
			audioNodes = [
				source,
				splitter,
				merger,
				leftGainNode,
				rightGainNode,
			];
		} else {
			rightGain.disabled = true;
			source.connect(leftGainNode);
			leftGainNode.connect(audioContext.destination);
			audioNodes = [
				source,
				leftGainNode,
			];
		}
	}

	async function resumeAudioContext() {
		if (audioContext?.state === 'suspended') {
			await audioContext.resume();
		}
	}

	async function destroyChannelAudio() {
		audioNodes.forEach((node) => {
			node.disconnect();
		});
		audioNodes = [];
		leftGainNode = null;
		rightGainNode = null;
		await audioContext?.close();
		audioContext = null;
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
		isPlaying.value = getPlayer()?.isPlaying() ?? false;
	}

	async function playPause() {
		await getPlayer()?.playPause();
	}

	function volumeLeftChangeHandler(value: number) {
		volumeLeftGain.value = value;
		leftGain.muted = !value;
		if (leftGainNode) {
			leftGainNode.gain.value = value;
		}
	}

	function volumeRightChangeHandler(value: number) {
		volumeRightGain.value = value;
		rightGain.muted = !value;
		if (rightGainNode) {
			rightGainNode.gain.value = value;
		}
	}

	return {
		volumeLeftGain,
		volumeRightGain,
		isPlaying,
		leftGain,
		rightGain,
		initChannelAudioGraph,
		destroyChannelAudio,
		onLoad,
		changedPlaying,
		playPause,
		volumeLeftChangeHandler,
		volumeRightChangeHandler,
	};
}
