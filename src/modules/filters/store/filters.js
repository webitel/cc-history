import QueryFiltersStoreModule from '@webitel/ui-sdk/src/modules/QueryFilters/store/QueryFiltersStoreModule';
import ApiFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/ApiFilterSchema';
import BaseFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/BaseFilterSchema';
import EnumFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/EnumFilterSchema';
import AgentsAPI from '../api/AgentsAPIRepository';
import CauseOption from '../enums/HangupCauseOption.enum';
import AmdResultOptions from '../enums/AmdResultOptions.enum';
import DirectionOptions from '../enums/DirectionOptions.enum';
import GatewaysAPI from '../api/GatewaysAPIRepository';
import QueuesAPI from '../api/QueuesAPIRepository';
import HasRecording from '../enums/HasRecording.enum';
import HasTranscription from '../enums/HasTranscription.enum';
import TagOptions from '../enums/TagOptions.enum';
import TeamAPI from '../api/TeamsAPIRepository';
import UserAPI from '../api/UsersAPIRepository';

const state = {
  agent: new ApiFilterSchema({
    API: AgentsAPI.getLookup,
    locale: { label: 'fields.agent' },
  }),
  cause: new EnumFilterSchema({
    options: CauseOption,
    locale: { label: 'fields.cause' },
  }),
  amdResult: new EnumFilterSchema({
    options: AmdResultOptions,
    locale: { label: 'fields.amdResult' },
  }),
  direction: new EnumFilterSchema({
    options: DirectionOptions,
    locale: { label: 'fields.direction' },
    multiple: false,
  }),
  duration: new BaseFilterSchema({
    value: { from: 0, to: null },
    defaultValue: [],
  }),
  from: new BaseFilterSchema({
    value: new Date().setHours(0, 0, 0, 0),
    defaultValue: new Date().setHours(0, 0, 0, 0),
  }),
  to: new BaseFilterSchema({
    value: new Date().setHours(23, 59, 59, 0),
    defaultValue: new Date().setHours(23, 59, 59, 0),
  }),
  gateway: new ApiFilterSchema({
    API: GatewaysAPI.getLookup,
    locale: { label: 'fields.gateway' },
  }),
  queue: new ApiFilterSchema({
    API: QueuesAPI.getLookup,
    locale: { label: 'fields.queue' },
  }),
  search: new BaseFilterSchema(),
  fts: new BaseFilterSchema(),
  tags: new EnumFilterSchema({
    options: TagOptions,
    locale: { label: 'fields.tags' },
  }),
  team: new ApiFilterSchema({
    API: TeamAPI.getLookup,
    locale: { label: 'fields.team' },
  }),
  user: new ApiFilterSchema({
    API: UserAPI.getLookup,
    locale: { label: 'fields.user' },
  }),
  hasRecording: new EnumFilterSchema({
    options: HasRecording,
    locale: { label: 'filters.hasRecording' },
    multiple: false,
  }),
  hasTranscription: new EnumFilterSchema({
    options: HasTranscription,
    locale: { label: 'filters.hasTranscription' },
    multiple: false,
  }),
};

export default new QueryFiltersStoreModule({ state }).getModule();
