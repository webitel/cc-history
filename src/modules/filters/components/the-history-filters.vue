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
} from '@webitel/ui-datalist/filters';
import { RelativeDatetimeValue } from '@webitel/ui-sdk/enums';
import { storeToRefs } from 'pinia';

import { namespace } from '../../main/modules/registry/namespace';
import { useRegistryStore } from '../../main/modules/registry/store/new/registry.store';
import { filtersOptions } from '../configs/filtersOptions';
import { useRegistryFilterPresetsStore } from '../modules/presets/store/useRegistryFilterPresetsStore';

const emit = defineEmits<{
	hide: [];
}>();

const tableStore = useRegistryStore();
const { filtersManager } = storeToRefs(tableStore);

const { addFilter, updateFilter, deleteFilter } = tableStore;

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

/**
 * preset cached in localStorage – filters must survive, so no reset here.
 * `createdAt` is already seeded by initializeDefaultCreatedAtFilter()
 */
const restorePreset = (snapshot: string) => {
	filtersManager.value.fromString(snapshot);
};

const applyPreset = (snapshot: string) => {
	resetFilters();
	restorePreset(snapshot);
};
</script>

<style
  lang="scss"
  scoped
></style>
