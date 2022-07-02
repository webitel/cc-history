import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import store from '../../../../../../../../app/store';
import FilterPagination from '../filter-pagination/filter-pagination.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const router = new VueRouter();

describe('Registry: Filter components', () => {
  it('renders pagination filter component', () => {
    const wrapper = shallowMount(FilterPagination, {
      localVue, store, router,
    });
    expect(wrapper.findComponent({ name: 'wt-pagination' }).exists()).toBe(true);
  });
});
