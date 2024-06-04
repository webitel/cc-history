import { mount, shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';
import dashboards from '../../store/dashboards';
import CallsCountDashboard
  from '../dashboards/CallsCountDashboard/CallsCountDashboard';
import HistoryDashboards from '../history-dashboards.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

vi.mock('../../../../../../app/api/instance.js', () => ({
  default: {
    get: () => Promise.resolve({ data: { snapshots: [] } }),
  },
}));

const dashboard = new CallsCountDashboard();
describe('History dashboards', () => {
  let store;
  const actions = {
    ...dashboards.actions,
    ADD_DASHBOARD: vi.fn(),
    DELETE_DASHBOARD: vi.fn(),
    CHANGE_LAYOUT: vi.fn(),
  };

  beforeEach(() => {
    store = createStore({
      modules: {
        dashboards: {
          ...dashboards,
          actions,
        },
      },
    });
  });
  it('renders a component', () => {
    const wrapper = shallowMount(HistoryDashboards, {
      global: {
        plugins: [store, router],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('at dashboards header reflow event, calls CHANGE_LAYOUT', async () => {
    const newLayout = '3';
    const wrapper = shallowMount(HistoryDashboards, {
      global: {
        plugins: [store, router],
      },
    });
    wrapper.findComponent({ name: 'dashboards-header' })
    .vm
    .$emit('reflow', newLayout);
    expect(actions.CHANGE_LAYOUT.mock.calls.pop()).toContain(newLayout);
  });

  it('at dashboard config input event, calls ADD_DASHBOARD', async () => {
    const configuredDashboard = dashboard;
    const options = { name: '1' };
    const wrapper = shallowMount(HistoryDashboards, {
      global: {
        plugins: [store, router],
      },
      data: () => ({ isDashboardConfig: true, configuredDashboard }),
    });
    wrapper.findComponent({ name: 'dashboard-config-popup' })
    .vm.$emit('input', options);
    expect(actions.ADD_DASHBOARD.mock.calls.pop())
    .toContainEqual({ dashboard: configuredDashboard, options });
  });

  it('at dashboard header edit event, sets configuredDashboard', async () => {
    const dashboards = () => [dashboard];
    const openDashboardConfig = vi.fn();
    const wrapper = mount(HistoryDashboards, {
      global: {
        plugins: [store, router],
      },
      computed: { ...HistoryDashboards.computed, dashboards },
    });
    wrapper.vm.openDashboardConfig = openDashboardConfig;
    wrapper.findComponent({ name: 'dashboard-header' })
    .vm.$emit('edit', dashboard);
    expect(openDashboardConfig).toHaveBeenCalled();
  });

  it('at dashboard header delete event, calls DELETE_DASHBOARD', async () => {
    const dashboards = () => [dashboard];
    const openDashboardConfig = vi.fn();
    const wrapper = mount(HistoryDashboards, {
      global: {
        plugins: [store, router],
      },
      computed: { ...HistoryDashboards.computed, dashboards },
    });
    wrapper.vm.openDashboardConfig = openDashboardConfig;
    wrapper.findComponent({ name: 'dashboard-header' })
    .vm.$emit('delete', dashboard);
    expect(actions.DELETE_DASHBOARD.mock.calls.pop())
    .toContainEqual(dashboard);
  });

  it('at dashboard select input event, sets configuredDashboard', async () => {
    const wrapper = shallowMount(HistoryDashboards, {
      global: {
        plugins: [store, router],
      },
      data: () => ({ isDashboardSelect: true }),
    });
    wrapper.findComponent({ name: 'dashboard-select-popup' })
    .vm
    .$emit('input', dashboard);
    expect(wrapper.vm.configuredDashboard).toEqual(dashboard);
  });
});
