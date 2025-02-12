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
import {useTableStore} from '../../../main/modules/registry/store/new/registry.store.ts';
import DirectionFilter from './filter-value-components/direction-filter.vue';
import CreatedAtFromFilter from './filter-value-components/created-at-from-filter.vue';
import VariablesFilter from './filter-value-components/variables-filter.vue';
import DurationFilter from './filter-value-components/duration-filter.vue';
import UserFilter from './filter-value-components/user-filter.vue';
import {SearchMode} from '../../../heading/modules/filters/enums/SearchMode.enum.ts';
import SavePresetAction from "./presets/save-preset-action.vue";
import UserFilterPreview
  from "@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/users/user-filter-value-preview.vue";
import DirectionFilterPreview
  from "@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/directions/direction-filter-value-preview.vue";
import DurationFilterPreview from "@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/durations/duration-filter-value-preview.vue";
import CreatedAtFromFilterPreview
  from "@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/created-at-from/created-at-from-filter-value-preview.vue";
import VariablesFilterPreview
  from "@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/variables/variables-filter-value-preview.vue";
import TeamFilterPreview
  from "@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/teams/team-filter-value-preview.vue";
import TeamFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/teams/team-filter-value-field.vue';
import TagFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/tags/tag-filter-value-field.vue';
import TagFilterPreview from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/tags/tag-filter-value-preview.vue';
import ScoreFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/scores/score-from-to-filter-value-field.vue';
import ScoreFilterPreview from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/scores/score-from-to-filter-value-preview.vue';
import RecordingFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/recordings/recording-filter-value-field.vue';
import RecordingFilterPreview from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/recordings/recording-filter-value-preview.vue';
import QueueFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/queues/queue-filter-value-field.vue';
import QueueFilterPreview from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/queues/queue-filter-value-preview.vue';
import HangupCauseFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/hangup-causes/hangup-cause-filter-value-field.vue';
import HangupCauseFilterPreview
  from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/hangup-causes/hangup-cause-filter-value-preview.vue';
import GranteeFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/grantees/grantee-filter-value-field.vue';
import GranteeFilterPreview from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/grantees/grantee-filter-value-preview.vue';
import GatewayFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/gateways/gateway-filter-value-field.vue';
import GatewayFilterPreview from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/gateways/gateway-filter-value-preview.vue';
import ContactFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/contacts/contacts-filter-value-field.vue';
import ContactFilterPreview from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/contacts/contacts-filter-value-preview.vue';
import CalendarFromToFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/calendar-from-to/calendar-from-to-filter-value-field.vue';
import CalendarFromToFilterPreview
  from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/calendar-from-to/calendar-from-to-filter-value-preview.vue';
import AmdResultFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/amd-results/amd-result-filter-value-field.vue';
import AmdResultFilterPreview
  from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/amd-results/amd-result-filter-value-preview.vue';
import AgentFilter from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/agents/agent-filter-value-field.vue';
import AgentFilterPreview from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/agents/agent-filter-value-preview.vue';

// const props = defineProps({});

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
      id: 'amdResult',
      name: 'Amd Result title',
    },
    {
      id: 'calendarFromTo',
      name: 'calendarFromTo title',
    },
    {
      id: 'grantee',
      name: 'Grantee title',
    },
    {
      id: 'gateway',
      name: 'Gateway title',
    },
    {
      id: 'agent',
      name: 'Agent title',
    },
    {
      id: 'contact',
      name: 'contacts title',
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
      id: 'recording',
      name: 'Recording title',
    },
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
    {
      id: 'team',
      name: 'Team',
    },
    {
      id: 'tag',
      name: 'tag',
    },
    {
      id: 'score',
      name: 'Score',
    }
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
    case 'team':
      return TeamFilter;
    case 'tag':
      return TagFilter;
    case 'score':
      return ScoreFilter;
    case 'recording':
      return RecordingFilter;
    case 'queue':
      return QueueFilter;
    case 'hangupCause':
      return HangupCauseFilter;
    case 'grantee':
      return GranteeFilter;
    case 'gateway':
      return GatewayFilter;
    case 'contact':
      return ContactFilter;
    case 'calendarFromTo':
      return CalendarFromToFilter;
    case 'amdResult':
      return AmdResultFilter;
    case 'agent':
      return AgentFilter;
    default:
  }
};

const getPreviewComponent = (filterName: FilterName) => {
  switch (filterName) {
    case 'direction':
      return DirectionFilterPreview;
    case 'createdAtFrom':
      return CreatedAtFromFilterPreview;
    case 'variables':
      return VariablesFilterPreview;
    case 'duration':
      return DurationFilterPreview;
    case 'user':
      return UserFilterPreview;
    case 'team':
      return TeamFilterPreview;
    case 'tag':
      return TagFilterPreview;
    case 'score':
      return ScoreFilterPreview;
    case 'recording':
      return RecordingFilterPreview;
    case 'queue':
      return QueueFilterPreview;
    case 'hangupCause':
      return HangupCauseFilterPreview;
    case 'grantee':
      return GranteeFilterPreview;
    case 'gateway':
      return GatewayFilterPreview;
    case 'contact':
      return ContactFilterPreview;
    case 'calendarFromTo':
      return CalendarFromToFilterPreview;
    case 'amdResult':
      return AmdResultFilterPreview;
    case 'agent':
      return AgentFilterPreview;
    default:
  }
};

</script>

<style lang="scss" scoped>
//.the-history-filters {}
</style>
