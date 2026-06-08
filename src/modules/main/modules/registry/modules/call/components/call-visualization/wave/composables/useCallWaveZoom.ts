// Zoom level state (px/s), zoom in/out actions, and syncing from WaveSurfer zoom events.
import { type ComputedRef, computed, ref } from 'vue';
import type WaveSurfer from 'wavesurfer.js';

type WaveSurferGetter = () => WaveSurfer | null | undefined;

const MAX_ZOOM_PX_PER_SEC = 20000;
const MIN_ZOOM_PX_PER_SEC = 0.001;

export function useCallWaveZoom(getPlayer: WaveSurferGetter) {
	const minPxPerSec = ref(0);

	const zoomInDisabled: ComputedRef<boolean> = computed(
		() => minPxPerSec.value > MAX_ZOOM_PX_PER_SEC,
	);
	const zoomOutDisabled: ComputedRef<boolean> = computed(() => {
		if (minPxPerSec.value === 0) {
			return true;
		}
		return minPxPerSec.value < MIN_ZOOM_PX_PER_SEC;
	});

	function naturalPxPerSec(): number {
		const waveSurfer = getPlayer();
		const duration = waveSurfer?.getDuration();
		const width = waveSurfer?.getWidth();
		if (!duration || !width) return 0;
		return width / duration;
	}

	function resetZoom() {
		minPxPerSec.value = 0;
		const waveSurfer = getPlayer();
		if (!waveSurfer) return;
		const natural = naturalPxPerSec();
		if (natural > 0) {
			waveSurfer.zoom(natural);
		}
	}

	function increaseZoom() {
		const waveSurfer = getPlayer();
		if (!waveSurfer) return;
		const base = minPxPerSec.value || naturalPxPerSec();
		minPxPerSec.value = base * 2;
		waveSurfer.zoom(minPxPerSec.value);
	}

	function decreaseZoom() {
		const waveSurfer = getPlayer();
		if (!waveSurfer) return;
		const base = minPxPerSec.value || naturalPxPerSec();
		minPxPerSec.value = Math.max(base / 2, MIN_ZOOM_PX_PER_SEC);
		waveSurfer.zoom(minPxPerSec.value);
	}

	function syncZoomValue(minPxPerSecFromWaveSurfer: number) {
		minPxPerSec.value = minPxPerSecFromWaveSurfer;
	}

	return {
		minPxPerSec,
		zoomInDisabled,
		zoomOutDisabled,
		resetZoom,
		increaseZoom,
		decreaseZoom,
		syncZoomValue,
	};
}
