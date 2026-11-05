// WaveSurfer regions for holds and comments: draw layers, overlays, toggles, and comment drag-selection lifecycle.

import { type ComputedRef, nextTick, type Ref, ref } from 'vue';
import type WaveSurfer from 'wavesurfer.js';
import type RegionsPlugin from 'wavesurfer.js/plugins/regions';
import type { Region } from 'wavesurfer.js/plugins/regions';
import hsNoteIcon from '@/app/assets/icons/sprite/hs-note.svg?raw';

import type {
	CallWaveCallRecord,
	CommentDragSelectionOptions,
	NewCommentDraft,
	WaveAnnotation,
} from '../call-wave.types';
import { createCommentTooltipContent } from './commentTooltipFactory';
import { getCallHoldsOnWaveform } from './holdTimelinePosition';
import { annotationSecondsToInt } from './useCallWaveAnnotations';
import {
	adjustCommentTooltipPosition,
	mountRegionIconOverlay,
} from './waveRegionIcons';

const COMMENT_REGION_ID_PREFIX = 'comment-';
const HOLD_REGION_ID_PREFIX = 'hold-';

// Color tokens have no hsl-channel twins, so region transparency is mixed in.
const HOLD_RANGE_COLOR =
	'color-mix(in srgb, var(--call-wave-hold-color) 20%, transparent)';
// Zero-length regions are drawn as a thin line, so they need a solid color to be seen.
const HOLD_POINT_COLOR = 'var(--call-wave-hold-color)';

export interface UseCallWaveRegionsOptions {
	regionsPlugin: RegionsPlugin;
	getPlayer: () => WaveSurfer | null | undefined;
	call: Ref<CallWaveCallRecord>;
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

	function updateDraftSelectionRange(startSec: number, endSec: number) {
		const draftRegion = regionsPlugin
			.getRegions()
			.find((region) => !isHoldRegion(region) && !isCommentRegion(region));
		if (!draftRegion) {
			return;
		}
		const normalizedStartSec = Math.max(0, Math.min(startSec, endSec));
		const normalizedEndSec = Math.max(
			normalizedStartSec,
			Math.max(startSec, endSec),
		);
		draftRegion.setOptions({
			start: normalizedStartSec,
			end: normalizedEndSec,
		});
	}

	async function displayCommentIcons(region: Region, comment: WaveAnnotation) {
		const player = getPlayer();
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

		// Tooltip position reads layout; run after the overlay is in the DOM.
		await nextTick();
		adjustCommentTooltipPosition(iconMountElement, region, player, 300);
	}

	async function displayComments(annotations: WaveAnnotation[]) {
		for (const comment of annotations) {
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
			await displayCommentIcons(region, comment);
		}
	}

	function renderHoldsLayer() {
		clearHoldRegions();
		if (!showHolds.value) {
			return;
		}
		const durationSec = getPlayer()?.getDuration() ?? 0;
		getCallHoldsOnWaveform(call.value, durationSec).forEach(
			({ start, end }, index) => {
				const isPoint = start === end;
				const region = regionsPlugin.addRegion({
					id: `${HOLD_REGION_ID_PREFIX}${index}`,
					start,
					end,
					color: isPoint ? HOLD_POINT_COLOR : HOLD_RANGE_COLOR,
					resize: false,
					drag: false,
				});
				// Read-only regions must let drag-selection and seeking through to the waveform underneath.
				region.element?.style.setProperty('pointer-events', 'none');
			},
		);
	}

	async function renderCommentsLayer() {
		clearCommentRegions();
		if (!showComments.value || !commentsSize.value) {
			return;
		}
		await displayComments(annotations.value);
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

	async function updateRegions() {
		closeCommentMode();
		await renderCommentsLayer();
	}

	async function toggleComments() {
		showComments.value = !showComments.value;
		await renderCommentsLayer();
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
		renderHoldsLayer,
		updateRegions,
		updateDraftSelectionRange,
		blockRegionResize,
		closeCommentMode,
	};
}
