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
    valueField: EvaluationFilter,
    previewField: EvaluationFilterPreview,
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
    valueField: HangupCauseFilter,
    previewField: HangupCauseFilterPreview,
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
    valueField: RecordingFilter,
    previewField: RecordingFilterPreview,
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
    valueField: TalkDuration,
    previewField: TalkDurationPreview,
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
    valueField: TranscriptionFilter,
    previewField: TranscriptionFilterPreview,
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
