import { shallowMount } from '@vue/test-utils';
import LineChart from '../../../../../../../../src/components/history/history-main/dashboards/_internals/charts/line-chart.vue';
import DoughnutChart from '../../../../../../../../src/components/history/history-main/dashboards/_internals/charts/doughnut-chart.vue';
import BarChart from '../../../../../../../../src/components/history/history-main/dashboards/_internals/charts/bar-chart.vue';
import Metric from '../../../../../../../../src/components/history/history-main/dashboards/_internals/charts/metric.vue';

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
