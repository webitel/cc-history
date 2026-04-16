// Pure helpers: map CRM hold timestamps to seconds on the decoded audio timeline.
import type { CallHoldItem } from '../call-wave.types';

type HoldTimelineContext = {
	holdStartAt: number;
	audioFileStartAt: number;
	audioFileStopAt: number;
	callStartAtMs: number;
	accumulatedHoldMs: number;
	actualAudioDurationSec: number;
};

export function getHoldStartSeconds({
	holdStartAt,
	audioFileStartAt,
	audioFileStopAt,
	callStartAtMs,
	accumulatedHoldMs,
	actualAudioDurationSec,
}: HoldTimelineContext): number {
	if (holdStartAt < audioFileStartAt) {
		return 0;
	}
	if (holdStartAt >= audioFileStopAt) {
		return actualAudioDurationSec;
	}
	const offsetMs = holdStartAt - audioFileStartAt;
	const delayMs = audioFileStartAt - callStartAtMs;
	return (offsetMs - delayMs - accumulatedHoldMs) / 1000;
}

export type MapHoldToWaveformParams = {
	hold: CallHoldItem;
	audioFileStartAt: number;
	audioFileStopAt: number;
	callCreatedAtMs: number;
	accumulatedHoldMs: number;
	actualAudioDurationSec: number;
};

export type MapHoldToWaveformResult = {
	holdStartSeconds: number;
	nextAccumulatedHoldMs: number;
};

export function mapHoldToWaveformSeconds({
	hold,
	audioFileStartAt,
	audioFileStopAt,
	callCreatedAtMs,
	accumulatedHoldMs,
	actualAudioDurationSec,
}: MapHoldToWaveformParams): MapHoldToWaveformResult {
	const holdDurationMs = hold.stop - hold.start;

	if (hold.start < audioFileStartAt) {
		return {
			holdStartSeconds: 0,
			nextAccumulatedHoldMs: accumulatedHoldMs,
		};
	}
	if (hold.start >= audioFileStopAt) {
		return {
			holdStartSeconds: actualAudioDurationSec,
			nextAccumulatedHoldMs: accumulatedHoldMs,
		};
	}

	const holdStartSeconds = getHoldStartSeconds({
		holdStartAt: hold.start,
		audioFileStartAt,
		audioFileStopAt,
		callStartAtMs: callCreatedAtMs,
		accumulatedHoldMs,
		actualAudioDurationSec,
	});

	return {
		holdStartSeconds,
		nextAccumulatedHoldMs: accumulatedHoldMs + holdDurationMs,
	};
}
