import { shallowMount } from '@vue/test-utils';

import { AggregationParams } from '../../../../api/params/DashboardParams.enum';
import Metric from '../metric.vue';

let chartData = {};
const options = { aggregation: null };
describe('Charts: Metric', () => {
  it('renders a metric', () => {
    const wrapper = shallowMount(Metric, { props: { chartData, options } });
    expect(wrapper.exists()).toBe(true);
  });
  it('calculates count aggregation and percents', () => {
    chartData = { true: { value: 10 }, false: { value: 10 } };
    options.aggregation = AggregationParams.COUNT;
    const wrapper = shallowMount(Metric, { props: { chartData, options } });
    const sum = chartData.true.value + chartData.false.value;
    expect(wrapper.vm.aggregation).toBe(sum);
    expect(wrapper.vm.truePercent).toBe(50);
    expect(wrapper.vm.falsePercent).toBe(50);
  });
  it('calculates sum aggregation and percents', () => {
    chartData = { true: { value: 10 }, false: { value: 10 } };
    options.aggregation = AggregationParams.SUM;
    const wrapper = shallowMount(Metric, { props: { chartData, options } });
    const sum = chartData.true.value + chartData.false.value;
    expect(wrapper.vm.aggregation).toBe(sum);
    expect(wrapper.vm.truePercent).toBe(50);
    expect(wrapper.vm.falsePercent).toBe(50);
  });
  it('calculates min aggregation and percents', () => {
    chartData = { true: { value: 10 }, false: { value: 0 } };
    options.aggregation = AggregationParams.MIN;
    const wrapper = shallowMount(Metric, { props: { chartData, options } });
    expect(wrapper.vm.aggregation).toBe(0);
    expect(wrapper.vm.truePercent).toBe('+100');
    expect(wrapper.vm.falsePercent).toBe('+0');
  });
  it('calculates max aggregation and percents', () => {
    chartData = { true: { value: 10 }, false: { value: 0 } };
    options.aggregation = AggregationParams.MAX;
    const wrapper = shallowMount(Metric, { props: { chartData, options } });
    expect(wrapper.vm.aggregation).toBe(10);
    expect(wrapper.vm.truePercent).toBe('+0');
    expect(wrapper.vm.falsePercent).toBe('-100');
  });
  it('calculates avg aggregation and percents', () => {
    chartData = { true: { value: 8 }, false: { value: 2 } };
    options.aggregation = AggregationParams.AVG;
    const wrapper = shallowMount(Metric, { props: { chartData, options } });
    const avg = (chartData.true.value + chartData.false.value) / 2;
    expect(wrapper.vm.aggregation).toBe(avg);
    expect(wrapper.vm.truePercent).toBe('+60');
    expect(wrapper.vm.falsePercent).toBe('-60');
  });
});
