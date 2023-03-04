import { shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import FilterInterval from '../interval/filter-interval.vue';
import store from '../../../../../../../../app/store';

const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

describe('Dashboards: filter components', () => {
  it('renders interval filter component', () => {
    const wrapper = shallowMount(FilterInterval, {
      global: {
        plugins: [store, router],
      },
    });
    expect(wrapper.findComponent({ name: 'abstract-enum-filter' }).exists()).toBe(true);
  });
});
