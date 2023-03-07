import { shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import store from '../../../../../../app/store';
import FilterSearch from '../filter-search.vue';

const router = new createRouter({
  history: createWebHistory(),
  routes: [],
});

describe('FilterSearch', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(FilterSearch, {
      global: {
        plugins: [store, router],
      },
      props: {
        namespace: 'filters',
      },
    });
    expect(wrapper.isVisible()).toBe(true);
  });
});
