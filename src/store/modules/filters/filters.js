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

const isEmpty = (value) => {
  if (Array.isArray(value)) return !value.length;
  if (typeof value === 'object') return !value || !Object.keys(value).length;
  return !value;
};

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

const getters = {
  GET_FILTERS: (state, getters) => Object.keys(state)
    .reduce((filters, filterKey) => {
      const filterValue = getters.GET_FILTER(filterKey);
      return isEmpty(filterValue) ? filters : { ...filters, [filterKey]: filterValue };
    }, {}),
  GET_FILTER: (state) => (filter) => {
    const { value, storedProp, multiple } = state[filter];
    if (multiple) return value.map((item) => item[storedProp]); // if arr, map
    if (storedProp) return value[storedProp]; // if object and has specific prop, return this prop
    return value; // else return val
  },
};

const actions = {
  SET_FILTER: (context, { filter, value }) => {
    const { multiple, defaultValue } = context.state[filter];
    let newValue = value;
    if (newValue) {
      if (multiple && !Array.isArray(newValue)) newValue = [newValue];
    } else {
      newValue = defaultValue;
    }
    context.commit('SET_FILTER', { filter, value: newValue });
  },
  RESET_FILTERS: (context) => {
    context.commit('RESET_FILTERS');
  },
};

const mutations = {
  SET_FILTER: (state, { filter, value }) => {
    state[filter].value = value;
  },
  RESET_FILTERS: (state) => {
    Object.keys(state).forEach((filter) => {
      state[filter].value = state[filter].defaultValue;
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
