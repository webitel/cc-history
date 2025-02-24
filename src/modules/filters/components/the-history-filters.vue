<template>
  <section class="the-history-filters">
    <dynamic-filter-panel-wrapper>
      <template #filters>
        <dynamic-filter-preview
          v-for="(filter) of appliedFilters"
          :key="filter.name"
          :filter="filter"
          @delete:filter="deleteAppliedFilter($event.name)"
        >
          <template #form="{ hide }">
            <dynamic-filter-config-form
              :filter="filter"
              @submit="(data) => setFilterWrapperAction(data, updateAppliedFilter, hide)"
              @cancel="() => hide()"
            >
              <template #value-input="{ filterName, filterValue, onValueChange, onValueInvalidChange }">
                <component
                  :is="getFilterFieldComponent(filterName, 'valueField')"
                  :key="filterName"
                  :model-value="filterValue"
                  @update:model-value="onValueChange"
                  @update:invalid="onValueInvalidChange"
                />
              </template>
            </dynamic-filter-config-form>
          </template>

          <template #info>
            <component
              :is="getFilterFieldComponent(filter.name, 'previewField')"
              :value="filter.value"
            >
            </component>
          </template>
        </dynamic-filter-preview>

        <dynamic-filter-add-action show-label>
          <template #form="{ hide }">
            <dynamic-filter-config-form
              :options="unappliedFilters"
              @submit="(data) => setFilterWrapperAction(data, applyFilter, hide)"
              @cancel="() => hide()"
            >
              <template #value-input="{ filterName, filterValue, onValueChange, onValueInvalidChange }">
                <component
                  :is="getFilterFieldComponent(filterName, 'valueField')"
                  :key="filterName"
                  :model-value="filterValue"
                  @update:model-value="onValueChange"
                  @update:invalid="onValueInvalidChange"
                />
              </template>
            </dynamic-filter-config-form>
          </template>
        </dynamic-filter-add-action>
      </template>

      <template #actions>
        <!--        TODO: <save-preset-action />-->

        <wt-icon-action
          action="close"
          @click="emit('hide')"
        />
      </template>
    </dynamic-filter-panel-wrapper>
  </section>
</template>

<script lang="ts" setup>
import {computed, type Ref} from 'vue';
import {storeToRefs} from 'pinia';
import {useI18n} from "vue-i18n";
import DynamicFilterPreview
  from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/preview/dynamic-filter-preview.vue';
import DynamicFilterAddAction
  from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/dynamic-filter-add-action.vue';
import {FilterName} from '@webitel/ui-sdk/src/modules/Filters/v2/filters/types/Filter.d.ts';
import DynamicFilterConfigForm
  from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/config/dynamic-filter-config-form.vue';
import DynamicFilterPanelWrapper
  from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/dynamic-filter-panel-wrapper.vue';
import {FilterInitParams, IFilter} from "@webitel/ui-sdk/src/modules/Filters/v2/filters/types/Filter";
import {useRegistryStore} from '../../main/modules/registry/store/new/registry.store.ts';
import {SearchMode} from '../enums/SearchMode.ts';
// import SavePresetAction from "./presets/save-preset-action.vue";
import FILTER_OPTIONS_COMPONENTS_CONFIG from "./filters-config";

// const props = defineProps({});

const emit = defineEmits<{
  hide: [],
}>();

const {t} = useI18n();
const tableStore = useRegistryStore();
const {filtersManager} = storeToRefs(tableStore);

const {
  addFilter: applyFilter,
  updateFilter: updateAppliedFilter,
  deleteFilter: deleteAppliedFilter,
} = tableStore;

function setFilterWrapperAction(
  data: FilterInitParams,
  filterAction: (d: FilterInitParams) => IFilter,
  closeCb: () => void
) {
  filterAction(data)
  closeCb()
}

const appliedFilters = computed(() => {
  const exclude = Object.values(SearchMode);
  return filtersManager.value.getFiltersList({exclude});
});

const unappliedFilters: Ref<Array<{ name: string, value: FilterName }>> = computed(() => {
  const excludeNames = new Set(filtersManager.value.getFiltersList().map((item) => item.name));

  return Object.keys(FILTER_OPTIONS_COMPONENTS_CONFIG)
    .filter(key => !excludeNames.has(key))
    .map(key => ({
      name: t(`webitelUI.filters.${key}`),
      value: key,
    }));
});

const getFilterFieldComponent = (filterName: FilterName, filterField: 'valueField' | 'previewField') => {
  const filter = FILTER_OPTIONS_COMPONENTS_CONFIG[filterName]
  return !filter ? '' : filter[filterField] || ''
};

</script>

<style lang="scss" scoped>
//.the-history-filters {}
</style>
