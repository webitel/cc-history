import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { type ComputedRef, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Store } from 'vuex';
import type WaveSurfer from 'wavesurfer.js';

import type {
	CommentFormDraft,
	NewCommentDraft,
	WaveAnnotation,
} from '../call-wave.types';
import {
	annotationSecondsToInt,
	useCallWaveAnnotations,
} from './useCallWaveAnnotations';
import type { useCallWaveRegions } from './useCallWaveRegions';

interface UseCallWaveCommentsOptions {
	store: Store<unknown>;
	callId: string;
	currentFileId: ComputedRef<string>;
	getPlayer: () => WaveSurfer | null | undefined;
	regions: ReturnType<typeof useCallWaveRegions>;
}

export function useCallWaveComments({
	store,
	callId,
	currentFileId,
	getPlayer,
	regions,
}: UseCallWaveCommentsOptions) {
	const { t } = useI18n();
	const { saveComment, deleteComment } = useCallWaveAnnotations(
		store,
		callId,
		currentFileId,
	);
	const deleteConfirmation = useDeleteConfirmationPopup();

	const newComment = ref<NewCommentDraft | null>(null);
	const isAddingComment = ref(false);
	const isRangeSaving = ref(false);

	function getCallDurationSec(): number {
		return Math.round(getPlayer()?.getDuration() ?? 0);
	}

	function openAddNote() {
		const selectedRange = regions.getDraftRange();
		const cursorSec = annotationSecondsToInt(getPlayer()?.getCurrentTime());
		const startSec = selectedRange ? selectedRange.startSec : cursorSec;
		const endSec = selectedRange ? selectedRange.endSec : cursorSec;

		newComment.value = {
			fileId: currentFileId.value,
			startSec: String(startSec),
			endSec: String(endSec),
			note: '',
		};
	}

	function closeAddNote() {
		newComment.value = null;
		regions.clearDraftSelectionRegions();
	}

	async function addComment(draft: CommentFormDraft) {
		isAddingComment.value = true;
		const isSaved = await saveComment(draft);
		isAddingComment.value = false;

		if (isSaved) {
			closeAddNote();
		}
	}

	function saveCommentNote(comment: WaveAnnotation, note: string) {
		return saveComment(
			{
				...comment,
				note,
			},
			{
				errorText: t('registry.call.wave.errorEditing'),
			},
		);
	}

	async function saveCommentRange() {
		const comment = regions.rangeEditComment.value;
		const newRange = regions.getRangeEditValue();
		if (!comment || !newRange) {
			return;
		}

		isRangeSaving.value = true;
		const isSaved = await saveComment(
			{
				...comment,
				...newRange,
			},
			{
				successText: t('registry.call.wave.editSuccessful'),
				errorText: t('registry.call.wave.errorEditing'),
			},
		);
		isRangeSaving.value = false;

		if (isSaved) {
			regions.stopRangeEdit();
		}
	}

	function askCommentDeleteConfirmation(comment: WaveAnnotation) {
		deleteConfirmation.askDeleteConfirmation({
			deleted: comment,
			callback: () => deleteComment(comment),
		});
	}

	function resetCommentActions() {
		regions.stopRangeEdit();
		closeAddNote();
	}

	return {
		newComment,
		isAddingComment,
		isRangeSaving,
		deleteConfirmation,
		getCallDurationSec,
		openAddNote,
		closeAddNote,
		addComment,
		saveCommentNote,
		saveCommentRange,
		askCommentDeleteConfirmation,
		resetCommentActions,
	};
}
