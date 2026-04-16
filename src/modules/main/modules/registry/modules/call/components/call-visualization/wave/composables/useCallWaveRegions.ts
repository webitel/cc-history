// WaveSurfer regions for holds and comments: draw layers, overlays, toggles, and comment drag-selection lifecycle.
import { getIconFromRepository } from '@webitel/ui-sdk/icons';
import { convertDuration } from '@webitel/ui-sdk/scripts';
import type { Region } from 'wavesurfer.js/plugins/regions';
import type RegionsPlugin from 'wavesurfer.js/plugins/regions';
import type WaveSurfer from 'wavesurfer.js';
import { nextTick, ref, type ComputedRef, type Ref } from 'vue';
import hsNoteIcon from '@/app/assets/icons/sprite/hs-note.svg?raw';

import type {
	CallHoldItem,
	CallWaveCallRecord,
	CommentDragSelectionOptions,
	NewCommentDraft,
	WaveAnnotation,
} from '../call-wave.types';
import {
	adjustCommentTooltipPosition,
	mountRegionIconOverlay,
} from './waveRegionIcons';
import { createCommentTooltipContent } from './commentTooltipFactory';
import { mapHoldToWaveformSeconds } from './holdTimelinePosition';
import { annotationSecondsToInt } from './useCallWaveAnnotations';
const pauseIcon = getIconFromRepository('pause') || '';

const COMMENT_REGION_ID_PREFIX = 'comment-';
const HOLD_REGION_ID_PREFIX = 'hold-';

// Registry exposes `createdAt` as a formatted string, not epoch ms; parse for hold math vs `audioFile.startAt`.
function convertCreatedAtToTimestamp(createdAt: string) {
	const [datePart, timePart] = createdAt.split(', ');
	const [day, month, year] = datePart.split('.');
	const [hours, minutes, seconds] = timePart.split(':');

	return new Date(
		Number(year),
		Number(month) - 1,
		Number(day),
		Number(hours),
		Number(minutes),
		Number(seconds),
	).getTime();
}

export interface UseCallWaveRegionsOptions {
	regionsPlugin: RegionsPlugin;
	getPlayer: () => WaveSurfer | null | undefined;
	call: Ref<CallWaveCallRecord>;
	holdsSize: ComputedRef<number>;
	commentsSize: ComputedRef<number>;
	annotations: ComputedRef<WaveAnnotation[]>;
	editAnnotation: (comment: WaveAnnotation) => void;
	commentsMode: Ref<boolean>;
	selectedComment: Ref<WaveAnnotation | NewCommentDraft | null>;
	dragSelectionCleanup: Ref<(() => void) | null>;
	commentDragOptions: CommentDragSelectionOptions;
}

