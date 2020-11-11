import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import FilterInterval from '../../../../../../../src/components/history/history-main/dashboards/filters/filter-interval/filter-interval.vue';
import store from '../../../../../../../src/store/index';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Dashboards: filter components', () => {
  it('renders interval filter component', () => {
    const wrapper = shallowMount(FilterInterval, {
      localVue, store, mocks: { $route: { query: {} } },
    });
    expect(wrapper.findComponent({ name: 'wt-select' }).element).toBeVisible();
  });
});
