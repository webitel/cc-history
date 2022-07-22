<template>
  <div class="history-download-action">
    <wt-button
      class="history-action"
      :disabled="!dataList.length"
      :loading="isFilesLoading"
      color="secondary"
      @click="callExportFiles"
    >{{ $t('reusable.download') }}
    </wt-button>
    <files-counter
      v-show="isFilesLoading"
      :download-progress="filesDownloadProgress"
      :zipping-progress="filesZippingProgress"
    ></files-counter>
  </div>
</template>

<script>
import exportFilesMixin from '@webitel/ui-sdk/src/modules/FilesExport/mixins/exportFilesMixin';
import APIRepository from '../../../../app/api/APIRepository';
import generateMediaURL from '../../../main/modules/registry/mixins/media/scripts/generateMediaURL';
import historyActionMixin from '../../mixins/historyActionMixin';
import FilesCounter from './files-counter.vue';

export default {
  name: 'history-download-action',
  mixins: [historyActionMixin, exportFilesMixin],
  components: { FilesCounter },
  props: {
    dataList: {
      type: Array,
    },
    filters: {
      type: Object,
    },
  },
  methods: {
    callExportFiles() {
      try {
        const params = { ...this.filters, hasFile: 'true' };
        return this.exportFiles(null, params);
      } catch (err) {
        throw err;
      }
    },
  },
  created() {
    this.initFilesExport({
      fetchMethod: APIRepository.history.getHistory,
      filename: 'history-records',
      filesURL: generateMediaURL,
    });
  },
};
</script>

<style lang="scss" scoped>
.history-download-action {
  position: relative;
}
</style>
