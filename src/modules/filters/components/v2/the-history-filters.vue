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
          <template #form>
            <dynamic-filter-config-form
              :filter="filter"
              @submit="updateAppliedFilter"
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

        <dynamic-filter-add-action>
          <template #form="{ hide }">
            <dynamic-filter-config-form
              :options="unappliedFilters"
              @submit="(data) => applyFilterWrapper(data, hide)"
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
import {FilterName} from '@webitel/ui-sdk/src/modules/Filters/v2/filters/types/Filter';
import DynamicFilterConfigForm
  from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/config/dynamic-filter-config-form.vue';
import DynamicFilterPanelWrapper
  from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/dynamic-filter-panel-wrapper.vue';
import {useRegistryStore} from '../../../main/modules/registry/store/new/registry.store.ts';
import {SearchMode} from '../../../heading/modules/filters/enums/SearchMode.enum.ts';
// import SavePresetAction from "./presets/save-preset-action.vue";
import FILTER_OPTIONS_COMPONENTS_CONFIG from "./filters-config/_index";

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

function applyFilterWrapper(data, closeCb) {
  applyFilter(data)
  closeCb()
}

const appliedFilters = computed(() => {
  const exclude = Object.values(SearchMode);
  return filtersManager.value.getFiltersList({exclude});
});

const unappliedFilters: Ref<Array<{ name: string, value: FilterName }>> = computed(() => {

  const filterOptions = [
    {
      id: 'agent',
      name: t('webitelUI.filters.agent'),
    },
    {
      id: 'amdResult',
      name: t('webitelUI.filters.amdResult'),
    },
    {
      id: 'contact',
      name: t('webitelUI.filters.contact'),
    },
    {
      id: 'createdAtFrom',
      name: t('webitelUI.filters.createdAtFrom'),
    },
    {
      id: 'createdAtTo',
      name: t('webitelUI.filters.createdAtTo'),
    },
    {
      id: 'direction',
      name: t('webitelUI.filters.direction'),
    },
    {
      id: 'evaluation',
      name: t('webitelUI.filters.evaluation'),
    },
    {
      id: 'gateway',
      name: t('webitelUI.filters.gateway', 1),
    },
    {
      id: 'grantee',
      name: t('webitelUI.filters.grantee'),
    },
    {
      id: 'hangupCause',
      name: t('webitelUI.filters.hangupCause'),
    },
    {
      id: 'queue',
      name: t('webitelUI.filters.queue'),
    },
    {
      id: 'ratedBy',
      name: t('webitelUI.filters.ratedBy'),
    },
    {
      id: 'recording',
      name: t('webitelUI.filters.recording'),
    },
    {
      id: 'score',
      name: t('webitelUI.filters.score'),
    },
    {
      id: 'tag',
      name: t('webitelUI.filters.tag'),
    },
    {
      id: 'talkDuration',
      name: t('webitelUI.filters.talkDuration'),
    },
    {
      id: 'team',
      name: t('webitelUI.filters.team'),
    },
    {
      id: 'totalDuration',
      name: t('webitelUI.filters.totalDuration'),
    },
    {
      id: 'transcription',
      name: t('webitelUI.filters.transcription'),
    },
    {
      id: 'user',
      name: t('webitelUI.filters.user'),
    },
    {
      id: 'variable',
      name: t('webitelUI.filters.variable'),
    },
  ];

  return filterOptions;
});

const getFilterFieldComponent = (filterName: FilterName, filterField: 'valueField' | 'previewField') => {
  const filter = FILTER_OPTIONS_COMPONENTS_CONFIG[filterName]
  return !filter ? '' : filter[filterField] || ''
};

</script>

<style lang="scss" scoped>
//.the-history-filters {}
</style>
