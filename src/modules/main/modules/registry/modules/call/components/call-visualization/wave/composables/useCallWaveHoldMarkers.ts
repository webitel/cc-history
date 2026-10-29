import { convertDuration } from '@webitel/ui-sdk/scripts';
import { computed, type Ref } from 'vue';

import type { CallWaveCallRecord } from '../call-wave.types';
import { getCallHoldsOnWaveform } from './holdTimelinePosition';
import {
	isInVisibleWaveform,
	MARKER_GAP_PX,
	secondsToVisiblePx,
	spreadWithoutOverlap,
	type WaveformLayout,
} from './useWaveformLayout';

export const HOLD_ICON_SIZE_PX = 24;

export interface HoldMarker {
	key: string;
	leftPx: number;
	durationLabel: string;
}

interface UseCallWaveHoldMarkersOptions {
	call: Ref<CallWaveCallRecord>;
	layout: Ref<WaveformLayout | null>;
	durationSec: Ref<number>;
	showHolds: Ref<boolean>;
}

export function useCallWaveHoldMarkers({
	call,
	layout,
	durationSec,
	showHolds,
}: UseCallWaveHoldMarkersOptions) {
	// Recomputed only for another file, not on every zoom or scroll.
	const pointHolds = computed(() =>
		getCallHoldsOnWaveform(call.value, durationSec.value).filter(
			(hold) => hold.start === hold.end,
		),
	);

	const markers = computed<HoldMarker[]>(() => {
		const waveform = layout.value;
		if (!waveform || !showHolds.value) {
			return [];
		}

		const waveformStartPx = -waveform.scrollPx;
		// The icon sits left of the hold line, so it does not cover it; a hold at the very start has no room there.
		const iconLeftPositionsPx = pointHolds.value.map((hold) => {
			const linePx = secondsToVisiblePx(waveform, hold.start);
			const leftOfLinePx = linePx - HOLD_ICON_SIZE_PX - MARKER_GAP_PX;
			return leftOfLinePx < waveformStartPx
				? linePx + MARKER_GAP_PX
				: leftOfLinePx;
		});
		const leftPositionsPx = spreadWithoutOverlap(
			iconLeftPositionsPx,
			HOLD_ICON_SIZE_PX,
			MARKER_GAP_PX,
		);

		return pointHolds.value
			.map((hold, index) => ({
				key: `hold-${index}`,
				leftPx: leftPositionsPx[index],
				durationLabel: convertDuration(Math.round(hold.holdSec)),
			}))
			.filter(({ leftPx }) =>
				isInVisibleWaveform(waveform, leftPx, HOLD_ICON_SIZE_PX),
			);
	});

	return {
		markers,
	};
}
