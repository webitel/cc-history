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
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { EngineCallFileType } from '@webitel/api-services/gen/models';
import DeleteConfirmationPopup
  from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';

import CallRecordingsAPI from '../../../main/modules/registry/modules/recordings/api/CallRecordingsAPI';
import CallTranscriptAPI from '../../../main/modules/registry/modules/stt/api/callTranscript.js';

const props = defineProps<{
  selected: any[];
}>();

const emit = defineEmits<{
  refresh: [];
}>();

const { t } = useI18n();

const {
  isVisible: isDeleteConfirmationPopup,
  deleteCount,
  deleteCallback,
  askDeleteConfirmation,
  closeDelete,
} = useDeleteConfirmationPopup();

const selectedList = computed(() => {
  return props.selected.map((item) => {
    return {
      ...item,
      files: [
        ...item.files?.[EngineCallFileType.FileTypeAudio] || [],
        ...item.files?.[EngineCallFileType.FileTypeVideo] || [],
      ]
    }
  });
});

const disableDelete = computed(() => {
  return !selectedList.value.length || selectedList.value
    .every(({ files, transcripts }) => !files && !transcripts);
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
      value: 'recording',
      text: t('registry.recordings.recording', 2),
      handler: () => askDeleteConfirmation({
        deleted: selectedList.value,
        callback: loadListAfter(bulkDeleteRecordings),
      }),
    },
    {
      value: 'transcript',
      text: t('registry.stt.transcription', 2),
      handler: () => askDeleteConfirmation({
        deleted: selectedList.value,
        callback: loadListAfter(bulkDeleteTranscripts),
      }),
    },
    {
      value: 'both',
      text: t('reusable.both'),
      handler: () => askDeleteConfirmation({
        deleted: selectedList.value,
        callback: loadListAfter(
          async () => Promise.allSettled([
            bulkDeleteRecordings(),
            bulkDeleteTranscripts(),
          ]),
        ),
      }),
    },
  ];
});

async function bulkDeleteTranscripts() {
  const callId = selectedList.value.map(({ id }) => id);
  return CallTranscriptAPI.delete({ callId });
}

async function bulkDeleteRecordings() {
  const fileIds = selectedList.value
    .reduce<string[]>(
      (fileIds, { files }) => (files ? fileIds
        .concat(files.map(({ id }) => id)) : fileIds),
      [],
    );
  return CallRecordingsAPI.delete(fileIds);
}
</script>

<style lang="scss" scoped>

</style>
