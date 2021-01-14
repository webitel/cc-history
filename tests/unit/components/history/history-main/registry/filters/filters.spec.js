import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import store from '../../../../../../../src/store/index';
import FilterPagination from '../../../../../../../src/components/history/history-main/registry/filters/filter-pagination/filter-pagination.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Registry: Filter components', () => {
  it('renders pagination filter component', () => {
    const wrapper = shallowMount(FilterPagination, {
      localVue, store, mocks: { $route: { query: {} } },
    });
    expect(wrapper.findComponent({ name: 'wt-pagination' }).element).toBeVisible();
  });
});
