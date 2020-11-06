const isEmpty = (value) => {
  if (Array.isArray(value)) return !value.length;
  if (typeof value === 'object') return !value || !Object.keys(value).length;
  return !value;
};

const state = {
  agent: {
    value: [],
    defaultValue: [],
    storedProp: 'id',
    multiple: true,
  },
  cause: {
    value: [],
    defaultValue: [],
    storedProp: 'code',
    multiple: true,
  },
  direction: {
    value: [],
    defaultValue: [],
    storedProp: 'value',
    multiple: true,
  },
  duration: {
    defaultValue: [],
    value: { from: 0, to: null },
    multiple: false,
  },
  from: {
    value: new Date().setHours(0, 0, 0, 0),
    defaultValue: new Date().setHours(0, 0, 0, 0),
    multiple: false,
  },
  to: {
    value: new Date().setHours(23, 59, 59, 0),
    defaultValue: new Date().setHours(23, 59, 59, 0),
    multiple: false,
  },
  gateway: {
    value: [],
    defaultValue: [],
    storedProp: 'id',
    multiple: true,
  },
  queue: {
    value: [],
    defaultValue: [],
    storedProp: 'id',
    multiple: true,
  },
  search: {
    value: '',
    defaultValue: '',
    multiple: false,
  },
  team: {
    value: [],
    defaultValue: [],
    storedProp: 'id',
    multiple: true,
  },
  user: {
    value: [],
    defaultValue: [],
    storedProp: 'id',
    multiple: true,
  },
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
