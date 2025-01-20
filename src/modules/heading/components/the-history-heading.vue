<template>
  <wt-headline class="the-history-heading">
    <template #title>
      {{ $t('reusable.history') }}
    </template>
    <template #actions>
      <search-filter
        namespace="filters"
      />

      <history-transcribe-action
        :selected="selectedItems"
        class="history-action"
        @refresh="loadDataList"
      />

      <history-export-action
        :data-list="dataList"
        :fields="fields"
        :filters="getFilters"
        class="history-action"
      />

      <history-download-action
        :data-list="dataList"
        :filters="getFilters"
        :selected="selectedItems"
        class="history-action"
      />

      <history-delete-action
        :selected="selectedItems"
        class="history-action"
        @refresh="loadDataList"
      />
    </template>
  </wt-headline>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import SearchFilter from '../../filters/components/v2/filter-value-components/search-filter.vue';
import HistoryDeleteAction from './actions/history-delete-action.vue';
import HistoryDownloadAction from './actions/history-download-action.vue';
import HistoryExportAction from './actions/history-export-action.vue';
import HistoryTranscribeAction from './actions/history-transcribe-action.vue';

export default {
  name: 'TheHistoryHeading',
  components: {
    SearchFilter,
    HistoryTranscribeAction,
    HistoryDownloadAction,
    HistoryExportAction,
    HistoryDeleteAction,
  },
  computed: {
    ...mapState('registry', {
      dataList: (state) => state.dataList,
      headers: (state) => state.headers,
    }),

    ...mapGetters('filters', {
      getFilters: 'GET_FILTERS',
    }),

    ...mapGetters('registry', {
      selectedItems: 'SELECTED_DATA_ITEMS',
    }),

    fields() {
      return ['id', ...this.headers.filter((header) => header.show).map((header) => header.field)];
    },
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
