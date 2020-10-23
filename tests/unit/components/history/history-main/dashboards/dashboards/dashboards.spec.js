import { shallowMount } from '@vue/test-utils';
import CallsByPeriodDashboard from '../../../../../../../src/components/history/history-main/dashboards/dashboards/CallsByPeriodDashboard/calls-by-period-dashboard.vue';
import CallsByPeriodDashboardClass from '../../../../../../../src/components/history/history-main/dashboards/dashboards/CallsByPeriodDashboard/CallsByPeriodDashboard';
import CallsCountDashboard from '../../../../../../../src/components/history/history-main/dashboards/dashboards/CallsCountDashboard/calls-count-dashboard.vue';
import CallsCountDashboardClass from '../../../../../../../src/components/history/history-main/dashboards/dashboards/CallsCountDashboard/CallsCountDashboard';
import CallsCountMetricDashboard from '../../../../../../../src/components/history/history-main/dashboards/dashboards/CallsCountMetricDashboard/calls-count-metric-dashboard.vue';
import CallsCountMetricDashboardClass from '../../../../../../../src/components/history/history-main/dashboards/dashboards/CallsCountMetricDashboard/CallsCountMetricDashboard';
import CallsCountVariableDashboard from '../../../../../../../src/components/history/history-main/dashboards/dashboards/CallsCountVariableDashboard/calls-count-variable-dashboard.vue';
import CallsCountVariableDashboardClass from '../../../../../../../src/components/history/history-main/dashboards/dashboards/CallsCountVariableDashboard/CallsCountVariableDashboard';
import CallsDurationDashboard from '../../../../../../../src/components/history/history-main/dashboards/dashboards/CallsDurationDashboard/calls-duration-dashboard.vue';
import CallsDurationDashboardClass from '../../../../../../../src/components/history/history-main/dashboards/dashboards/CallsDurationDashboard/CallsDurationDashboard';
import CallsDurationMetricDashboard from '../../../../../../../src/components/history/history-main/dashboards/dashboards/CallsDurationMetricDashboard/calls-duration-metric-dashboard.vue';
import CallsDurationMetricDashboardClass from '../../../../../../../src/components/history/history-main/dashboards/dashboards/CallsDurationMetricDashboard/CallsDurationMetricDashboard';

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
