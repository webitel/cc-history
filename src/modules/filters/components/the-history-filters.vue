<template>
  <table-filters-panel
    :filters-manager="filtersManager"
    :filter-options="filtersOptions"
    :filterable-extension-fields="variableFilterFields"
    :preset-namespace="namespace"
    :use-presets-store="useRegistryFilterPresetsStore"
    :has-read-access="userinfoStore.hasReadAccess"
    @filter:add="applyVariableFilter"
    @filter:update="applyVariableFilter"
    @filter:delete="deleteFilter"
    @filter:reset-all="resetFilters"
    @preset:apply="applyPreset"
    @preset:restore="restorePreset"
    @hide="emit('hide')"
  />
</template>

<script
  lang="ts"
  setup
>
import {
	FilterOption,
	TableFiltersPanelComponent as TableFiltersPanel,
	useVariableColumnFilters,
} from '@webitel/ui-datalist/filters';
import { RelativeDatetimeValue } from '@webitel/ui-sdk/enums';
import { storeToRefs } from 'pinia';

import { namespace } from '../../main/modules/registry/namespace';
import { useRegistryStore } from '../../main/modules/registry/store/new/registry.store';
import { useUserinfoStore } from '../../userinfo/stores/userinfoStore';
import { filtersOptions } from '../configs/filtersOptions';
import { useRegistryFilterPresetsStore } from '../modules/presets/store/useRegistryFilterPresetsStore';

const emit = defineEmits<{
	hide: [];
}>();

const userinfoStore = useUserinfoStore();
const tableStore = useRegistryStore();
const { filtersManager, shownHeaders } = storeToRefs(tableStore);

const { addFilter, updateFilter, deleteFilter } = tableStore;

const { variableFilterFields, applyVariableFilter } = useVariableColumnFilters({
	shownHeaders: () => shownHeaders.value,
	filtersManager: () => filtersManager.value,
	addFilter,
	updateFilter,
	deleteFilter,
});

const initializeDefaultCreatedAtFilter = () => {
	if (filtersManager.value.hasFilter(FilterOption.CreatedAt)) return;

	addFilter({
		name: FilterOption.CreatedAt,
		value: RelativeDatetimeValue.Today,
	});
};

initializeDefaultCreatedAtFilter();

const resetFilters = () => {
	const excludeNotDeletableFilters = filtersOptions.reduce<string[]>(
		(excludes, opt) => {
			if (typeof opt !== 'string' && opt.notDeletable) {
				excludes.push(String(opt.name));
			}

			return excludes;
		},
		[],
	);

	filtersManager.value.reset({
		exclude: [
			...excludeNotDeletableFilters,
			'search',
		],
	});

	addFilter({
		name: FilterOption.CreatedAt,
		value: RelativeDatetimeValue.Today,
	});
};

const applyPreset = (snapshot: string) => {
	resetFilters();
	filtersManager.value.fromString(snapshot);
};

/**
 * preset cached in localStorage – filters must survive, so no reset here.
 * `createdAt` is already seeded by initializeDefaultCreatedAtFilter()
 */
const restorePreset = (snapshot: string) => {
	filtersManager.value.fromString(snapshot);
};
</script>

<style
  lang="scss"
  scoped
></style>
