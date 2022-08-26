<template>
  <div class="history-export-csv-action">
    <wt-button
      :disabled="!dataList.length"
      :loading="isCSVLoading"
      class="history-action"
      color="secondary"
      @click="callExportCSV"
    >{{ $t('headerSection.exportCSV') }}
    </wt-button>
    <files-counter
      v-show="isCSVLoading"
      :download-progress="CSVDownloadProgress"
    ></files-counter>
  </div>
</template>

<script>
import exportCSVMixin from '@webitel/ui-sdk/src/modules/CSVExport/mixins/exportCSVMixin';
import APIRepository from '../../../../app/api/APIRepository';
import historyActionMixin from '../../mixins/historyActionMixin';
import FilesCounter from './files-counter.vue';

export default {
  name: 'history-export-csv-action',
  mixins: [
    historyActionMixin,
    exportCSVMixin,
  ],
  components: { FilesCounter },
  props: {
    dataList: {
      type: Array,
    },
    filters: {
      type: Object,
    },
    fields: {
      type: Array,
      required: true,
    },
  },
  methods: {
    async callExportCSV() {
      // remove service fields
      const fields = this.fields.filter((field) => !['id', 'files', 'filesJob', 'transcripts'].includes(field));
      try {
        const params = { ...this.filters, fields, skipParent: true };
        return this.exportCSV(params);
      } catch (err) {
        throw err;
      }
    },
  },
  created() {
    this.initCSVExport(APIRepository.history.getHistory, { filename: 'history' });
  },
};
</script>

<style lang="scss" scoped>
.history-export-csv-action {
  position: relative;
}
</style>
