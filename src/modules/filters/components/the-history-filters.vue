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
              :is="FilterOptionToPreviewComponentMap[FilterOption.CreatedAtFrom]"
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
                  :is="FilterOptionToValueComponentMap[filterName]"
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
              :is="FilterOptionToPreviewComponentMap[filter.name]"
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
                  :is="FilterOptionToValueComponentMap[filterName]"
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
        <apply-preset-action
          :namespace="namespace"
          :use-presets-store="createFilterPresetsStore(namespace)"
          @apply="applyPreset"
        />

        <save-preset-action
          :namespace="namespace"
          :filters-manager="filtersManager"
        />

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
import {
  ApplyPresetAction,
  createFilterPresetsStore,
  SavePresetAction,
} from '@webitel/ui-sdk/src/modules/Filters/v2/filter-presets/index';
import DynamicFilterConfigForm
  from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/config/dynamic-filter-config-form.vue';
import DynamicFilterAddAction
  from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/dynamic-filter-add-action.vue';
import DynamicFilterPanelWrapper
  from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/dynamic-filter-panel-wrapper.vue';
import {FilterOptionToPreviewComponentMap, FilterOptionToValueComponentMap } from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/filter-options/index';
import DynamicFilterPreview
  from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/preview/dynamic-filter-preview.vue';
import {FilterOption} from "@webitel/ui-sdk/src/modules/Filters/v2/filters/enums/FilterOption.ts";
import {
  FilterInitParams,
  FilterName,
  IFilter
} from '@webitel/ui-sdk/src/modules/Filters/v2/filters/types/Filter.d.ts';
import {startOfToday} from "date-fns";
import {storeToRefs} from 'pinia';
import {computed, type Ref} from 'vue';
import {useI18n} from "vue-i18n";

import { namespace } from "../../main/modules/registry/namespace.ts";
import {useRegistryStore} from '../../main/modules/registry/store/new/registry.store.ts';
import {SearchMode} from '../enums/SearchMode.ts';
import { filtersOptions } from "./filters-options";

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
  name: FilterOption.CreatedAtFrom,
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

  return filtersOptions
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

const applyPreset = (snapshot) => {
  filtersManager.value.reset();
  filtersManager.value.fromString(snapshot);
};
</script>

<style lang="scss" scoped>
</style>
