import { shallowMount } from '@vue/test-utils';
import FilterAgent from '../../../../../src/shared/filters/components/filter-agent.vue';
import FilterCause from '../../../../../src/shared/filters/components/filter-cause.vue';
import FilterDirection from '../../../../../src/shared/filters/components/filter-direction.vue';
import FilterDuration from '../../../../../src/shared/filters/components/filter-duration.vue';
import FilterFrom from '../../../../../src/shared/filters/components/filter-from.vue';
import FilterGateway from '../../../../../src/shared/filters/components/filter-gateway.vue';
import FilterInterval from '../../../../../src/shared/filters/components/filter-interval.vue';
import FilterPagination from '../../../../../src/shared/filters/components/filter-pagination.vue';
import FilterQueue from '../../../../../src/shared/filters/components/filter-queue.vue';
import FilterSearch from '../../../../../src/shared/filters/components/filter-search.vue';
import FilterTeam from '../../../../../src/shared/filters/components/filter-team.vue';
import FilterTo from '../../../../../src/shared/filters/components/filter-to.vue';
import FilterType from '../../../../../src/shared/filters/components/filter-type.vue';
import FilterUser from '../../../../../src/shared/filters/components/filter-user.vue';

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

  it('renders interval filter component', () => {
    const wrapper = shallowMount(FilterInterval, { mocks: { $route: { query: {} } } });
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
