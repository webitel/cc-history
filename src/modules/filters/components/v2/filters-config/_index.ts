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
import {Component} from "vue";


interface FilterOptionsComponentsConfig {
  [key: string]: {
    valueField: Component
    previewField: Component
  }
}

 const FILTER_OPTIONS_COMPONENTS_CONFIG: FilterOptionsComponentsConfig = {
  transcription: {
    valueField: TranscriptionFilter,
    previewField: TranscriptionFilterPreview,
  },
  talkDuration: {
    valueField: TalkDuration,
    previewField: TalkDurationPreview,
  },
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
  evaluation: {
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
  hangupCause: {
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
  recording: {
    valueField: RecordingFilter,
    previewField: RecordingFilterPreview,
  },
  score: {
    valueField: ScoreFilter,
    previewField: ScoreFilterPreview,
  },
  tag: {
    valueField: TagFilter,
    previewField: TagFilterPreview,
  },
  team: {
    valueField: TeamFilter,
    previewField: TeamFilterPreview,
  },
  totalDuration: {
    valueField: TotalDurationFilter,
    previewField: TotalDurationFilterPreview,
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
