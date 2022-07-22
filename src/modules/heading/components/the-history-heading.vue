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

      <history-download-action
        class="history-action"
        :data-list="dataList"
        :filters="getFilters"
      ></history-download-action>

      <history-export-csv-action
        class="history-action"
        :data-list="dataList"
        :filters="getFilters"
        :fileds="fields"
      ></history-export-csv-action>

      <history-delete-action
        class="history-action"
        :selected="selectedItems"
        @refresh="loadDataList"
      ></history-delete-action>
    </template>
  </wt-headline>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import FilterSearch from '../modules/filters/components/filter-search.vue';
import HistoryTranscribeAction from './actions/history-transcribe-action.vue';
import HistoryDownloadAction from './actions/history-download-action.vue';
import HistoryExportCsvAction from './actions/history-export-csv-action.vue';
import HistoryDeleteAction from './actions/history-delete-action.vue';

export default {
  name: 'the-history-heading',
  components: {
    FilterSearch,
    HistoryTranscribeAction,
    HistoryDownloadAction,
    HistoryExportCsvAction,
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
  },
};
</script>

<style lang="scss" scoped>
.the-history-heading {
  .history-action {
    margin-left: 20px;
  }
}
</style>
