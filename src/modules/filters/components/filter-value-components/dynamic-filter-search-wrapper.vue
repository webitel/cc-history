<template>
  <dynamic-filter-search
    :model-value="searchValue"
    :search-mode="searchMode"
    :search-mode-options="SearchMode"
    @handle-search="handleSearch"
    @update:search-mode="searchMode = $event"
  />
</template>

<script lang="ts" setup>
import DynamicFilterSearch from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/dynamic-filter-search.vue';
import { storeToRefs } from 'pinia';
import { ref, watch, WatchHandle } from 'vue';

import {useRegistryStore} from "../../../main/modules/registry/store/new/registry.store.ts";
import { SearchMode, SearchModeType } from '../../enums/SearchMode.ts';

const tableStore = useRegistryStore();

const { filtersManager, isFiltersRestoring } = storeToRefs(tableStore);

const { hasFilter, addFilter, updateFilter, deleteFilter } = tableStore;

const searchMode = ref<SearchModeType>(SearchMode.Search);
const searchValue = ref('');

let unwatchSearchMode: WatchHandle;

watch(
  isFiltersRestoring,
  (next) => {
    if (next) return;

    for (const mode of Object.values(SearchMode)) {
      if (hasFilter(mode)) {
        searchMode.value = mode;
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

    unwatchSearchMode = watch(searchMode, (_, prev) => {
      deleteFilter(prev);
      searchValue.value = '';
    });
  },
  { immediate: true },
);

const handleSearch = (val: string) => {
  const filter = {
    name: searchMode.value,
    value: val,
  };

  if (hasFilter(searchMode.value)) {
    if (val) {
      updateFilter(filter);
    } else {
      deleteFilter(searchMode.value);
    }
  } else {
    addFilter(filter);
  }
};
</script>

<style lang="scss" scoped></style>
