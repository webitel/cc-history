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

      <template #info>
        <component
          :is="getPreviewComponent(filter.name)"
          :value="filter.value">
        </component>
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
import {computed, type Ref} from 'vue';
import {storeToRefs} from 'pinia';
import TableFiltersPanel from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/table-filters-panel.vue';
import DynamicFilterPreview
  from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/preview/dynamic-filter-preview.vue';
import DynamicFilterAddAction
  from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/dynamic-filter-add-action.vue';
import {FilterName} from '@webitel/ui-sdk/src/modules/Filters/v2/filters/types/Filter.d.ts';
import DynamicFilterConfigForm
  from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/config/dynamic-filter-config-form.vue';
import {SearchMode} from '../../../heading/modules/filters/enums/SearchMode.enum.ts';
import SavePresetAction from "./presets/save-preset-action.vue";
import {useTableStore} from '../../../main/modules/registry/store/new/registry.store.ts';
import {
  AgentFilter,
  AgentFilterPreview,
  AmdResultFilter,
  AmdResultFilterPreview,
  ContactFilter,
  ContactFilterPreview,
  CreatedAtFromFilter,
  CreatedAtFromFilterPreview,
  CreatedAtToFilter,
  CreatedAtToFilterPreview,
  DirectionFilter,
  DirectionFilterPreview,
  EvaluationFilter,
  EvaluationFilterPreview,
  GatewayFilter,
  GatewayFilterPreview,
  GranteeFilter,
  GranteeFilterPreview,
  HangupCauseFilter,
  HangupCauseFilterPreview,
  QueueFilter,
  QueueFilterPreview,
  RatedByFilter,
  RatedByFilterPreview,
  RecordingFilter,
  RecordingFilterPreview,
  ScoreFilter,
  ScoreFilterPreview,
  TagFilter,
  TagFilterPreview,
  TalkDuration,
  TalkDurationPreview,
  TeamFilter,
  TeamFilterPreview,
  TotalDurationFilter,
  TotalDurationFilterPreview,
  TranscriptionFilter,
  TranscriptionFilterPreview,
  UserFilter,
  UserFilterPreview,
  VariableFilter,
  VariableFilterPreview,
} from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/index.js';

const emit = defineEmits<{
  hide: [],
}>();

const tableStore = useTableStore();
const {filtersManager} = storeToRefs(tableStore);
window.fmanager = filtersManager;

const {
  addFilter: applyFilter,
  updateFilter: updateAppliedFilter,
  deleteFilter: deleteAppliedFilter,
} = tableStore;

const appliedFilters = computed(() => {
  const exclude = Object.values(SearchMode);
  return filtersManager.value.getFiltersList({exclude});
});

const unappliedFilters: Ref<Array<{ name: string, value: FilterName }>> = computed(() => {

  const filterOptions = [
    {
      id: 'agent',
      name: 'Agent title',
    },
    {
      id: 'amdResult',
      name: 'Amd Result title',
    },
    {
      id: 'contact',
      name: 'contacts title',
    },
    {
      id: 'createdAtFrom',
      name: 'Created At From title',
    },
    {
      id: 'createdAtTo',
      name: 'Created At To title',
    },
    {
      id: 'direction',
      name: 'Direction title',
    },
    {
      id: 'evaluation',
      name: 'Evaluation title',
    },
    {
      id: 'gateway',
      name: 'Gateway title',
    },
    {
      id: 'grantee',
      name: 'Grantee title',
    },
    {
      id: 'hangupCause',
      name: 'hangupCause',
    },
    {
      id: 'queue',
      name: 'Queue title',
    },
    {
      id: 'ratedBy',
      name: 'ratedBy title',
    },
    {
      id: 'recording',
      name: 'Recording title',
    },
    {
      id: 'score',
      name: 'Score',
    },
    {
      id: 'tag',
      name: 'tag',
    },
    {
      id: 'talkDuration',
      name: 'talkDuration title',
    },
    {
      id: 'team',
      name: 'Team',
    },
    {
      id: 'totalDuration',
      name: 'totalDuration title',
    },
    {
      id: 'transcription',
      name: 'transcription title',
    },
    {
      id: 'user',
      name: 'User title',
    },

    {
      id: 'variable',
      name: 'Vars title',
    },
  ];

  return filterOptions;
});

const getFilterValueComponent = (filterName: FilterName) => {
  switch (filterName) {
    case 'agent':
      return AgentFilter;
    case 'amdResult':
      return AmdResultFilter;
    case 'contact':
      return ContactFilter;
    case 'createdAtFrom':
      return CreatedAtFromFilter;
    case 'createdAtTo':
      return CreatedAtToFilter;
    case 'direction':
      return DirectionFilter;
    case 'evaluation':
      return EvaluationFilter;
    case 'gateway':
      return GatewayFilter;
    case 'grantee':
      return GranteeFilter;
    case 'hangupCause':
      return HangupCauseFilter;
    case 'queue':
      return QueueFilter;
    case 'ratedBy':
      return RatedByFilter;
    case 'recording':
      return RecordingFilter;
    case 'score':
      return ScoreFilter;
    case 'tag':
      return TagFilter;
    case 'talkDuration':
      return TalkDuration;
    case 'team':
      return TeamFilter;
    case 'totalDuration':
      return TotalDurationFilter;
    case 'transcription':
      return TranscriptionFilter;
    case 'user':
      return UserFilter;
    case 'variable':
      return VariableFilter;
    default:
  }
};

const getPreviewComponent = (filterName: FilterName) => {
  switch (filterName) {
    case 'agent':
      return AgentFilterPreview;
    case 'amdResult':
      return AmdResultFilterPreview;
    case 'contact':
      return ContactFilterPreview;
    case 'createdAtFrom':
      return CreatedAtFromFilterPreview;
    case 'createdAtTo':
      return CreatedAtToFilterPreview;
    case 'direction':
      return DirectionFilterPreview;
    case 'evaluation':
      return EvaluationFilterPreview;
    case 'gateway':
      return GatewayFilterPreview;
    case 'grantee':
      return GranteeFilterPreview;
    case 'hangupCause':
      return HangupCauseFilterPreview;
    case 'queue':
      return QueueFilterPreview;
    case 'ratedBy':
      return RatedByFilterPreview;
    case 'recording':
      return RecordingFilterPreview;
    case 'score':
      return ScoreFilterPreview;
    case 'tag':
      return TagFilterPreview;
    case 'talkDuration':
      return TalkDurationPreview;
    case 'team':
      return TeamFilterPreview;
    case 'totalDuration':
      return TotalDurationFilterPreview;
    case 'transcription':
      return TranscriptionFilterPreview;
    case 'user':
      return UserFilterPreview;
    case 'variable':
      return VariableFilterPreview;
    default:
  }
};

</script>

<style lang="scss" scoped>
//.the-history-filters {}
</style>
