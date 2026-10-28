import { type ComputedRef, computed, type Ref } from 'vue';

import type { WaveAnnotation } from '../call-wave.types';
import { annotationSecondsToInt } from './useCallWaveAnnotations';
import {
	MARKER_GAP_PX,
	secondsToVisiblePx,
	spreadWithoutOverlap,
	type WaveformLayout,
} from './useWaveformLayout';

export const COMMENT_MARKER_SIZE_PX = 56;
export const COMMENT_CARD_WIDTH_PX = 300;

export interface CommentMarker {
	key: string;
	comment: WaveAnnotation;
	leftPx: number;
}

function commentKey(comment: WaveAnnotation): string {
	return comment.id ?? `${comment.startSec}-${comment.endSec}`;
}

export function useCallWaveCommentMarkers(
	layout: Ref<WaveformLayout | null>,
	annotations: ComputedRef<WaveAnnotation[]>,
) {
	const markers = computed<CommentMarker[]>(() => {
		const waveform = layout.value;
		if (!waveform) {
			return [];
		}

		function getAvatarLeftPx(comment: WaveAnnotation): number {
			const startPx = secondsToVisiblePx(
				waveform,
				annotationSecondsToInt(comment.startSec),
			);
			const lastAvatarPx =
				waveform.waveformWidthPx - waveform.scrollPx - COMMENT_MARKER_SIZE_PX;
			return Math.min(startPx, lastAvatarPx);
		}

		function isVisible(leftPx: number): boolean {
			return (
				leftPx > -COMMENT_MARKER_SIZE_PX && leftPx < waveform.visibleWidthPx
			);
		}

		const commentsByStart = [
			...annotations.value,
		].sort(
			(a, b) =>
				annotationSecondsToInt(a.startSec) - annotationSecondsToInt(b.startSec),
		);

		const leftPositionsPx = spreadWithoutOverlap(
			commentsByStart.map(getAvatarLeftPx),
			COMMENT_MARKER_SIZE_PX,
			MARKER_GAP_PX,
		);

		return commentsByStart
			.map((comment, index) => ({
				key: commentKey(comment),
				comment,
				leftPx: leftPositionsPx[index],
			}))
			.filter(({ leftPx }) => isVisible(leftPx));
	});

	return {
		markers,
	};
}
