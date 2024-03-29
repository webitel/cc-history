import QueryFiltersStoreModule from '@webitel/ui-sdk/src/modules/QueryFilters/store/QueryFiltersStoreModule';
import ApiFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/ApiFilterSchema';
import BaseFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/BaseFilterSchema';
import EnumFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/EnumFilterSchema';
import isEmpty from '@webitel/ui-sdk/src/scripts/isEmpty';
import AgentsAPI from '../api/AgentsAPIRepository';
import RolesAPI from '../api/RolesAPIRepository';
import CauseOption from '../enums/HangupCauseOption.enum';
import AmdResultOptions from '../enums/AmdResultOptions.enum';
import DirectionOptions from '../enums/DirectionOptions.enum';
import RatedOptions from '../enums/RatedOptions.enum';
import GatewaysAPI from '../api/GatewaysAPIRepository';
import QueuesAPI from '../api/QueuesAPIRepository';
import hasFile from '../enums/HasFile.enum';
import HasTranscription from '../enums/HasTranscription.enum';
import TagOptions from '../enums/TagOptions.enum';
import TeamAPI from '../api/TeamsAPIRepository';
import UserAPI from '../api/UsersAPIRepository';
import ContactsAPI from '../api/ContactsAPI';
import SearchMode from '../../heading/modules/filters/enums/SearchMode.enum';

const state = {
  agent: new ApiFilterSchema({
    API: AgentsAPI.getLookup,
    locale: { label: 'fields.agent' },
    access: {
      scope: [],
    },
  }),
  cause: new EnumFilterSchema({
    options: CauseOption,
    locale: { label: 'fields.cause' },
  }),
  amdResult: new EnumFilterSchema({
    options: [...AmdResultOptions],
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
  [SearchMode.SEARCH]: new BaseFilterSchema(),
  [SearchMode.FTS]: new BaseFilterSchema(),
  [SearchMode.DESCRIPTION]: new BaseFilterSchema(),
  [SearchMode.VARIABLE]: new BaseFilterSchema(),
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
  grantee: new ApiFilterSchema({
    API: RolesAPI.getLookup,
    locale: { label: 'fields.grantee' },
  }),
  contact: new ApiFilterSchema({
    API: ContactsAPI.getLookup,
    locale: { label: 'fields.contact' },
  }),
  hasFile: new EnumFilterSchema({
    options: hasFile,
    locale: { label: 'filters.hasFile' },
    multiple: false,
  }),
  hasTranscription: new EnumFilterSchema({
    options: HasTranscription,
    locale: { label: 'filters.hasTranscription' },
    multiple: false,
  }),
  rated: new EnumFilterSchema({
    options: RatedOptions,
    locale: { label: 'filters.rated' },
    multiple: false,
  }),
  ratedBy: new ApiFilterSchema({
    API: UserAPI.getLookup,
    locale: { label: 'fields.ratedBy' },
  }),
  talkSec: new BaseFilterSchema({
    value: { from: 0, to: null },
    defaultValue: [],
  }),
  score: new BaseFilterSchema({
    value: { from: 0, to: 100 },
    defaultValue: [],
  }),
};

const getters = {
  GET_FULL_FILTER_VALUES: (state) => Object.keys(state)
    .reduce((filters, filterKey) => {
      const filterValue = state[filterKey].value;
      return isEmpty(filterValue) ? filters : { ...filters, [filterKey]: filterValue };
    }, {}),
};

export default new QueryFiltersStoreModule({ state, getters }).getModule();
