<template>
  <div>
    <delete-confirmation-popup
      v-show="isDeleteConfirmationPopup"
      :delete-count="deleteCount"
      :callback="deleteCallback"
      @close="closeDelete"
    />

    <wt-button-select
      :disabled="disableDelete"
      :options="deleteOptions"
      color="secondary"
      @click:option="$event.handler()"
    >
      {{ $t('reusable.delete') }}...
    </wt-button-select>
  </div>
</template>

<script setup lang="ts">
import { FileServicesAPI } from '@webitel/api-services/api';
import { EngineCallFileType } from '@webitel/api-services/gen/models';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useRecordingFilesAccess } from '../../../main/modules/registry/composables/useRecordingFilesAccess';
import CallTranscriptAPI from '../../../main/modules/registry/modules/stt/api/callTranscript.js';

interface CallFile {
	id: string;
	[key: string]: unknown;
}

interface HistoryItem {
	id?: string;
	files?: Partial<Record<EngineCallFileType, CallFile[]>>;
	transcripts?: unknown[];
	[key: string]: unknown;
}

const props = defineProps<{
	selected: HistoryItem[];
}>();

const emit = defineEmits<{
	refresh: [];
}>();

const { t } = useI18n();

const { hasDeleteAccess } = useRecordingFilesAccess();

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,
	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();

const filesByType = (type: EngineCallFileType) => {
	return props.selected.reduce<CallFile[]>(
		(files, item) => files.concat(item.files?.[type] || []),
		[],
	);
};

const audioFiles = computed(() =>
	filesByType(EngineCallFileType.FileTypeAudio),
);
const videoFiles = computed(() =>
	filesByType(EngineCallFileType.FileTypeVideo),
);
const screenRecordingFiles = computed(() =>
	filesByType(EngineCallFileType.FileTypeScreensharing),
);
const transcriptItems = computed(() =>
	props.selected.filter(({ transcripts }) => transcripts?.length),
);

const disableDelete = computed(() => {
	return (
		!audioFiles.value.length &&
		!videoFiles.value.length &&
		!screenRecordingFiles.value.length &&
		!transcriptItems.value.length
	);
});

const deleteOptions = computed(() => {
	const loadListAfter = (callback: () => Promise<unknown>) => async () => {
		try {
			await callback();
		} finally {
			emit('refresh');
		}
	};

	return [
		{
			value: 'audio-recording',
			text: t('export.audioRecording', 2),
			disabled: !hasDeleteAccess.value || !audioFiles.value.length,
			handler: () =>
				askDeleteConfirmation({
					deleted: audioFiles.value,
					callback: loadListAfter(() => deleteFiles(audioFiles.value)),
				}),
		},
		{
			value: 'video-recording',
			text: t('export.videoRecording', 2),
			disabled: !hasDeleteAccess.value || !videoFiles.value.length,
			handler: () =>
				askDeleteConfirmation({
					deleted: videoFiles.value,
					callback: loadListAfter(() => deleteFiles(videoFiles.value)),
				}),
		},
		{
			value: 'screen-recording',
			text: t('export.screenRecording', 2),
			disabled: !screenRecordingFiles.value.length,
			handler: () =>
				askDeleteConfirmation({
					deleted: screenRecordingFiles.value,
					callback: loadListAfter(() =>
						deleteFiles(screenRecordingFiles.value),
					),
				}),
		},
		{
			value: 'transcript',
			text: t('export.transcription', 2),
			disabled: !hasDeleteAccess.value || !transcriptItems.value.length,
			handler: () =>
				askDeleteConfirmation({
					deleted: transcriptItems.value,
					callback: loadListAfter(bulkDeleteTranscripts),
				}),
		},
	];
});

async function bulkDeleteTranscripts() {
	const callId = transcriptItems.value.map(({ id }) => id);
	return CallTranscriptAPI.delete({
		callId,
	});
}

async function deleteFiles(files: CallFile[]) {
	return FileServicesAPI.delete(files.map(({ id }) => id));
}
</script>

<style lang="scss" scoped>

</style>
