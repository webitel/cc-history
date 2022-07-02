import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import store from '../../../../../app/store';
import FilterDuration from '../filter-duration.vue';
import FilterFrom from '../filter-from.vue';
import FilterTo from '../filter-to.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const router = new VueRouter();

describe('Filter components', () => {
  it('renders duration filter component', () => {
    const wrapper = shallowMount(FilterDuration, {
      localVue, store, router,
    });
    expect(wrapper.classes('filter-duration')).toBe(true);
  });

  it('renders from filter component', () => {
    const wrapper = shallowMount(FilterFrom, {
      localVue, store, router,
    });
    expect(wrapper.findComponent({ name: 'wt-datetimepicker' }).exists()).toBe(true);
  });

  it('renders to filter component', () => {
    const wrapper = shallowMount(FilterTo, {
      localVue, store, router,
    });
    expect(wrapper.findComponent({ name: 'wt-datetimepicker' }).exists()).toBe(true);
  });
});
