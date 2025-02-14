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

import AgentFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/agent/agent-filter-value-field.vue';
import AgentFilterPreview from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/agent/agent-filter-value-preview.vue';
import AmdResultFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/amd-result/amd-result-filter-value-field.vue';
import AmdResultFilterPreview
  from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/amd-result/amd-result-filter-value-preview.vue';
import ContactFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/contact/contact-filter-value-field.vue';
import ContactFilterPreview from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/contact/contact-filter-value-preview.vue';
import CreatedAtFromFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/created-at-from/created-at-from-filter-value-field.vue';
import CreatedAtFromFilterPreview
  from "@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/created-at-from/created-at-from-filter-value-preview.vue";
import CreatedAtToFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/created-at-to/created-at-to-filter-value-field.vue';
import CreatedAtToFilterPreview
  from "@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/created-at-to/created-at-to-filter-value-preview.vue";
import DirectionFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/direction/direction-filter-value-field.vue';
import DirectionFilterPreview
  from "@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/direction/direction-filter-value-preview.vue";
import EvaluationFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/evaluation/evaluation-filter-value-field.vue';
import EvaluationFilterPreview
  from "@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/evaluation/evaluation-filter-value-preview.vue";
import GatewayFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/gateway/gateway-filter-value-field.vue';
import GatewayFilterPreview from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/gateway/gateway-filter-value-preview.vue';
import GranteeFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/grantee/grantee-filter-value-field.vue';
import GranteeFilterPreview from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/grantee/grantee-filter-value-preview.vue';
import HangupCauseFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/hangup-cause/hangup-cause-filter-value-field.vue';
import HangupCauseFilterPreview
  from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/hangup-cause/hangup-cause-filter-value-preview.vue';
import QueueFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/queue/queue-filter-value-field.vue';
import QueueFilterPreview from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/queue/queue-filter-value-preview.vue';
import RatedByFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/rated-by/rated-by-filter-value-field.vue';
import RatedByFilterPreview from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/rated-by/rated-by-filter-value-preview.vue';
import RecordingFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/recording/recording-filter-value-field.vue';
import RecordingFilterPreview from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/recording/recording-filter-value-preview.vue';
import ScoreFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/score/score-from-to-filter-value-field.vue';
import ScoreFilterPreview from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/score/score-from-to-filter-value-preview.vue';
import TagFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/tag/tag-filter-value-field.vue';
import TagFilterPreview from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/tag/tag-filter-value-preview.vue';
import TalkDuration from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/talk-duration/talk-duration-filter-value-field.vue';
import TalkDurationPreview from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/talk-duration/talk-duration-filter-value-preview.vue';
import TeamFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/team/team-filter-value-field.vue';
import TeamFilterPreview
  from "@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/team/team-filter-value-preview.vue";
import TotalDurationFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/total-duration/total-duration-filter-value-field.vue';
import TotalDurationFilterPreview
  from "@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/total-duration/total-duration-filter-value-preview.vue";
import TranscriptionFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/transcription/transcription-filter-value-field.vue';
import TranscriptionFilterPreview
  from "@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/transcription/transcription-filter-value-preview.vue";
import UserFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/user/user-filter-value-field.vue';
import UserFilterPreview
  from "@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/user/user-filter-value-preview.vue";
import VariableFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/variable/variable-filter-value-field.vue';
import VariableFilterPreview
  from "@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/variable/variable-filter-value-preview.vue";

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
