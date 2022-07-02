import { shallowMount } from '@vue/test-utils';
import CallsByPeriodDashboard from '../CallsByPeriodDashboard/calls-by-period-dashboard.vue';
import CallsByPeriodDashboardClass from '../CallsByPeriodDashboard/CallsByPeriodDashboard';
import CallsCountDashboard from '../CallsCountDashboard/calls-count-dashboard.vue';
import CallsCountDashboardClass from '../CallsCountDashboard/CallsCountDashboard';
import CallsCountMetricDashboard from '../CallsCountMetricDashboard/calls-count-metric-dashboard.vue';
import CallsCountMetricDashboardClass from '../CallsCountMetricDashboard/CallsCountMetricDashboard';
import CallsCountVariableDashboard from '../CallsCountVariableDashboard/calls-count-variable-dashboard.vue';
import CallsCountVariableDashboardClass from '../CallsCountVariableDashboard/CallsCountVariableDashboard';
import CallsDurationDashboard from '../CallsDurationDashboard/calls-duration-dashboard.vue';
import CallsDurationDashboardClass from '../CallsDurationDashboard/CallsDurationDashboard';
import CallsDurationMetricDashboard from '../CallsDurationMetricDashboard/calls-duration-metric-dashboard.vue';
import CallsDurationMetricDashboardClass from '../CallsDurationMetricDashboard/CallsDurationMetricDashboard';

describe('Dashboard components', () => {
  it('renders CallsByPeriod Dashboard', () => {
    const dashboard = new CallsByPeriodDashboardClass();
    const wrapper = shallowMount(CallsByPeriodDashboard, { propsData: { dashboard } });
    expect(wrapper.exists()).toBe(true);
  });
  it('renders CallsCount Dashboard', () => {
    const dashboard = new CallsCountDashboardClass();
    const wrapper = shallowMount(CallsCountDashboard, { propsData: { dashboard } });
    expect(wrapper.exists()).toBe(true);
  });
  it('renders CallsCountMetric Dashboard', () => {
    const dashboard = new CallsCountMetricDashboardClass();
    const wrapper = shallowMount(CallsCountMetricDashboard, { propsData: { dashboard } });
    expect(wrapper.exists()).toBe(true);
  });
  it('renders CallsCountVariable Dashboard', () => {
    const dashboard = new CallsCountVariableDashboardClass();
    const wrapper = shallowMount(CallsCountVariableDashboard, { propsData: { dashboard } });
    expect(wrapper.exists()).toBe(true);
  });
  it('renders CallsDuration Dashboard', () => {
    const dashboard = new CallsDurationDashboardClass();
    const wrapper = shallowMount(CallsDurationDashboard, { propsData: { dashboard } });
    expect(wrapper.exists()).toBe(true);
  });
  it('renders CallsDurationMetric Dashboard', () => {
    const dashboard = new CallsDurationMetricDashboardClass();
    const wrapper = shallowMount(CallsDurationMetricDashboard, { propsData: { dashboard } });
    expect(wrapper.exists()).toBe(true);
  });
});
