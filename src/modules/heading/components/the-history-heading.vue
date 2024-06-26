<template>
  <wt-headline class="the-history-heading">
    <template #title>
      {{ $t('reusable.history') }}
    </template>
    <template #actions>
      <filter-search
        namespace="filters"
      />

      <history-transcribe-action
        class="history-action"
        :selected="selectedItems"
        @refresh="loadDataList"
      />

      <history-export-csv-action
        class="history-action"
        :data-list="dataList"
        :filters="getFilters"
        :fields="fields"
      />

      <history-download-action
        class="history-action"
        :data-list="dataList"
        :filters="getFilters"
        :selected="selectedItems"
      />

      <history-delete-action
        class="history-action"
        :selected="selectedItems"
        @refresh="loadDataList"
      />
    </template>
  </wt-headline>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import FilterSearch from '../modules/filters/components/filter-search.vue';
import HistoryTranscribeAction from './actions/history-transcribe-action.vue';
import HistoryDownloadAction from './actions/history-download-action.vue';
import HistoryExportAction from './actions/history-export-action.vue';
import HistoryDeleteAction from './actions/history-delete-action.vue';

export default {
  name: 'TheHistoryHeading',
  components: {
    FilterSearch,
    HistoryTranscribeAction,
    HistoryDownloadAction,
    HistoryExportAction,
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
