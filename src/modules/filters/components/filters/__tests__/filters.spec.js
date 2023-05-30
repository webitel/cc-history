import { shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import store from '../../../../../app/store';
import FilterFrom from '../filter-from.vue';
import FilterTo from '../filter-to.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

describe('Filter components', () => {
  it('renders from filter component', () => {
    const wrapper = shallowMount(FilterFrom, {
      global: { plugins: [router, store] },
    });
    expect(wrapper.findComponent({ name: 'wt-datepicker' }).exists()).toBe(true);
  });

  it('renders to filter component', () => {
    const wrapper = shallowMount(FilterTo, {
      global: { plugins: [router, store] },
    });
    expect(wrapper.findComponent({ name: 'wt-datepicker' }).exists()).toBe(true);
  });
});
