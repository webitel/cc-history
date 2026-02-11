import { shallowMount } from '@vue/test-utils';
import CallsByPeriodDashboardClass from '../CallsByPeriodDashboard/CallsByPeriodDashboard';
import CallsByPeriodDashboard from '../CallsByPeriodDashboard/calls-by-period-dashboard.vue';
import CallsCountDashboardClass from '../CallsCountDashboard/CallsCountDashboard';
import CallsCountDashboard from '../CallsCountDashboard/calls-count-dashboard.vue';
import CallsCountMetricDashboardClass from '../CallsCountMetricDashboard/CallsCountMetricDashboard';
import CallsCountMetricDashboard from '../CallsCountMetricDashboard/calls-count-metric-dashboard.vue';
import CallsCountVariableDashboardClass from '../CallsCountVariableDashboard/CallsCountVariableDashboard';
import CallsCountVariableDashboard from '../CallsCountVariableDashboard/calls-count-variable-dashboard.vue';
import CallsDurationDashboardClass from '../CallsDurationDashboard/CallsDurationDashboard';
import CallsDurationDashboard from '../CallsDurationDashboard/calls-duration-dashboard.vue';
import CallsDurationMetricDashboardClass from '../CallsDurationMetricDashboard/CallsDurationMetricDashboard';
import CallsDurationMetricDashboard from '../CallsDurationMetricDashboard/calls-duration-metric-dashboard.vue';

describe('Dashboard components', () => {
	it('renders CallsByPeriod Dashboard', () => {
		const dashboard = new CallsByPeriodDashboardClass();
		const wrapper = shallowMount(CallsByPeriodDashboard, {
			props: {
				dashboard,
			},
		});
		expect(wrapper.exists()).toBe(true);
	});
	it('renders CallsCount Dashboard', () => {
		const dashboard = new CallsCountDashboardClass();
		const wrapper = shallowMount(CallsCountDashboard, {
			props: {
				dashboard,
			},
		});
		expect(wrapper.exists()).toBe(true);
	});
	it('renders CallsCountMetric Dashboard', () => {
		const dashboard = new CallsCountMetricDashboardClass();
		const wrapper = shallowMount(CallsCountMetricDashboard, {
			props: {
				dashboard,
			},
		});
		expect(wrapper.exists()).toBe(true);
	});
	it('renders CallsCountVariable Dashboard', () => {
		const dashboard = new CallsCountVariableDashboardClass();
		const wrapper = shallowMount(CallsCountVariableDashboard, {
			props: {
				dashboard,
			},
		});
		expect(wrapper.exists()).toBe(true);
	});
	it('renders CallsDuration Dashboard', () => {
		const dashboard = new CallsDurationDashboardClass();
		const wrapper = shallowMount(CallsDurationDashboard, {
			props: {
				dashboard,
			},
		});
		expect(wrapper.exists()).toBe(true);
	});
	it('renders CallsDurationMetric Dashboard', () => {
		const dashboard = new CallsDurationMetricDashboardClass();
		const wrapper = shallowMount(CallsDurationMetricDashboard, {
			props: {
				dashboard,
			},
		});
		expect(wrapper.exists()).toBe(true);
	});
});
