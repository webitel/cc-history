import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import FilterInterval from '../interval/filter-interval.vue';
import store from '../../../../../../../../app/store';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const router = new VueRouter();

describe('Dashboards: filter components', () => {
  it('renders interval filter component', () => {
    const wrapper = shallowMount(FilterInterval, {
      localVue, store, router,
    });
    expect(wrapper.findComponent({ name: 'abstract-enum-filter' }).exists()).toBe(true);
  });
});
