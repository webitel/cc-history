<template>
  <wt-popup
    v-bind="$attrs"
    class="stt-popup"
    :min-width="720"
    @close="emit('close')"
  >
    <template #title>
      {{ $t('registry.stt.transcription', 1) }}
    </template>
    <template #main>
      <div class="stt-popup-toolbar">
        <wt-single-select
          v-model:model-value="transcript"
          :show-clear="false"
          :label="$t('vocabulary.file')"
          :options="call?.transcripts"
          option-label="name"
          data-key="fileId"
        />
        <div class="stt-popup-toolbar__actions">
          <stt-download-action @click="downloadTranscript()" />
          <stt-delete-action @click="handleDeleteTranscription" />
        </div>
      </div>
      <wt-loader v-show="isLoading" />
      <div class="stt-popup__table-wrapper wt-scrollbar">
        <wt-table
          v-show="!isLoading"
          :data="rows"
          :headers="headers"
          :selectable="false"
          :grid-actions="false"
        />
      </div>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import type {
	CallTranscriptCall,
	CallTranscriptItem,
} from '@webitel/ui-sdk/modules/CallVisualization';
import { useCallTranscriptPhrases } from '@webitel/ui-sdk/modules/CallVisualization';
import {
	SttDeleteAction,
	SttDownloadAction,
} from '@webitel/ui-sdk/modules/Stt';
import { ref, watch } from 'vue';

type SttPopupCall = Omit<CallTranscriptCall, 'files' | 'filesJob'>;

const { call = null } = defineProps<{
	call?: SttPopupCall | null;
}>();

const emit = defineEmits<{
	close: [];
	deleted: [
		transcript: CallTranscriptItem,
	];
}>();

const transcript = ref<CallTranscriptItem>();

const { isLoading, headers, rows, downloadTranscript, deleteTranscript } =
	useCallTranscriptPhrases({
		call: () => call ?? {},
		transcript: () => transcript.value,
	});

watch(
	() => call,
	(value) => {
		if (value) [transcript.value] = value.transcripts || [];
	},
	{
		immediate: true,
	},
);

async function handleDeleteTranscription() {
	const deletedTranscript = await deleteTranscript();
	emit('deleted', deletedTranscript);
	transcript.value = call.transcripts[0];
	if (!transcript.value) emit('close');
}
</script>

<style
  lang="scss"
  scoped
>
@use '@webitel/ui-sdk/src/css/main' as *;

.stt-popup-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);

  .stt-popup-toolbar__actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-xs);
  }
}

.stt-popup__table-wrapper {
  overflow: auto;
  max-height: 40vh;
}
</style>
