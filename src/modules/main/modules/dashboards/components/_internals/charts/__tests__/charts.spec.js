import { shallowMount } from '@vue/test-utils';
import BarChart
  from '../bar-chart.vue';
import DoughnutChart
  from '../doughnut-chart.vue';
import LineChart
  from '../line-chart.vue';

const chartData = { datasets: [], labels: [] };
describe('Charts', () => {
  it('renders a line chart', () => {
    const wrapper = shallowMount(LineChart, { propsData: { chartData } });
    expect(wrapper.exists()).toBe(true);
  });
  it('renders a doughnut chart', () => {
    const wrapper = shallowMount(DoughnutChart, { propsData: { chartData } });
    expect(wrapper.exists()).toBe(true);
  });
  it('renders a bar chart', () => {
    const wrapper = shallowMount(BarChart, { propsData: { chartData } });
    expect(wrapper.exists()).toBe(true);
  });
});