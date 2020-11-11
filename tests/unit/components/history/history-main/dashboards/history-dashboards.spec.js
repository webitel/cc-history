import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import HistoryDashboards from '../../../../../../src/components/history/history-main/dashboards/history-dashboards.vue';
import dashboards from '../../../../../../src/store/modules/dashboards/dashboards';
import CallsCountDashboard from '../../../../../../src/components/history/history-main/dashboards/dashboards/CallsCountDashboard/CallsCountDashboard';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
const router = new VueRouter();

const dashboard = new CallsCountDashboard();
describe('History dashboards', () => {
  let store;
  const actions = {
    ...dashboards.actions,
    ADD_DASHBOARD: jest.fn(),
    DELETE_DASHBOARD: jest.fn(),
    CHANGE_LAYOUT: jest.fn(),
  };

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        dashboards: {
          ...dashboards,
          actions,
        },
      },
    });
  });
  it('renders a component', () => {
    const wrapper = shallowMount(HistoryDashboards, { localVue, router, store });
    expect(wrapper.exists()).toBe(true);
  });

  it('at dashboards header reflow event, calls CHANGE_LAYOUT', async () => {
    const newLayout = '3';
    const wrapper = shallowMount(HistoryDashboards, { localVue, router, store });
    wrapper.findComponent({ name: 'dashboards-header' }).vm.$emit('reflow', newLayout);
    expect(actions.CHANGE_LAYOUT.mock.calls.pop()).toContain(newLayout);
  });

  it('at dashboard config input event, calls ADD_DASHBOARD', async () => {
    const configuredDashboard = dashboard;
    const options = { name: '1' };
    const wrapper = shallowMount(HistoryDashboards, {
      localVue,
      router,
      store,
      data: () => ({ isDashboardConfig: true, configuredDashboard }),
    });
    wrapper.findComponent({ name: 'dashboard-config-popup' })
      .vm.$emit('input', options);
    expect(actions.ADD_DASHBOARD.mock.calls.pop())
      .toContainEqual({ dashboard: configuredDashboard, options });
  });

  it('at dashboard header edit event, sets configuredDashboard', async () => {
    const dashboards = () => [dashboard];
    const openDashboardConfig = jest.fn();
    const wrapper = shallowMount(HistoryDashboards, {
      localVue,
      router,
      store,
      computed: { dashboards },
    });
    wrapper.vm.openDashboardConfig = openDashboardConfig;
    wrapper.findComponent({ name: 'dashboard-header' })
      .vm.$emit('edit', dashboard);
    expect(openDashboardConfig).toHaveBeenCalled();
  });

  it('at dashboard header delete event, calls DELETE_DASHBOARD', async () => {
    const dashboards = () => [dashboard];
    const openDashboardConfig = jest.fn();
    const wrapper = shallowMount(HistoryDashboards, {
      localVue,
      router,
      store,
      computed: { dashboards },
    });
    wrapper.vm.openDashboardConfig = openDashboardConfig;
    wrapper.findComponent({ name: 'dashboard-header' })
      .vm.$emit('delete', dashboard);
    expect(actions.DELETE_DASHBOARD.mock.calls.pop())
      .toContainEqual(dashboard);
  });

  it('at dashboard select input event, sets configuredDashboard', async () => {
    const wrapper = shallowMount(HistoryDashboards, {
      localVue,
      router,
      store,
      data: () => ({ isDashboardSelect: true }),
    });
    wrapper.findComponent({ name: 'dashboard-select-popup' }).vm.$emit('input', dashboard);
    expect(wrapper.vm.configuredDashboard).toEqual(dashboard);
  });
});
