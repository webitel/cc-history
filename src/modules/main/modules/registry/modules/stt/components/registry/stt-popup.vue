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
        <wt-select
          :value="transcript"
          :clearable="false"
          :label="$t('vocabulary.file')"
          :options="call.transcripts"
          option-label="name"
          track-by="fileId"
          @input="transcript = $event"
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
import APIRepository from '../../../../../../../../app/api/APIRepository';
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
		callId: {
			type: String,
			required: true,
		},
	},
	data: () => ({
		call: {
			transcripts: [],
		},
		transcript: null,
	}),
	watch: {
		callId(id) {
			if (id) this.initialize();
		},
	},
	methods: {
		initCurrentTranscript() {
			[this.transcript] = this.call.transcripts;
		},
		async handleDeleteTranscription() {
			await this.deleteTranscription();
			this.call.transcripts.splice(
				this.call.transcripts.indexOf(this.transcript),
				1,
			);
			this.transcript = this.call.transcripts[0] || this.$emit('close');
		},
		async loadCall() {
			/*
      loading call separately is needed for transcript channels representation
       */
			const params = {
				id: [
					this.callId,
				],
				createdAtFrom: 0,
				page: 1,
				size: 1,
				fields: [
					'from',
					'to',
					'id',
					'createdAt',
					'transcripts',
				],
			};
			const res = await APIRepository.history.getHistory(params);
			[this.call] = res.items;
		},
		async initialize() {
			await this.loadCall();
			this.initCurrentTranscript();
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
