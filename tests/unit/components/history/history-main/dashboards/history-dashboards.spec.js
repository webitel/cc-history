import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import HistoryDashboards from '../../../../../../src/components/history/history-main/dashboards/history-dashboards.vue';
import dashboards from '../../../../../../src/store/modules/dashboards/dashboards';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
const router = new VueRouter();

describe('History main', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: { dashboards },
    });
  });
  it('renders a component', () => {
    const wrapper = shallowMount(HistoryDashboards, { localVue, router, store });
    expect(wrapper.exists()).toBe(true);
  });
});
