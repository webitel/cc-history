<template>
  <wt-headline class="the-history-heading">
    <template #title>
      {{ $t('reusable.history') }}
    </template>
    <template #actions>
      <div class="the-history-heading-actions">
        <dynamic-filter-search
          :filters-manager="filtersManager"
          :is-filters-restoring="isFiltersRestoring"
          :search-mode-options="searchModeOptions"
          @filter:add="addFilter"
          @filter:update="updateFilter"
          @filter:delete="deleteFilter"
        />

        <history-transcribe-action
          :selected="selected"
          class="history-action"
          @refresh="loadDataList"
        />

        <history-export-action
          :data-list="dataList"
          :fields="fields"
          :filters="filters"
          :selected="selected"
          class="history-action"
        />

        <history-download-action
          :data-list="dataList"
          :filters="filters"
          :selected="selected"
          class="history-action"
        />

        <history-delete-action
          :selected="selected"
          class="history-action"
          @refresh="loadDataList"
        />
      </div>
    </template>
  </wt-headline>
</template>

<script lang="ts" setup>
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import {storeToRefs} from "pinia";
import {computed} from "vue";
import { useI18n } from "vue-i18n";

import { SearchMode } from "../../filters/enums/SearchMode";
import {useRegistryStore} from "../../main/modules/registry/store/new/registry.store.ts";
import HistoryDeleteAction from './actions/history-delete-action.vue';
import HistoryDownloadAction from './actions/history-download-action.vue';
import HistoryExportAction from './actions/history-export-action.vue';
import HistoryTranscribeAction from './actions/history-transcribe-action.vue';

const { t } = useI18n();
const registryStore = useRegistryStore();

const {
  dataList,
  selected,
  fields: tableFields,
  filtersManager,
  isFiltersRestoring,
} = storeToRefs(registryStore);

const {
  loadDataList,
  addFilter,
  updateFilter,
  deleteFilter,
} = registryStore;

// [WTEL-6378](https://webitel.atlassian.net/browse/WTEL-6378?focusedCommentId=669091)
const fields = computed(() => {
  return ['id'].concat(tableFields.value);
});

const filters = computed(() => filtersManager.value.getAllValues());

const searchModeOptions = computed(() => {
  return Object.values(SearchMode).map((mode) => {
    return {
      text: t(`filters.search.${mode}`),
      value: mode,
    };
  });
});

</script>

<style lang="scss" scoped>
.the-history-heading-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}
</style>
