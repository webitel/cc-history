import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import store from '../../../../../src/store/index';
import FilterDuration from '../../../../../src/shared/filters/components/filter-duration.vue';
import FilterFrom from '../../../../../src/shared/filters/components/filter-from.vue';
import FilterTo from '../../../../../src/shared/filters/components/filter-to.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const router = new VueRouter();

describe('Filter components', () => {
  it('renders agent filter component', () => {
    const wrapper = shallowMount(FilterAgent, {
      localVue, store, router,
    });
    console.info(wrapper.findComponent({ name: 'wt-select' }).element);
    expect(wrapper.findComponent({ name: 'wt-select' }).exists()).toBe(true);
  });
  it('renders cause filter component', () => {
    const wrapper = shallowMount(FilterCause, {
      localVue, store, router,
    });
    expect(wrapper.findComponent({ name: 'wt-select' }).exists()).toBe(true);
  });

  it('renders direction filter component', () => {
    const wrapper = shallowMount(FilterDirection, {
      localVue, store, router,
    });
    expect(wrapper.findComponent({ name: 'wt-select' }).exists()).toBe(true);
  });

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

  it('renders gateway filter component', () => {
    const wrapper = shallowMount(FilterGateway, {
      localVue, store, router,
    });
    expect(wrapper.findComponent({ name: 'wt-select' }).exists()).toBe(true);
  });

  it('renders queue filter component', () => {
    const wrapper = shallowMount(FilterQueue, {
      localVue, store, router,
    });
    expect(wrapper.findComponent({ name: 'wt-select' }).exists()).toBe(true);
  });

  it('renders search filter component', () => {
    const wrapper = shallowMount(FilterSearch, {
      localVue, store, router,
    });
    expect(wrapper.findComponent({ name: 'wt-search-bar' }).exists()).toBe(true);
  });

  it('renders tags filter component', () => {
    const wrapper = shallowMount(FilterTags, {
      localVue, store, router,
    });
    expect(wrapper.findComponent({ name: 'wt-select' }).exists()).toBe(true);
  });

  it('renders team filter component', () => {
    const wrapper = shallowMount(FilterTeam, {
      localVue, store, router,
    });
    expect(wrapper.findComponent({ name: 'wt-select' }).exists()).toBe(true);
  });

  it('renders to filter component', () => {
    const wrapper = shallowMount(FilterTo, {
      localVue, store, router,
    });
    expect(wrapper.findComponent({ name: 'wt-datetimepicker' }).exists()).toBe(true);
  });

  it('renders user filter component', () => {
    const wrapper = shallowMount(FilterUser, {
      localVue, store, router,
    });
    expect(wrapper.findComponent({ name: 'wt-select' }).exists()).toBe(true);
  });
});
