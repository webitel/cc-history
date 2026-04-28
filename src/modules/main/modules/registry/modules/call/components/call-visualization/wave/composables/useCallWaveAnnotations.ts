// Vuex dispatch for annotation CRUD and refreshing regions after save or delete.
import type { Store } from 'vuex';
import type { NewCommentDraft, WaveAnnotation } from '../call-wave.types';

type UpdateRegions = () => void | Promise<void>;

export function annotationSecondsToInt(
	value: number | string | undefined,
): number {
	const numericValue = Number(value);
	if (!Number.isFinite(numericValue)) {
		return 0;
	}
	return Math.round(Math.max(0, numericValue));
}

export function useCallWaveAnnotations(
	store: Store<unknown>,
	callId: string,
	updateRegions: UpdateRegions,
) {
	async function saveComment(draft: WaveAnnotation) {
		const startSec = annotationSecondsToInt(draft.startSec);
		const endSec = annotationSecondsToInt(draft.endSec);
		if (draft.id) {
			await store.dispatch('registry/call/EDIT_ANNOTATION', {
				callId,
				...draft,
				startSec,
				endSec,
			});
		} else {
			await store.dispatch('registry/call/ADD_ANNOTATION', {
				callId,
				...draft,
				startSec,
				endSec,
			});
		}
		await updateRegions();
	}

	async function deleteComment(
		selectedComment: WaveAnnotation | NewCommentDraft | null,
	) {
		const id =
			selectedComment && 'id' in selectedComment
				? selectedComment.id
				: undefined;
		if (!id) {
			return;
		}
		await store.dispatch('registry/call/DELETE_ANNOTATION', {
			id,
			callId,
		});
		await updateRegions();
	}

	return {
		saveComment,
		deleteComment,
	};
}
