<template>
  <wt-headline class="the-history-heading">
    <template #title>
      {{ $t('reusable.history') }}
    </template>
    <template #actions>
      <div class="the-history-heading-actions">
        <filter-search
          :filters-manager="filtersManager"
          :is-filters-restoring="isFiltersRestoring"
          :search-mode-options=""
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
import {DynamicFilterSearchComponent as FilterSearch} from '@webitel/ui-datalist/filters';
import {storeToRefs} from "pinia";
import {computed} from "vue";

import {useRegistryStore} from "../../main/modules/registry/store/new/registry.store.ts";
import HistoryDeleteAction from './actions/history-delete-action.vue';
import HistoryDownloadAction from './actions/history-download-action.vue';
import HistoryExportAction from './actions/history-export-action.vue';
import HistoryTranscribeAction from './actions/history-transcribe-action.vue';

const registryStore = useRegistryStore();

const {
  dataList,
  selected,
  fields,
  filtersManager,
  isFiltersRestoring,
} = storeToRefs(registryStore);

const {
  loadDataList,
} = registryStore;

const filters = computed(() => filtersManager.value.getAllValues());

</script>

<style lang="scss" scoped>
.the-history-heading-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}
</style>
