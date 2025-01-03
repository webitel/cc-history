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
              @undate:invalid="onValueInvalidChange"
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
              @undate:invalid="onValueInvalidChange"
            />
          </template>
        </dynamic-filter-config-form>
      </template>
    </dynamic-filter-preview>
  </section>
</template>

<script lang="ts" setup>
import {computed, type Ref} from "vue";
import {storeToRefs} from "pinia";
import DynamicFilterPreview
  from "@webitel/ui-sdk/src/modules/Filters/v2/filters/components/dynamic/preview/dynamic-filter-preview.vue";
import DynamicFilterAddAction
  from "@webitel/ui-sdk/src/modules/Filters/v2/filters/components/dynamic/dynamic-filter-add-action.vue";
import {FilterName} from "@webitel/ui-sdk/src/modules/Filters/v2/filters/classes/Filter.class.ts";
import DynamicFilterConfigForm
  from "@webitel/ui-sdk/src/modules/Filters/v2/filters/components/dynamic/config/dynamic-filter-config-form.vue";
import {useTableFiltersStore} from "../../../main/modules/registry/stores/registry.filters.store.ts";
import DirectionFilter from './direction-filter.vue';

// const props = defineProps({});

const emit = defineEmits([]);

const filtersStore = useTableFiltersStore();
const {filtersManager} = storeToRefs(filtersStore);
window.fmanager = filtersManager;

const {
  addFilter: applyFilter,
  updateFilter: updateAppliedFilter,
  deleteFilter: deleteAppliedFilter,
} = filtersStore;

const appliedFilters = computed(() => {
  console.info('filtersManager.value.filters', filtersManager.value.getFiltersList());
  return filtersManager.value.getFiltersList();
});

const unappliedFilters: Ref<Array<{ name: string, value: FilterName}>> = computed(() => {

  const filterOptions = [
    {
      value: 'direction',
      name: 'Direction title',
    },
    // {
    //   value: 'durationFrom',
    //   name: 'Duration From title',
    // },
    // {
    //   value: 'user',
    //   name: 'User title',
    // },
    // {
    //   value: 'createdAtFrom',
    //   name: 'Created At From title',
    // },
  ];

  return filterOptions;
});

const getFilterValueComponent = (filterName: FilterName) => {
  switch (filterName) {
    case 'direction':
      return DirectionFilter;
    default:
  }
};

</script>

<style lang="scss" scoped>
//.the-history-filters {}
</style>
