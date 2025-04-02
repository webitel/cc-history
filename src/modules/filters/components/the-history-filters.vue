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
import {TableFiltersPanelComponent as TableFiltersPanel} from '@webitel/ui-datalist/filters';
import {storeToRefs} from 'pinia';

import {namespace} from "../../main/modules/registry/namespace.ts";
import {useRegistryStore} from '../../main/modules/registry/store/new/registry.store.ts';
import {useRegistryFilterPresetsStore} from "../modules/presets/store/useRegistryFilterPresetsStore.ts";
import {filtersOptions} from "./filters-options";

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

const resetFilters = () => {
  filtersManager.value.reset();
};

const applyPreset = (snapshot: string) => {
  filtersManager.value.reset();
  filtersManager.value.fromString(snapshot);
};
</script>

<style lang="scss" scoped>
</style>
