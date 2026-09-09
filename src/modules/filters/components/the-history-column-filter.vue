<template>
  <column-filter
    :header="header"
    :index="index"
    :form-view="formView"
    :hide="hide"
    :filters-manager="filtersManager"
    :filter-options="filtersOptions"
    @add:filter="addFilter"
    @update:filter="updateFilter"
    @delete:filter="deleteFilter"
  />
</template>

<script
  lang="ts"
  setup
>
import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { ColumnFilterComponent as ColumnFilter } from '@webitel/ui-datalist/filters';
import { storeToRefs } from 'pinia';

import { useRegistryStore } from '../../main/modules/registry/store/new/registry.store';
import { filtersOptions } from '../configs/filtersOptions';

defineProps<{
	header: DatalistTableHeader;
	formView?: boolean;
	index?: number;
	hide?: () => void;
}>();

const tableStore = useRegistryStore();
const { filtersManager } = storeToRefs(tableStore);

const { addFilter, updateFilter, deleteFilter } = tableStore;
</script>

<style
  lang="scss"
  scoped
></style>
