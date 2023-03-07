import { shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import store from '../../../../../../../../app/store';
import FilterPagination from '../filter-pagination/filter-pagination.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

describe('Registry: Filter components', () => {
  it('renders pagination filter component', () => {
    const wrapper = shallowMount(FilterPagination, {
      global: {
        plugins: [store, router],
      },
    });
    expect(wrapper.findComponent({ name: 'wt-pagination' }).exists()).toBe(true);
  });
});
