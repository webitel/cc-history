import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import FilterInterval from '../../../../../../../src/components/history/history-main/dashboards/filters/filter-interval/filter-interval.vue';
import store from '../../../../../../../src/store/index';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const router = new VueRouter();

describe('Dashboards: filter components', () => {
  it('renders interval filter component', () => {
    const wrapper = shallowMount(FilterInterval, {
      localVue, store, router,
    });
    expect(wrapper.findComponent({ name: 'wt-select' }).exists()).toBe(true);
  });
});
