<template>
  <column-filter
    :header="(header as DatalistTableHeader)"
    :form-view="formView"
    :hide="hide"
    :filters-manager="filtersManager"
    :filterable-extension-fields="filterableExtensionFields"
    :has-read-access="userinfoStore.hasReadAccess"
    @add:filter="handleAddFilter"
    @update:filter="handleUpdateFilter"
    @delete:filter="deleteFilter"
  />
</template>

<script
  lang="ts"
  setup
>
import type { DataField } from '@webitel/api-services/gen/models';
import type { DatalistTableHeader } from '@webitel/ui-datalist';
import {
	ColumnFilterComponent as ColumnFilter,
	useVariableColumnFilters,
} from '@webitel/ui-datalist/filters';
import type { WtTableHeader } from '@webitel/ui-sdk/src/components/wt-table/types/WtTable';
import { storeToRefs } from 'pinia';

import { useRegistryStore } from '../../main/modules/registry/store/new/registry.store';
import { useUserinfoStore } from '../../userinfo/stores/userinfoStore';

defineProps<{
	header: WtTableHeader;
	filterableExtensionFields?: DataField[];
	formView?: boolean;
	hide?: () => void;
}>();

const userinfoStore = useUserinfoStore();
const tableStore = useRegistryStore();
const { filtersManager, shownHeaders } = storeToRefs(tableStore);

const { addFilter, updateFilter, deleteFilter } = tableStore;

const { handleAddFilter, handleUpdateFilter } = useVariableColumnFilters({
	shownHeaders: () => shownHeaders.value,
	filtersManager: () => filtersManager.value,
	addFilter,
	updateFilter,
	deleteFilter,
});
</script>

<style
  lang="scss"
  scoped
></style>
