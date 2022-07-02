import { shallowMount } from '@vue/test-utils';
import dashboardDataMixin
  from '../dashboardDataMixin';

describe('Dashboard data mixin', () => {
  let wrapper;
  beforeEach(() => {
    const Component = {
      render() {
      },
      mixins: [dashboardDataMixin],
      data: () => ({
        colors: ['1', '2'],
      }),
    };
    wrapper = shallowMount(Component, {
      data: () => ({ dashboard: null }),
      mocks: { $route: { query: { interval: 'auto' } } },
    });
  });

  it('renders a component with mixin', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Line data', () => {
    const dataSource = {
      datasets: new Map([['inbound', { data: [10] }], ['outbound', { data: [5] }]]),
      dates: new Map([['01.07', 15]]),
    };
    wrapper.vm.normalizeData = () => dataSource;
    const data = {
      datasets: [{
        backgroundColor: '1',
        borderColor: '1',
        data: [10],
        label: 'inbound',
      }, {
        backgroundColor: '2',
        borderColor: '2',
        data: [5],
        label: 'outbound',
      }],
      labels: [],
    };
    const lineData = wrapper.vm.lineData();
    expect(lineData.datasets).toEqual(data.datasets);
  });
  it('Doughnut data', () => {
    const dataSource = {
      datasets: new Map([['inbound', { data: [10] }], ['outbound', { data: [5] }]]),
      dates: new Map([['01.07', 15]]),
    };
    wrapper.vm.normalizeData = () => dataSource;
    const data = {
      datasets: [{ backgroundColor: ['1', '2'], data: [10, 5] }],
      labels: ['inbound', 'outbound'],
    };
    const doughnutData = wrapper.vm.doughnutData();
    expect(doughnutData).toEqual(data);
  });
  it('Bar data', () => {
    const dataSource = {
      datasets: new Map([['inbound', { data: [10] }], ['outbound', { data: [5] }]]),
      dates: new Map([['01.07', 15]]),
    };
    wrapper.vm.normalizeData = () => dataSource;
    const data = {
      datasets: [{
        backgroundColor: '1',
        borderColor: '1',
        data: [10],
        label: 'inbound',
      }, {
        backgroundColor: '2',
        borderColor: '2',
        data: [5],
        label: 'outbound',
      }],
      labels: [],
    };
    const barData = wrapper.vm.barData();
    expect(barData.datasets).toEqual(data.datasets);
  });
  it('Metric data', () => {
    const dataSource = {
      datasets: new Map([[true, { data: [10] }], [false, { data: [5] }]]),
    };
    wrapper.vm.normalizeData = () => dataSource;
    const data = {
      true: { value: 10 },
      false: { value: 5 },
    };
    const metricData = wrapper.vm.metricData();
    expect(metricData.true.value).toBe(data.true.value);
    expect(metricData.false.value).toBe(data.false.value);
  });
});
