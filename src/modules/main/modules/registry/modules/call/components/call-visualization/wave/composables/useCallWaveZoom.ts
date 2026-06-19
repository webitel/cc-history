// Zoom level state (px/s), zoom actions, and timeline label spacing synced to zoom.
import { type ComputedRef, computed, ref } from 'vue';
import type WaveSurfer from 'wavesurfer.js';
import type TimelinePlugin from 'wavesurfer.js/plugins/timeline';

import { applyTimelineIntervals } from './timelineIntervals';

type WaveSurferGetter = () => WaveSurfer | null | undefined;

const MAX_ZOOM_PX_PER_SEC = 20000;
const MIN_ZOOM_PX_PER_SEC = 0.001;

export function useCallWaveZoom(
	getPlayer: WaveSurferGetter,
	timelinePlugin?: TimelinePlugin,
) {
	const minPxPerSec = ref(0);
	const unsubscribeFns: Array<() => void> = [];

	const zoomInDisabled: ComputedRef<boolean> = computed(
		() => minPxPerSec.value > MAX_ZOOM_PX_PER_SEC,
	);
	const zoomOutDisabled: ComputedRef<boolean> = computed(() => {
		if (minPxPerSec.value === 0) {
			return true;
		}
		return minPxPerSec.value < MIN_ZOOM_PX_PER_SEC;
	});

	function syncTimelineIntervals(pxPerSec: number) {
		if (!timelinePlugin) {
			return;
		}
		applyTimelineIntervals(timelinePlugin, pxPerSec);
	}

	function naturalPxPerSec(): number {
		const waveSurfer = getPlayer();
		const duration = waveSurfer?.getDuration();
		const width = waveSurfer?.getWidth();
		if (!duration || !width) return 0;
		return width / duration;
	}

	function zoomTo(pxPerSec: number) {
		const waveSurfer = getPlayer();
		if (!waveSurfer) {
			return;
		}
		syncTimelineIntervals(pxPerSec);
		waveSurfer.zoom(pxPerSec);
	}

	function resetZoom() {
		minPxPerSec.value = 0;
		const natural = naturalPxPerSec();
		if (natural > 0) {
			zoomTo(natural);
		}
	}

	function increaseZoom() {
		const base = minPxPerSec.value || naturalPxPerSec();
		minPxPerSec.value = base * 2;
		zoomTo(minPxPerSec.value);
	}

	function decreaseZoom() {
		const base = minPxPerSec.value || naturalPxPerSec();
		minPxPerSec.value = Math.max(base / 2, MIN_ZOOM_PX_PER_SEC);
		zoomTo(minPxPerSec.value);
	}

	function syncZoomValue(minPxPerSecFromWaveSurfer: number) {
		minPxPerSec.value = minPxPerSecFromWaveSurfer;
	}

	function attachTimelineSync() {
		const waveSurfer = getPlayer();
		if (!waveSurfer || !timelinePlugin) {
			return;
		}

		// `renderer.zoom()` redraws before the `zoom` event; re-render for wheel/pinch zoom.
		unsubscribeFns.push(
			waveSurfer.on('zoom', (pxPerSec) => {
				syncTimelineIntervals(pxPerSec);
				requestAnimationFrame(() => {
					getPlayer()?.getRenderer().reRender();
				});
			}),
		);
	}

	function detachTimelineSync() {
		unsubscribeFns.forEach((unsubscribe) => unsubscribe());
		unsubscribeFns.length = 0;
	}

	return {
		minPxPerSec,
		zoomInDisabled,
		zoomOutDisabled,
		resetZoom,
		increaseZoom,
		decreaseZoom,
		syncZoomValue,
		attachTimelineSync,
		detachTimelineSync,
	};
}
