import { shallowMount } from '@vue/test-utils';
import FilterAgent from '@/shared/filters/filter-agent/filter-agent.vue';
import FilterCause from '@/shared/filters/filter-cause/filter-cause.vue';
import FilterDirection from '@/shared/filters/filter-direction/filter-direction.vue';
import FilterDuration from '@/shared/filters/filter-duration/filter-duration.vue';
import FilterFrom from '@/shared/filters/filter-from/filter-from.vue';
import FilterGateway from '@/shared/filters/filter-gateway/filter-gateway.vue';
import FilterPagination from '@/components/history/history-main/registry/filters/filter-pagination/filter-pagination.vue';
import FilterQueue from '@/shared/filters/filter-queues/filter-queue.vue';
import FilterSearch from '@/shared/filters/filter-search/filter-search.vue';
import FilterTeam from '@/shared/filters/filter-teams/filter-team.vue';
import FilterTo from '@/shared/filters/filter-to/filter-to.vue';
import FilterType from '../../../../../src/shared/filters/components/filter-type.vue';
import FilterUser from '@/shared/filters/filter-user/filter-user.vue';

describe('Filter components', () => {
  it('renders agent filter component', () => {
    const wrapper = shallowMount(FilterAgent, { mocks: { $route: { query: {} } } });
    expect(wrapper.findComponent({ name: 'wt-select' }).element).toBeVisible();
  });
  it('renders cause filter component', () => {
    const wrapper = shallowMount(FilterCause, { mocks: { $route: { query: {} } } });
    expect(wrapper.findComponent({ name: 'wt-select' }).element).toBeVisible();
  });

  it('renders direction filter component', () => {
    const wrapper = shallowMount(FilterDirection, { mocks: { $route: { query: {} } } });
    expect(wrapper.findComponent({ name: 'wt-select' }).element).toBeVisible();
  });

  it('renders duration filter component', () => {
    const wrapper = shallowMount(FilterDuration, { mocks: { $route: { query: {} } } });
    expect(wrapper.classes('filter-duration')).toBe(true);
  });

  it('renders from filter component', () => {
    const wrapper = shallowMount(FilterFrom, { mocks: { $route: { query: {} } } });
    expect(wrapper.findComponent({ name: 'wt-datetimepicker' }).element).toBeVisible();
  });

  it('renders gateway filter component', () => {
    const wrapper = shallowMount(FilterGateway, { mocks: { $route: { query: {} } } });
    expect(wrapper.findComponent({ name: 'wt-select' }).element).toBeVisible();
  });

  it('renders pagination filter component', () => {
    const wrapper = shallowMount(FilterPagination, { mocks: { $route: { query: {} } } });
    expect(wrapper.findComponent({ name: 'wt-pagination' }).element).toBeVisible();
  });

  it('renders queue filter component', () => {
    const wrapper = shallowMount(FilterQueue, { mocks: { $route: { query: {} } } });
    expect(wrapper.findComponent({ name: 'wt-select' }).element).toBeVisible();
  });

  it('renders search filter component', () => {
    const wrapper = shallowMount(FilterSearch, { mocks: { $route: { query: {} } } });
    expect(wrapper.findComponent({ name: 'wt-search-bar' }).element).toBeVisible();
  });

  it('renders team filter component', () => {
    const wrapper = shallowMount(FilterTeam, { mocks: { $route: { query: {} } } });
    expect(wrapper.findComponent({ name: 'wt-select' }).element).toBeVisible();
  });

  it('renders to filter component', () => {
    const wrapper = shallowMount(FilterTo, { mocks: { $route: { query: {} } } });
    expect(wrapper.findComponent({ name: 'wt-datetimepicker' }).element).toBeVisible();
  });

  it('renders type filter component', () => {
    const wrapper = shallowMount(FilterType, { mocks: { $route: { query: {} } } });
    expect(wrapper.findComponent({ name: 'wt-select' }).element).toBeVisible();
  });

  it('renders user filter component', () => {
    const wrapper = shallowMount(FilterUser, { mocks: { $route: { query: {} } } });
    expect(wrapper.findComponent({ name: 'wt-select' }).element).toBeVisible();
  });
});
