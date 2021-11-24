import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import dashboards from '../../../../src/store/modules/dashboards/dashboards';
import DashboardsAPIRepository from '../../../../src/api/history/dashboards/DashboardAPIRepository';
import CallsCountDashboard
  from '../../../../src/components/history/history-main/dashboards/dashboards/CallsCountDashboard/CallsCountDashboard';

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock('../../../../src/api/history/dashboards/DashboardAPIRepository');

let newDashboard;
let existingDashboard;
const dashboardsData = [{ someData: 'jest' }];
DashboardsAPIRepository.getDashboardsData
  .mockImplementation(() => Promise.resolve(dashboardsData));
DashboardsAPIRepository.saveDashboards
  .mockImplementation(() => Promise.resolve());
DashboardsAPIRepository.getDashboards
  .mockImplementation(() => Promise.resolve({ layout: '2', snapshots: [] }));

describe('dashboards store actions', () => {
  const context = {
    state: dashboards.state,
    commit: jest.fn(),
    dispatch: jest.fn(),
    rootGetters: {
      'dashboards/filters/GET_FILTER': jest.fn(),
    },
  };
  beforeEach(() => {
   newDashboard = new CallsCountDashboard();
   existingDashboard = new CallsCountDashboard();
   context.state.dashboards = [existingDashboard];
  });
  it('ADD_DASHBOARD commits ADD_DASHBOARD mutation with this dashboard', async () => {
    await dashboards.actions.ADD_DASHBOARD(context, { dashboard: newDashboard });
    expect(context.commit).toHaveBeenCalledWith('ADD_DASHBOARD', { dashboard: newDashboard });
  });

  it('ADD_DASHBOARD dispatches SAVE_DASHBOARDS', async () => {
    await dashboards.actions.ADD_DASHBOARD(context, { dashboard: newDashboard });
    expect(context.dispatch).toHaveBeenCalledWith('SAVE_DASHBOARDS');
  });

  it('ADD_DASHBOARD updates new dashboard id, if there is any dashboards in state', async () => {
    newDashboard.setId = jest.fn();
    await dashboards.actions.ADD_DASHBOARD(context, { dashboard: newDashboard });
    expect(newDashboard.setId).toHaveBeenCalledWith(existingDashboard.id + 1);
  });

  it('LOAD_DATA calls LOAD_DASHBOARDS_DATA', async () => {
    const payload = 'any payload';
    await dashboards.actions.LOAD_DATA(context, payload);
    expect(context.dispatch).toHaveBeenCalledWith('LOAD_DASHBOARDS_DATA', payload);
  });

  it('LOAD_DASHBOARDS_DATA commits SET_DASHBOARDS_DATA, if request data is returned', async () => {
    await dashboards.actions.LOAD_DASHBOARDS_DATA(context);
    expect(context.commit).toHaveBeenCalledWith('SET_DASHBOARDS_DATA', dashboardsData);
  });

  it('LOAD_DASHBOARDS_DATA correctly collects params from filter storage and dashboard aggs', async () => {
    const query = { filter: 'jest' };
    const aggs = { agg: 'jest' };
    context.rootGetters['filters/GET_FILTERS'] = query;
    existingDashboard.getRequestAggregations = jest.fn(() => aggs);
    await dashboards.actions.LOAD_DASHBOARDS_DATA(context);
    expect(DashboardsAPIRepository.getDashboardsData)
      .toHaveBeenCalledWith({ aggs: [aggs], ...query });
  });

  it('DELETE_DASHBOARD commits REMOVE_DASHBOARD', async () => {
    await dashboards.actions.DELETE_DASHBOARD(context, existingDashboard);
    const index = context.state.dashboards.indexOf(existingDashboard);
    expect(context.commit).toHaveBeenCalledWith('REMOVE_DASHBOARD', index);
  });

  it('DELETE_DASHBOARD dispatches SAVE_DASHBOARDS', async () => {
    await dashboards.actions.DELETE_DASHBOARD(context, existingDashboard);
    expect(context.dispatch).toHaveBeenCalledWith('SAVE_DASHBOARDS');
  });

  it('SAVE_DASHBOARDS calls API method to send dashboard snapshots', async () => {
    await dashboards.actions.SAVE_DASHBOARDS(context);
    const dashboardSnapshots = {
      layout: context.state.layout,
      snapshots: [existingDashboard.getSnapshot()],
    };
    expect(DashboardsAPIRepository.saveDashboards).toHaveBeenCalledWith(dashboardSnapshots);
  });

  it('RESTORE_DASHBOARDS calls API method to get dashboard snapshots', async () => {
    await dashboards.actions.RESTORE_DASHBOARDS(context);
    expect(DashboardsAPIRepository.getDashboards).toHaveBeenCalled();
  });

  it('RESTORE_DASHBOARDS commits SET_DASHBOARDS with restored dashboard class objects', async () => {
    const dashboardSnapshots = {
      snapshots: [existingDashboard.getSnapshot()],
    };
    DashboardsAPIRepository.getDashboards
      .mockImplementationOnce(() => Promise.resolve(dashboardSnapshots));
    await dashboards.actions.RESTORE_DASHBOARDS(context);
    // https://github.com/facebook/jest/issues/8475
    expect(JSON.stringify(context.commit.mock.calls.pop()))
      .toEqual(JSON.stringify(['SET_DASHBOARDS', [existingDashboard]]));
  });

  it('CHANGE_LAYOUT dispatches SAVE_DASHBOARDS', async () => {
    await dashboards.actions.CHANGE_LAYOUT(context, '1');
    expect(context.dispatch).toHaveBeenCalledWith('SAVE_DASHBOARDS');
  });

  it('CHANGE_LAYOUT commits SET_LAYOUT', async () => {
    const newLayout = '1';
    await dashboards.actions.CHANGE_LAYOUT(context, newLayout);
    expect(context.commit).toHaveBeenCalledWith('SET_LAYOUT', newLayout);
  });

  it('SET_LAYOUT commits SET_LAYOUT', async () => {
    const newLayout = '1';
    await dashboards.actions.CHANGE_LAYOUT(context, newLayout);
    expect(context.commit).toHaveBeenCalledWith('SET_LAYOUT', newLayout);
  });
});
