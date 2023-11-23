import APIRepository from '../../../../../app/api/APIRepository';
import Dashboards
  from '../components/dashboards/enums/Dashboards.enum';
import filters from '../modules/filters/store/filters';

const DashboardAPI = APIRepository.dashboards;

const state = {
  dashboards: [],
  dashboardsData: [],
  layout: '2',
  isLoading: false,
};

const getters = {
};

const actions = {
  ADD_DASHBOARD: async (context, { dashboard, options }) => {
    if (context.state.dashboards.indexOf(dashboard) !== -1) {
      context.commit('UPDATE_DASHBOARD', { dashboard, options });
      await context.dispatch('LOAD_DASHBOARDS_DATA');
    } else {
      const newId = (context.state.dashboards[context.state.dashboards.length - 1]?.id + 1) || 1;
      dashboard.setId(newId);
      context.commit('ADD_DASHBOARD', { dashboard, options });
    }
    await context.dispatch('SAVE_DASHBOARDS');
  },

  LOAD_DATA: async (context, payload) => context.dispatch('LOAD_DASHBOARDS_DATA', payload),

  LOAD_DASHBOARDS_DATA: async (context) => {
    if (!context.state.dashboards.length) return;
    context.commit('SET_LOADING', true);
    try {
      const query = context.rootGetters['filters/GET_FILTERS'];
      const interval = context.rootGetters['dashboards/filters/GET_FILTER']('interval');
      const aggs = context.state.dashboards
        .map((dashboard) => dashboard.getRequestAggregations({ interval }));
      const data = await DashboardAPI.getDashboardsData({ aggs, ...query });
      await context.commit('SET_DASHBOARDS_DATA', data);
    } catch (err) {
      await context.commit('SET_DASHBOARDS_DATA', []);
      throw err;
    } finally {
      context.commit('SET_LOADING', false);
    }
  },

  DELETE_DASHBOARD: async (context, dashboard) => {
    const dashboardIndex = context.state.dashboards.indexOf(dashboard);
    if (dashboardIndex !== -1) {
      context.commit('REMOVE_DASHBOARD', dashboardIndex);
      await context.dispatch('SAVE_DASHBOARDS');
    }
  },

  SAVE_DASHBOARDS: async (context) => {
    const snapshots = context.state.dashboards.map((dashboard) => dashboard.getSnapshot());
    const dashboards = { layout: context.state.layout, snapshots };
    await DashboardAPI.saveDashboards(dashboards);
  },

  RESTORE_DASHBOARDS: async (context) => {
    const { snapshots, layout } = await DashboardAPI.getDashboards();
    const dashboards = snapshots.map((snapshot) => {
      const Dashboard = Dashboards.find((Dashboard) => Dashboard.type === snapshot.type);
      return new Dashboard(snapshot);
    });
    context.commit('SET_DASHBOARDS', dashboards);
    if (layout) context.commit('SET_LAYOUT', layout);
  },
  CHANGE_LAYOUT: (context, layout) => {
    context.commit('SET_LAYOUT', layout);
    context.dispatch('SAVE_DASHBOARDS');
  },
  SET_LAYOUT: (context, layout) => {
    context.commit('SET_LAYOUT', layout);
  },
};

const mutations = {
  ADD_DASHBOARD: (state, { dashboard, options }) => {
    dashboard.setOptions(options);
    state.dashboards.push(dashboard);
  },
  UPDATE_DASHBOARD: (state, { dashboard, options }) => {
    dashboard.setOptions(options);
  },
  SET_DASHBOARDS: (state, dashboards) => {
    state.dashboards = dashboards;
  },
  SET_DASHBOARDS_DATA: (state, data) => {
    state.dashboardsData = data;
  },
  REMOVE_DASHBOARD: (state, dashboardIndex) => {
    state.dashboards.splice(dashboardIndex, 1);
  },
  SET_LOADING: (state, isLoading) => {
    state.isLoading = isLoading;
  },
  SET_LAYOUT: (state, layout) => {
    state.layout = layout;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: { filters },
};
