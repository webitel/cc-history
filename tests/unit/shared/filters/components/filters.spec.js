import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import store from '../../../../../src/store/index';
import FilterAgent from '../../../../../src/shared/filters/filter-agent/filter-agent.vue';
import FilterCause from '../../../../../src/shared/filters/filter-cause/filter-cause.vue';
import FilterDirection from '../../../../../src/shared/filters/filter-direction/filter-direction.vue';
import FilterDuration from '../../../../../src/shared/filters/filter-duration/filter-duration.vue';
import FilterFrom from '../../../../../src/shared/filters/filter-from/filter-from.vue';
import FilterGateway from '../../../../../src/shared/filters/filter-gateway/filter-gateway.vue';
import FilterPagination from '../../../../../src/components/history/history-main/registry/filters/filter-pagination/filter-pagination.vue';
import FilterQueue from '../../../../../src/shared/filters/filter-queues/filter-queue.vue';
import FilterSearch from '../../../../../src/shared/filters/filter-search/filter-search.vue';
import FilterTeam from '../../../../../src/shared/filters/filter-teams/filter-team.vue';
import FilterTo from '../../../../../src/shared/filters/filter-to/filter-to.vue';
// import FilterType from '../../../../../src/shared/filters//filter-type.vue';
import FilterUser from '../../../../../src/shared/filters/filter-user/filter-user.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Filter components', () => {
  it('renders agent filter component', () => {
    const wrapper = shallowMount(FilterAgent, {
      localVue, store, mocks: { $route: { query: {} } },
    });
    expect(wrapper.findComponent({ name: 'wt-select' }).element).toBeVisible();
  });
  it('renders cause filter component', () => {
    const wrapper = shallowMount(FilterCause, {
      localVue, store, mocks: { $route: { query: {} } },
    });
    expect(wrapper.findComponent({ name: 'wt-select' }).element).toBeVisible();
  });

  it('renders direction filter component', () => {
    const wrapper = shallowMount(FilterDirection, {
      localVue, store, mocks: { $route: { query: {} } },
    });
    expect(wrapper.findComponent({ name: 'wt-select' }).element).toBeVisible();
  });

  it('renders duration filter component', () => {
    const wrapper = shallowMount(FilterDuration, {
      localVue, store, mocks: { $route: { query: {} } },
    });
    expect(wrapper.classes('filter-duration')).toBe(true);
  });

  it('renders from filter component', () => {
    const wrapper = shallowMount(FilterFrom, {
      localVue, store, mocks: { $route: { query: {} } },
    });
    expect(wrapper.findComponent({ name: 'wt-datetimepicker' }).element).toBeVisible();
  });

  it('renders gateway filter component', () => {
    const wrapper = shallowMount(FilterGateway, {
      localVue, store, mocks: { $route: { query: {} } },
    });
    expect(wrapper.findComponent({ name: 'wt-select' }).element).toBeVisible();
  });

  it('renders pagination filter component', () => {
    const wrapper = shallowMount(FilterPagination, {
      localVue, store, mocks: { $route: { query: {} } },
    });
    expect(wrapper.findComponent({ name: 'wt-pagination' }).element).toBeVisible();
  });

  it('renders queue filter component', () => {
    const wrapper = shallowMount(FilterQueue, {
      localVue, store, mocks: { $route: { query: {} } },
    });
    expect(wrapper.findComponent({ name: 'wt-select' }).element).toBeVisible();
  });

  it('renders search filter component', () => {
    const wrapper = shallowMount(FilterSearch, {
      localVue, store, mocks: { $route: { query: {} } },
    });
    expect(wrapper.findComponent({ name: 'wt-search-bar' }).element).toBeVisible();
  });

  it('renders team filter component', () => {
    const wrapper = shallowMount(FilterTeam, {
      localVue, store, mocks: { $route: { query: {} } },
    });
    expect(wrapper.findComponent({ name: 'wt-select' }).element).toBeVisible();
  });

  it('renders to filter component', () => {
    const wrapper = shallowMount(FilterTo, {
      localVue, store, mocks: { $route: { query: {} } },
    });
    expect(wrapper.findComponent({ name: 'wt-datetimepicker' }).element).toBeVisible();
  });

  // it('renders type filter component', () => {
  //   const wrapper = shallowMount(FilterType, { mocks: { $route: { query: {} } } });
  //   expect(wrapper.findComponent({ name: 'wt-select' }).element).toBeVisible();
  // });

  it('renders user filter component', () => {
    const wrapper = shallowMount(FilterUser, {
      localVue, store, mocks: { $route: { query: {} } },
    });
    expect(wrapper.findComponent({ name: 'wt-select' }).element).toBeVisible();
  });
});
