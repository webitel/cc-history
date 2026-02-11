import { shallowMount } from '@vue/test-utils';

import BarChart from '../bar-chart.vue';
import DoughnutChart from '../doughnut-chart.vue';
import LineChart from '../line-chart.vue';

const chartData = {
	datasets: [],
	labels: [],
};
describe('Charts', () => {
	it('renders a line chart', () => {
		const wrapper = shallowMount(LineChart, {
			props: {
				chartData,
			},
		});
		expect(wrapper.exists()).toBe(true);
	});
	it('renders a doughnut chart', () => {
		const wrapper = shallowMount(DoughnutChart, {
			props: {
				chartData,
			},
		});
		expect(wrapper.exists()).toBe(true);
	});
	it('renders a bar chart', () => {
		const wrapper = shallowMount(BarChart, {
			props: {
				chartData,
			},
		});
		expect(wrapper.exists()).toBe(true);
	});
});