export function useCallWaveRegions({
	regionsPlugin,
	getPlayer,
	call,
	holdsSize,
	commentsSize,
	annotations,
	editAnnotation,
	commentsMode,
	selectedComment,
	dragSelectionCleanup,
	commentDragOptions,
}: UseCallWaveRegionsOptions) {
	const showHolds = ref(false);
	const showComments = ref(false);

	function isCommentRegion(region: Region): boolean {
		return (
			typeof region.id === 'string' &&
			region.id.startsWith(COMMENT_REGION_ID_PREFIX)
		);
	}

	function isHoldRegion(region: Region): boolean {
		return (
			typeof region.id === 'string' &&
			region.id.startsWith(HOLD_REGION_ID_PREFIX)
		);
	}

	function clearCommentRegions() {
		regionsPlugin
			.getRegions()
			.filter(isCommentRegion)
			.forEach((region) => {
				region.remove();
			});
	}

	function clearHoldRegions() {
		regionsPlugin
			.getRegions()
			.filter(isHoldRegion)
			.forEach((region) => {
				region.remove();
			});
	}

	function clearDraftSelectionRegions() {
		regionsPlugin
			.getRegions()
			.filter((region) => !isHoldRegion(region) && !isCommentRegion(region))
			.forEach((region) => {
				region.remove();
			});
	}

	function blockRegionResize() {
		regionsPlugin.getRegions().forEach((region) => {
			region.setOptions({
				resize: false,
				drag: false,
			});
		});
	}

	function displayHoldIcons(
		region: Region,
		hold: CallHoldItem,
		player: WaveSurfer,
	) {
		mountRegionIconOverlay({
			region,
			player,
			iconFill: 'var(--hold-color)',
			iconInnerHtml: pauseIcon,
			tooltipWidth: 'auto',
			tooltipContent: hold.sec ? convertDuration(hold.sec) : '00:00:00',
		});
	}

	function displayHolds(holds: CallHoldItem[], player: WaveSurfer) {
		const audioFile = call.value.files.file_type_audio?.[0];
		if (!audioFile) {
			return;
		}
		const callCreatedAtMs = convertCreatedAtToTimestamp(call.value.createdAt);
		const actualAudioDuration = player.getDuration();

		let accumulatedHoldMs = 0;

		holds.forEach((holdItem, index) => {
			const { holdStartSeconds, nextAccumulatedHoldMs } =
				mapHoldToWaveformSeconds({
					hold: holdItem,
					audioFileStartAt: audioFile.startAt,
					audioFileStopAt: audioFile.stopAt,
					callCreatedAtMs,
					accumulatedHoldMs,
					actualAudioDurationSec: actualAudioDuration,
				});
			accumulatedHoldMs = nextAccumulatedHoldMs;

			const holdPositionSec = Number(holdStartSeconds.toFixed(2));
			const region = regionsPlugin.addRegion({
				id: `${HOLD_REGION_ID_PREFIX}${index}-${holdItem.start}-${holdItem.stop}`,
				start: holdPositionSec,
				end: holdPositionSec,
				color: 'var(--hold-color)',
				resize: false,
				drag: false,
			});

			displayHoldIcons(region, holdItem, player);
		});
	}

	function displayCommentIcons(region: Region, comment: WaveAnnotation) {
		if (!region.element) {
			return;
		}
		const player = getPlayer();
		if (!player) {
			return;
		}
		const iconMountElement = mountRegionIconOverlay({
			region,
			player,
			iconFill: 'var(--transfer-color)',
			iconInnerHtml: hsNoteIcon,
			tooltipWidth: '300px',
			tooltipContent: createCommentTooltipContent(comment),
			onIconClick: () => {
				editAnnotation(comment);
			},
		});
		if (!iconMountElement) {
			return;
		}

		// Tooltip position reads layout; run after the overlay is in the DOM.
		void nextTick(() => {
			adjustCommentTooltipPosition(iconMountElement, region, player, 300);
		});
	}

	function displayComments(annotations: WaveAnnotation[]) {
		annotations.forEach((comment) => {
			// `comment-` prefix: `region-created` ignores these (saved regions), user drags use other ids.
			const regionId = comment.id
				? `${COMMENT_REGION_ID_PREFIX}${comment.id}`
				: `${COMMENT_REGION_ID_PREFIX}${String(comment.startSec)}-${String(comment.endSec)}`;
			const startSec = annotationSecondsToInt(comment.startSec);
			const endSec = Math.max(annotationSecondsToInt(comment.endSec), startSec);
			const region = regionsPlugin.addRegion({
				id: regionId,
				start: startSec,
				end: endSec,
				color: 'hsla(var(--_transfer-color), 0.2)',
				resize: false,
				drag: false,
			});
			displayCommentIcons(region, comment);
		});
	}

	function renderHoldsLayer() {
		clearHoldRegions();
		const player = getPlayer();
		if (
			!player ||
			!showHolds.value ||
			!holdsSize.value ||
			!call.value.hold?.length
		) {
			return;
		}
		displayHolds(call.value.hold, player);
	}

	function renderCommentsLayer() {
		clearCommentRegions();
		if (!showComments.value || !commentsSize.value) {
			return;
		}
		displayComments(annotations.value);
	}

	function closeCommentMode() {
		commentsMode.value = false;
		selectedComment.value = null;
		clearDraftSelectionRegions();
		if (dragSelectionCleanup.value) {
			dragSelectionCleanup.value();
		}
		dragSelectionCleanup.value = regionsPlugin.enableDragSelection({
			...commentDragOptions,
		});
	}

	function updateRegions() {
		closeCommentMode();
		renderCommentsLayer();
	}

	function toggleComments() {
		showComments.value = !showComments.value;
		renderCommentsLayer();
	}

	function toggleHolds() {
		showHolds.value = !showHolds.value;
		renderHoldsLayer();
	}

	return {
		showHolds,
		showComments,
		toggleHolds,
		toggleComments,
		updateRegions,
		blockRegionResize,
		closeCommentMode,
	};
}
