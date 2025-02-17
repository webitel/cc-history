<template>
  <wt-headline class="the-history-heading">
    <template #title>
      {{ $t('reusable.history') }}
    </template>
    <template #actions>
      <div class="the-history-heading-actions">
        <search-filter />

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
import {useRegistryStore} from "../../main/modules/registry/store/new/registry.store.ts";
import SearchFilter from '../../filters/components/filter-value-components/search-filter.vue';
import HistoryDeleteAction from './actions/history-delete-action.vue';
import HistoryDownloadAction from './actions/history-download-action.vue';
import HistoryExportAction from './actions/history-export-action.vue';
import HistoryTranscribeAction from './actions/history-transcribe-action.vue';
import {storeToRefs} from "pinia";
import {computed} from "vue";

const registryStore = useRegistryStore();

const {
  dataList,
  selected,
  fields,
  filtersManager,
} = storeToRefs(registryStore);

const {
  loadDataList,
} = registryStore;

const filters = computed(() => Object.fromEntries(filtersManager.value.filters.entries()));

</script>

<style lang="scss" scoped>
.the-history-heading-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}
</style>
