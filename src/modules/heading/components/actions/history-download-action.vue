<template>
  <div class="history-download-action">
    <wt-button-select
      :disabled="!dataList.length"
      :options="downloadOptions"
      class="history-action"
      color="secondary"
      @click:option="$event.handler()"
    >
      {{ $t('reusable.download') }}...
    </wt-button-select>
    <files-counter
      v-show="isLoading"
      :download-progress="downloadProgress"
      :zipping-progress="zippingProgress"
    />
  </div>
</template>

<script>
import exportFilesMixin from '@webitel/ui-sdk/src/modules/FilesExport/mixins/exportFilesMixin';
import APIRepository from '../../../../app/api/APIRepository';
import generateMediaURL from '../../../main/modules/registry/mixins/media/scripts/generateMediaURL';
import historyActionMixin from '../../mixins/historyActionMixin';
import downloadTranscriptsMixin from '../../mixins/downloadTranscriptsMixin';
import FilesCounter from './files-counter.vue';

export default {
  name: 'HistoryDownloadAction',
  components: { FilesCounter },
  mixins: [
    historyActionMixin,
    exportFilesMixin,
    downloadTranscriptsMixin,
  ],
  props: {
    dataList: {
      type: Array,
    },
    filters: {
      type: Object,
    },
  },
  computed: {
    selectedItems() { return this.selected; }, // needed for exportFilesMixin
    isLoading() {
      return this.isTranscriptsLoading || this.isFilesLoading;
    },
    downloadProgress() {
      return this.transcriptDownloadProgress || this.filesDownloadProgress;
    },
    zippingProgress() {
      return this.transcriptZippingProgress || this.filesZippingProgress;
    },
    downloadOptions() {
      return [
        {
          value: 'recording',
          text: this.$t('registry.recordings.recording', 2),
          handler: this.callExportFiles.bind(this),
        },
        {
          value: 'transcript',
          text: this.$t('registry.stt.transcription', 2),
          handler: this.exportTranscripts.bind(this),
        },
      ];
    },
  },
  created() {
    this.initFilesExport({
      fetchMethod: APIRepository.history.getHistory,
      filename: 'history-records',
      filesURL: generateMediaURL,
    });
  },
  methods: {
    callExportFiles() {
      if (this.isLoading) return;
      const params = { ...this.filters, hasFile: true };
      return this.exportFiles(null, params);
    },
  },
};
</script>

<style lang="scss" scoped>
.history-download-action {
  position: relative;
}
</style>
