<template>
  <table-filters-panel
    :filters-manager="filtersManager"
    :filter-options="filtersOptions"
    :preset-namespace="namespace"
    :use-presets-store="useRegistryFilterPresetsStore"
    @filter:add="addFilter"
    @filter:update="updateFilter"
    @filter:delete="deleteFilter"
    @filter:reset-all="resetFilters"
    @preset:apply="applyPreset"
    @hide="emit('hide')"
  />
</template>

<script lang="ts" setup>
import {FilterOption,TableFiltersPanelComponent as TableFiltersPanel} from '@webitel/ui-datalist/filters';
import {RelativeDatetimeValue} from "@webitel/ui-sdk/enums";
import {storeToRefs} from 'pinia';

import {namespace} from "../../main/modules/registry/namespace.ts";
import {useRegistryStore} from '../../main/modules/registry/store/new/registry.store.ts';
import {filtersOptions} from "../configs/filtersOptions.ts";
import {
  useRegistryFilterPresetsStore
} from "../modules/presets/store/useRegistryFilterPresetsStore.ts";

const emit = defineEmits<{
  hide: [],
}>();

const tableStore = useRegistryStore();
const {filtersManager} = storeToRefs(tableStore);

const {
  addFilter,
  updateFilter,
  deleteFilter,
} = tableStore;

const initializeDefaultCreatedAtFilter = () => {
  if (filtersManager.value.hasFilter(FilterOption.CreatedAt)) return;

  addFilter({
    name: FilterOption.CreatedAt,
    value: RelativeDatetimeValue.Today,
  });
};

initializeDefaultCreatedAtFilter();

const resetFilters = () => {
  filtersManager.value.reset({
    exclude: filtersOptions.reduce((excludes, opt) => {
      if (opt?.notDeletable) {
        return [
          ...excludes,
          opt.value,
        ];
      }

      return excludes;
    }, []),
  });
};

const applyPreset = (snapshot: string) => {
  resetFilters();
  filtersManager.value.fromString(snapshot);
};
</script>

<style lang="scss" scoped>
</style>
