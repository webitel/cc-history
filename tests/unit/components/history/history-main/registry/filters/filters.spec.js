import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import store from '../../../../../../../src/store/index';
import FilterPagination from '../../../../../../../src/components/history/history-main/registry/filters/filter-pagination/filter-pagination.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const router = new VueRouter();

describe('Registry: Filter components', () => {
  it('renders pagination filter component', () => {
    const wrapper = shallowMount(FilterPagination, {
      localVue, store, router,
    });
    expect(wrapper.findComponent({ name: 'wt-pagination' }).element).toBeVisible();
  });
});
