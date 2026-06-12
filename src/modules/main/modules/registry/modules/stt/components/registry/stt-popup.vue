<template>
  <wt-popup
    v-bind="$attrs"
    class="stt-popup"
    :min-width="720"
    @close="$emit('close')"
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
          :options="call.transcripts"
          option-label="name"
          data-key="fileId"
        />
        <div class="stt-popup-toolbar__actions">
          <stt-download-action @click="downloadTxt(data)" />
          <stt-delete-action @click="handleDeleteTranscription" />
        </div>
      </div>
      <wt-loader v-show="isLoading" />
      <div class="stt-popup__table-wrapper wt-scrollbar">
        <wt-table
          v-show="!isLoading"
          :data="data"
          :headers="headers"
          :selectable="false"
          :grid-actions="false"
        />
      </div>
    </template>
  </wt-popup>
</template>

<script>
import transcriptPhrasesMixin from '../../mixins/transcriptPhrasesMixin';
import SttDeleteAction from '../utils/stt-delete-action.vue';
import SttDownloadAction from '../utils/stt-download-action.vue';

export default {
	name: 'SttPopup',
	components: {
		SttDeleteAction,
		SttDownloadAction,
	},
	mixins: [
		transcriptPhrasesMixin,
	],
	props: {
		call: {
			type: Object,
			default: null,
		},
	},
	data: () => ({
		transcript: null,
	}),
	watch: {
		call: {
			handler(value) {
				if (value) this.initCurrentTranscript();
			},
			immediate: true,
		},
	},
	methods: {
		initCurrentTranscript() {
			[this.transcript] = this.call?.transcripts || [];
		},
		async handleDeleteTranscription() {
			await this.deleteTranscription();
			this.call.transcripts.splice(
				this.call.transcripts.indexOf(this.transcript),
				1,
			);
			this.transcript = this.call.transcripts[0] || this.$emit('close');
		},
	},
};
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
