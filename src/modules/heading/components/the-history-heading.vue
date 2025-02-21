<template>
  <wt-headline class="the-history-heading">
    <template #title>
      {{ $t('reusable.history') }}
    </template>
    <template #actions>
      <div class="the-history-heading-actions">
        <search-filter />

        <dynamic-filter-search
          :model-value="searchValue"
          :search-mode="searchMode"
          :show-text-search-icon="showTextSearchIcon"
          :search-mode-options="SearchMode"
          @handle-search="handleSearch"
          @update:search-mode="searchMode = $event"
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
import {useRegistryStore} from "../../main/modules/registry/store/new/registry.store.ts";
import SearchFilter from '../../filters/components/filter-value-components/search-filter.vue';
import DynamicFilterSearch from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/dynamic-filter-search.vue';
import HistoryDeleteAction from './actions/history-delete-action.vue';
import HistoryDownloadAction from './actions/history-download-action.vue';
import HistoryExportAction from './actions/history-export-action.vue';
import HistoryTranscribeAction from './actions/history-transcribe-action.vue';
import {storeToRefs} from "pinia";
import {computed, ref, watch, WatchHandle} from "vue";
import {SearchMode, SearchModeType} from "../../filters/enums/SearchMode.ts";

const registryStore = useRegistryStore();

const {
  dataList,
  selected,
  fields,
  filtersManager,
  isFiltersRestoring
} = storeToRefs(registryStore);

const {
  loadDataList,
  hasFilter,
  addFilter,
  updateFilter,
  deleteFilter
} = registryStore;

const filters = computed(() => Object.fromEntries(filtersManager.value.filters.entries()));
const searchMode = ref<SearchModeType>(SearchMode.Search);
const searchValue = ref('');

const showTextSearchIcon = computed(() => {
  const textSearchModes = [SearchMode.Fts, SearchMode.Description];

  return textSearchModes.includes(searchMode.value);
});

let unwatchSearchMode: WatchHandle;

watch(
  isFiltersRestoring,
  (next) => {
    if (next) return;

    for (const mode of Object.values(SearchMode)) {
      if (hasFilter(mode)) {
        searchMode.value = mode
        searchValue.value = filtersManager.value.filters.get(mode).value;

        break;
      }
    }

    /**
     * start watching for searchMode change
     * only after initial searchMode restoration
     */
    if (unwatchSearchMode) {
      unwatchSearchMode();
    }

    unwatchSearchMode = watch(searchMode,
      (_, prev) => {
        deleteFilter(prev);
        searchValue.value = '';
      },
    );
  },
  { immediate: true },
);

const handleSearch = (searchValue: string) => {
  const filter = {
    name: searchMode.value,
    value: searchValue,
  };

  if (hasFilter(searchMode.value)) {
    if (searchValue) {
      updateFilter(filter);
    } else {
      deleteFilter(searchMode.value);
    }
  } else {
    addFilter(filter);
  }
};

</script>

<style lang="scss" scoped>
.the-history-heading-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}
</style>
