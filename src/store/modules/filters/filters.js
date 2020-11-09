import filtersModule from './filtersModule';
import agent from '../../../shared/filters/filter-agent/filterAgent.schema';
import cause from '../../../shared/filters/filter-cause/filterCause.schema';
import direction from '../../../shared/filters/filter-direction/filterDirection.schema';
import duration from '../../../shared/filters/filter-duration/filterDuration.schema';
import from from '../../../shared/filters/filter-from/filterFrom.schema';
import to from '../../../shared/filters/filter-to/filterTo.schema';
import gateway from '../../../shared/filters/filter-gateway/filterGateway.schema';
import queue from '../../../shared/filters/filter-queues/filterQueues.schema';
import search from '../../../shared/filters/filter-search/filterSearch.schema';
import team from '../../../shared/filters/filter-teams/filterTeams.schema';
import user from '../../../shared/filters/filter-user/filterUser.schema';

const state = {
  agent,
  cause,
  direction,
  duration,
  from,
  to,
  gateway,
  queue,
  search,
  team,
  user,
};

export default {
  ...filtersModule(),
  state,
};
