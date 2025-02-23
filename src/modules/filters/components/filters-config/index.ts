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
  RatedFilter,
  RatedFilterPreview,
  GatewayFilter,
  GatewayFilterPreview,
  GranteeFilter,
  GranteeFilterPreview,
  CauseFilter,
  CauseFilterPreview,
  QueueFilter,
  QueueFilterPreview,
  RatedByFilter,
  RatedByFilterPreview,
  HasFileFilter,
  HasFileFilterPreview,
  ScoreFilter,
  ScoreFilterPreview,
  TagFilter,
  TagFilterPreview,
  TalkDurationFilter,
  TalkDurationFilterPreview,
  TeamFilter,
  TeamFilterPreview,
  TotalDurationFilter,
  TotalDurationFilterPreview,
  HasTranscriptionFilter,
  HasTranscriptionFilterPreview,
  UserFilter,
  UserFilterPreview,
  VariableFilter,
  VariableFilterPreview,
} from '@webitel/ui-sdk/src/modules/Filters/v2/filters/components/values/index';
import {Component} from "vue";


interface FilterOptionsComponentsConfig {
  [key: string]: {
    valueField: Component
    previewField: Component
  }
}
const FILTER_OPTIONS_COMPONENTS_CONFIG: FilterOptionsComponentsConfig = {
  agent: {
    valueField: AgentFilter,
    previewField: AgentFilterPreview,
  },
  amdResult: {
    valueField: AmdResultFilter,
    previewField: AmdResultFilterPreview,
  },
  contact: {
    valueField: ContactFilter,
    previewField: ContactFilterPreview,
  },
  createdAtFrom: {
    valueField: CreatedAtFromFilter,
    previewField: CreatedAtFromFilterPreview,
  },
  createdAtTo: {
    valueField: CreatedAtToFilter,
    previewField: CreatedAtToFilterPreview,
  },
  direction: {
    valueField: DirectionFilter,
    previewField: DirectionFilterPreview,
  },
  rated: {
    valueField: RatedFilter,
    previewField: RatedFilterPreview,
  },
  gateway: {
    valueField: GatewayFilter,
    previewField: GatewayFilterPreview,
  },
  grantee: {
    valueField: GranteeFilter,
    previewField: GranteeFilterPreview,
  },
  cause: {
    valueField: CauseFilter,
    previewField: CauseFilterPreview,
  },
  queue: {
    valueField: QueueFilter,
    previewField: QueueFilterPreview,
  },
  ratedBy: {
    valueField: RatedByFilter,
    previewField: RatedByFilterPreview,
  },
  hasFile: {
    valueField: HasFileFilter,
    previewField: HasFileFilterPreview,
  },
  score: {
    valueField: ScoreFilter,
    previewField: ScoreFilterPreview,
  },
  tags: {
    valueField: TagFilter,
    previewField: TagFilterPreview,
  },
  talkSec: {
    valueField: TalkDurationFilter,
    previewField: TalkDurationFilterPreview,
  },
  team: {
    valueField: TeamFilter,
    previewField: TeamFilterPreview,
  },
  duration: {
    valueField: TotalDurationFilter,
    previewField: TotalDurationFilterPreview,
  },
  hasTranscription: {
    valueField: HasTranscriptionFilter,
    previewField: HasTranscriptionFilterPreview,
  },
  user: {
    valueField: UserFilter,
    previewField: UserFilterPreview,
  },
  variable: {
    valueField: VariableFilter,
    previewField: VariableFilterPreview,
  },
}
export default FILTER_OPTIONS_COMPONENTS_CONFIG
