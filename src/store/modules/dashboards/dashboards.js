import APIRepository from '../../../api/APIRepository';
import router from '../../../router';
import Dashboards from '../../../components/history/history-main/dashboards/dashboards/enums/Dashboards.enum';

const DashboardAPI = APIRepository.dashboards;

const state = {
  dashboards: [],
  dashboardsData: [],
  isLoading: false,
};

const getters = {};

const actions = {
  ADD_DASHBOARD: async (context, { dashboard, options }) => {
    if (context.state.dashboards.indexOf(dashboard) !== -1) {
      context.commit('UPDATE_DASHBOARD', { dashboard, options });
      await context.dispatch('LOAD_DASHBOARDS_DATA');
    } else {
      // eslint-disable-next-line no-param-reassign
      dashboard.id = (context.state.dashboards[context.state.dashboards.length - 1]?.id + 1) || 1;
      context.commit('ADD_DASHBOARD', { dashboard, options });
    }
    await context.dispatch('SAVE_DASHBOARDS');
  },

  LOAD_DASHBOARDS_DATA: async (context) => {
    context.commit('SET_LOADING', true);
    const { query } = router.currentRoute;
    const aggs = context.state.dashboards
      .map((dashboard) => dashboard.getRequestAggregations({ interval: query.interval }));
    const data = await DashboardAPI.getDashboardsData({ aggs, ...query });
    await context.commit('SET_DASHBOARDS_DATA', data);
    context.commit('SET_LOADING', false);
  },

  DELETE_DASHBOARD: async (context, dashboard) => {
    const dashboardIndex = context.state.dashboards.indexOf(dashboard);
    context.commit('REMOVE_DASHBOARD', dashboardIndex);
    await context.dispatch('SAVE_DASHBOARDS');
  },

  SAVE_DASHBOARDS: async (context) => {
    const snapshots = context.state.dashboards.map((dashboard) => dashboard.getSnapshot());
    await DashboardAPI.saveDashboards(snapshots);
  },

  RESTORE_DASHBOARDS: async (context) => {
    const snapshots = await DashboardAPI.getDashboards();
    const dashboards = snapshots.map((snapshot) => {
      const Dashboard = Dashboards.find((Dashboard) => Dashboard.type === snapshot.type);
      return new Dashboard(snapshot);
    });
    context.commit('SET_DASHBOARDS', dashboards);
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
