<template>
  <wt-headline class="the-history-heading">
    <template slot="title">
      {{ $t('reusable.history') }}
    </template>
    <template slot="actions">

      <filter-search
        namespace="filters"
      ></filter-search>

      <history-transcribe-action
        class="history-action"
        :selected="selectedItems"
        @refresh="loadDataList"
      ></history-transcribe-action>

      <wt-button
        class="history-action"
        :disabled="!dataList.length"
        :loading="isFilesLoading"
        color="secondary"
        @click="callExportFiles"
      >{{ $t('reusable.download') }}
      </wt-button>

      <div v-show="isCSVLoading || isFilesLoading" class="files-counter">
        <div>
          {{ $t('headerSection.filesLoaded') }}
          <span class="files-counter__count">
            {{ filesDownloadProgress || CSVDownloadProgress }}
          </span>
        </div>
        <div v-show="filesZippingProgress">
          {{ $t('headerSection.zippingProgress') }}
          <span class="files-counter__count">{{ filesZippingProgress }}%</span>
        </div>
      </div>
      <wt-button
        class="history-action"
        :disabled="!dataList.length"
        :loading="isCSVLoading"
        color="secondary"
        @click="callExportCSV"
      >{{ $t('headerSection.exportCSV') }}
      </wt-button>
      <history-delete-action
        class="history-action"
        :selected="selectedItems"
        @refresh="loadDataList"
      ></history-delete-action>
    </template>
  </wt-headline>
</template>

<script>
import exportCSVMixin from '@webitel/ui-sdk/src/modules/CSVExport/mixins/exportCSVMixin';
import exportFilesMixin from '@webitel/ui-sdk/src/modules/FilesExport/mixins/exportFilesMixin';
import { mapActions, mapGetters, mapState } from 'vuex';
import APIRepository from '../../../app/api/APIRepository';

import generateMediaURL from '../../main/modules/registry/mixins/media/scripts/generateMediaURL';
import FilterSearch from '../modules/filters/components/filter-search.vue';
import HistoryTranscribeAction from './actions/history-transcribe-action.vue';
import HistoryDeleteAction from './actions/history-delete-action.vue';

export default {
  name: 'the-history-heading',
  mixins: [
    exportCSVMixin,
    exportFilesMixin,
  ],
  components: {
    FilterSearch,
    HistoryTranscribeAction,
    HistoryDeleteAction,
  },
  computed: {
    ...mapState('registry', {
      dataList: (state) => state.dataList,
    }),

    ...mapGetters('filters', {
      getFilters: 'GET_FILTERS',
    }),

    ...mapGetters('registry', {
      fields: 'DATA_FIELDS',
      selectedItems: 'SELECTED_DATA_ITEMS',
    }),
  },

  methods: {
    ...mapActions('registry', {
      loadDataList: 'LOAD_DATA_LIST',
    }),
    callExportFiles() {
      try {
        const params = { hasFile: 'true' };
        return this.exportFiles(null, params);
      } catch (err) {
        throw err;
      }
    },

    async callExportCSV() {
      try {
        const params = { ...this.getFilters, fields: this.fields, skipParent: true };
        return this.exportCSV(params);
      } catch (err) {
        throw err;
      }
    },
  },
  created() {
    this.initCSVExport(APIRepository.history.getHistory, { filename: 'history' });
    this.initFilesExport({
      fetchMethod: APIRepository.history.getHistory,
      filename: 'history-records',
      filesURL: generateMediaURL,
    });
  },
};
</script>

<style lang="scss" scoped>
.the-history-heading {
  .history-action {
    margin-left: 20px;
  }

  .files-counter {
    @extend %typo-caption;
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 10px;
    padding: 10px 15px;
    border-radius: var(--border-radius);
    background: var(--main-color);
    box-shadow: var(--box-shadow);

    &__count {
      @extend %typo-caption;
    }
  }
}
</style>
