<template>
  <section class="the-history-filters">
    <dynamic-filter-add-action>
      <template #form>
        <dynamic-filter-config-form
          :options="unappliedFilters"
          @submit="applyFilter"
        >
          <template #value-input="{ filterName, filterValue, onValueChange, onValueInvalidChange }">
            <component
              :is="getFilterValueComponent(filterName)"
              :key="filterName"
              :model-value="filterValue"
              @update:model-value="onValueChange"
              @update:invalid="onValueInvalidChange"
            />
          </template>
        </dynamic-filter-config-form>
      </template>
    </dynamic-filter-add-action>

    <dynamic-filter-preview
      v-for="(filter) of appliedFilters"
      :key="filter.name"
      :filter="filter"
      @delete:filter="deleteAppliedFilter($event.name)"
    >
      <template #form>
        <dynamic-filter-config-form
          :filter="filter"
          @submit="updateAppliedFilter"
        >
          <template #value-input="{ filterName, filterValue, onValueChange, onValueInvalidChange }">
            <component
              :is="getFilterValueComponent(filterName)"
              :key="filterName"
              :model-value="filterValue"
              @update:model-value="onValueChange"
              @update:invalid="onValueInvalidChange"
            />
          </template>
        </dynamic-filter-config-form>
      </template>
    </dynamic-filter-preview>
    <table-filters-panel>
      111
    </table-filters-panel>
    <save-preset-action />
    <wt-icon-action
      action="close"
      @click="emit('hide')"
    />
  </section>
</template>

<script lang="ts" setup>
import { computed, type Ref } from 'vue';
import { storeToRefs } from 'pinia';
import TableFiltersPanel from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/table-filters-panel.vue';
import DynamicFilterPreview
  from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/dynamic/preview/dynamic-filter-preview.vue';
import DynamicFilterAddAction
  from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/dynamic/dynamic-filter-add-action.vue';
import { FilterName } from '@webitel/ui-sdk/src/modules/Filters/v2/filters/types/Filter.types.ts';
import DynamicFilterConfigForm
  from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/dynamic/config/dynamic-filter-config-form.vue';
import { useTableStore } from '../../../main/modules/registry/store/new/registry.store.ts';
import DirectionFilter from './filter-value-components/direction-filter.vue';
import CreatedAtFromFilter from './filter-value-components/created-at-from-filter.vue';
import VariablesFilter from './filter-value-components/variables-filter.vue';
import DurationFilter from './filter-value-components/duration-filter.vue';
import UserFilter from './filter-value-components/user-filter.vue';
import { SearchMode } from '../../../heading/modules/filters/enums/SearchMode.enum.ts';
import SavePresetAction from "./presets/save-preset-action.vue";

// const props = defineProps({});

const emit = defineEmits<{
  hide: [],
}>();

const tableStore = useTableStore();
const { filtersManager } = storeToRefs(tableStore);
window.fmanager = filtersManager;

const {
  addFilter: applyFilter,
  updateFilter: updateAppliedFilter,
  deleteFilter: deleteAppliedFilter,
} = tableStore;

const appliedFilters = computed(() => {
  const exclude = Object.values(SearchMode);
  return filtersManager.value.getFiltersList({ exclude });
});

const unappliedFilters: Ref<Array<{ name: string, value: FilterName }>> = computed(() => {

  const filterOptions = [
    {
      id: 'direction',
      name: 'Direction title',
    },
    {
      id: 'duration',
      name: 'Duration title',
    },
    {
      id: 'user',
      name: 'User title',
    },
    {
      id: 'createdAtFrom',
      name: 'Created At From title',
    },
    {
      id: 'variables',
      name: 'Vars title',
    },
  ];

  return filterOptions;
});

const getFilterValueComponent = (filterName: FilterName) => {
  switch (filterName) {
    case 'direction':
      return DirectionFilter;
    case 'createdAtFrom':
      return CreatedAtFromFilter;
    case 'variables':
      return VariablesFilter;
    case 'duration':
      return DurationFilter;
    case 'user':
      return UserFilter;
    default:
  }
};

</script>

<style lang="scss" scoped>
//.the-history-filters {}
</style>
