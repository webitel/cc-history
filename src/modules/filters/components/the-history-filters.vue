<template>
  <section class="the-history-filters">
    <dynamic-filter-panel-wrapper>
      <template #filters>
<!--        WTF? -  /* https://webitel.atlassian.net/browse/WTEL-6308?focusedCommentId=657415 */ -->
        <dynamic-filter-preview
          v-if="!hasCreatedAtFromFilter"
          :filter="defaultCreatedAtFromFilterDataPreview"
          dummy
        >
          <template #info>
            <component
              :is="filterOptionsComponentsConfig['createdAtFrom'].previewField"
              :value="defaultCreatedAtFromFilterDataPreview.value"
            />
          </template>
        </dynamic-filter-preview>

        <dynamic-filter-preview
          v-for="(filter) of appliedFilters"
          :key="filter.name"
          :filter="filter"
          disable-click-away
          @delete:filter="deleteAppliedFilter($event.name)"
        >
          <template #form="{ hide }">
            <dynamic-filter-config-form
              :options="getAppliedFiltersOptions(filter)"
              :filter="filter"
              @cancel="() => hide()"
              @submit="(data) => setFilterWrapperAction(data, updateAppliedFilter, hide)"
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

        <dynamic-filter-add-action
          :show-label="!appliedFilters.length"
        >
          <template #form="{ hide }">
            <dynamic-filter-config-form
              :options="unappliedFilters"
              @cancel="() => hide()"
              @submit="(data) => setFilterWrapperAction(data, applyFilter, hide)"
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
        <load-preset-action />

        <save-preset-action />

        <wt-icon-action
          action="clear"
          @click="resetFilters"
        />

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
import {
  FilterInitParams,
  FilterName,
  IFilter
} from '@webitel/ui-sdk/src/modules/Filters/v2/filters/types/Filter.d.ts';
import DynamicFilterConfigForm
  from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/config/dynamic-filter-config-form.vue';
import DynamicFilterPanelWrapper
  from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/dynamic-filter-panel-wrapper.vue';
import {startOfToday} from "date-fns";
import {useRegistryStore} from '../../main/modules/registry/store/new/registry.store.ts';
import {SearchMode} from '../enums/SearchMode.ts';
import SavePresetAction from "../modules/presets/components/save-preset-action.vue";
import LoadPresetAction from "../modules/presets/components/load-preset-action.vue";
import filterOptionsComponentsConfig, { getFilterFieldComponent } from "./filters-config";

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

/* WTF? - https://webitel.atlassian.net/browse/WTEL-6308?focusedCommentId=657415 */
const defaultCreatedAtFromFilterDataPreview = computed(() => ({
  name: 'createdAtFrom',
  value: startOfToday().getTime(),
  label: t('webitelUI.filters.predefinedLabels.createdAt.startOfToday'),
}));

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

const hasCreatedAtFromFilter = computed(() => {
  return !!filtersManager.value.getAllValues().createdAtFrom;
});

const unappliedFilters: Ref<Array<{ name: string, value: FilterName }>> = computed(() => {
  const excludeNames = new Set(filtersManager.value.getFiltersList().map((item) => item.name));

  return Object.keys(filterOptionsComponentsConfig)
    .filter(key => !excludeNames.has(key))
    .map(key => ({
      name: t(`webitelUI.filters.${key}`),
      value: key,
    }));
});

const getAppliedFiltersOptions = (filter: IFilter) => {
  const filterData = {
    name: t(`webitelUI.filters.${filter.name}`),
    value: filter.name,
  }
  return [...unappliedFilters.value, filterData]
}

const resetFilters = () => {
  filtersManager.value.reset();
};
</script>

<style lang="scss" scoped>
</style>
