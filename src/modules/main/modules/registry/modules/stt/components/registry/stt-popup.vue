<template>
  <wt-popup
    class="stt-popup"
    @close="$emit('close')"
  >
    <template v-slot:title>
      {{ $tc('registry.stt.transcription', 1) }}
    </template>
    <template v-slot:main>
      <div class="stt-popup-toolbar">
        <wt-select
          v-model="transcript"
          :clearable="false"
          :label="$t('vocabulary.file')"
          :options="call.transcripts"
          option-label="id"
          track-by="id"
        ></wt-select>
        <div class="stt-popup-toolbar__actions">
          <stt-download-action
            @click="downloadTxt(data)"
          ></stt-download-action>
          <stt-delete-action
            @click="handleDeleteTranscription"
          ></stt-delete-action>
        </div>
      </div>
      <wt-loader v-show="isLoading"></wt-loader>
      <div class="stt-popup__table-wrapper">
        <wt-table
          v-show="!isLoading"
          :data="data"
          :headers="headers"
          :selectable="false"
        ></wt-table>
      </div>
    </template>
  </wt-popup>
</template>

<script>
import transcriptPhrasesMixin from '../../mixins/transcriptPhrasesMixin';
import SttDeleteAction from '../utils/stt-delete-action.vue';
import SttDownloadAction from '../utils/stt-download-action.vue';

export default {
  name: 'stt-popup',
  mixins: [transcriptPhrasesMixin],
  components: {
    SttDeleteAction,
    SttDownloadAction,
  },
  props: {
    call: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    transcript: null,
  }),
  methods: {
    initCurrentTranscript() {
      [this.transcript] = this.call.transcripts;
    },
    async handleDeleteTranscription() {
      await this.deleteTranscription();
      this.transcript = this.call.transcripts[0] || this.$emit('close');
    },
  },
  created() {
    this.initCurrentTranscript();
  },
};
</script>

<style lang="scss" scoped>
.stt-popup-toolbar {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-sm);

  .wt-select {
    width: 220px;
  }

  .stt-popup-toolbar__actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-xs);
  }
}

.stt-popup__table-wrapper {
  @extend %wt-scrollbar;
  overflow: auto;
  max-height: 40vh;
}
</style>