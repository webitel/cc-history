import { eventBus } from '@webitel/ui-sdk/scripts';
import type { ComputedRef } from 'vue';
import type { Store } from 'vuex';
import type { WaveAnnotation } from '../call-wave.types';

export function annotationSecondsToInt(
	value: number | string | undefined,
): number {
	const numericValue = Number(value);
	if (!Number.isFinite(numericValue)) {
		return 0;
	}
	return Math.round(Math.max(0, numericValue));
}

export function getCommentAuthorName(comment: WaveAnnotation): string {
	return comment.createdBy?.name || comment.createdBy?.id || '';
}

interface SaveCommentMessages {
	successText?: string;
	errorText?: string;
}

export function useCallWaveAnnotations(
	store: Store<unknown>,
	callId: string,
	currentFileId: ComputedRef<string>,
) {
	async function saveComment(
		draft: WaveAnnotation,
		{ successText, errorText }: SaveCommentMessages = {},
	): Promise<boolean> {
		try {
			await store.dispatch(
				draft.id
					? 'registry/call/EDIT_ANNOTATION'
					: 'registry/call/ADD_ANNOTATION',
				{
					callId,
					...draft,
					fileId: draft.fileId || currentFileId.value,
					startSec: annotationSecondsToInt(draft.startSec),
					endSec: annotationSecondsToInt(draft.endSec),
				},
			);
			if (successText) {
				eventBus.$emit('notification', {
					type: 'success',
					text: successText,
				});
			}
			return true;
		} catch (error) {
			eventBus.$emit('notification', {
				type: 'error',
				text: errorText || (error as Error).message,
			});
			return false;
		}
	}

	async function deleteComment(comment: WaveAnnotation) {
		if (!comment.id) {
			return;
		}
		try {
			await store.dispatch('registry/call/DELETE_ANNOTATION', {
				id: comment.id,
				callId,
			});
		} catch (error) {
			eventBus.$emit('notification', {
				type: 'error',
				text: (error as Error).message,
			});
		}
	}

	return {
		saveComment,
		deleteComment,
	};
}
