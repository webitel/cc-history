<template>
  <component
    :is="dashboard.options.visualization"
    :chart-data="chartData"
    :options="options"
  ></component>
</template>

<script>
import Visualizations from '../enums/Visualizations.enum';
import dashboardMixin from '../../../../../../mixins/dashboards/dashboardMixin';

const colors = ['#FF6384', '#FF9F40', '#FFCD56', '#4BC0C0', '#36A2EB'];
export default {
  name: 'calls-count-dashboard',
  mixins: [dashboardMixin],
  data: () => ({
    doughnutOptions: {
      legend: {
        labels: { fontFamily: "'Montserrat Medium', 'monospace'" },
        position: 'right',
      },
    },
    barOptions: {
      scales: {
        xAxes: [{
          stacked: true,
          gridLines: {
            display: false,
          },
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        }],
      },
      legend: {
        labels: { fontFamily: "'Montserrat Medium', 'monospace'" },
        position: 'right',
      },
    },
  }),
  computed: {
    chartData() {
      return this.dashboard.options.visualization === Visualizations.DOUGHNUT_CHART
        ? this.doughnutChartData() : this.barChartData();
    },
    options() {
      return this.dashboard.options.visualization === Visualizations.DOUGHNUT_CHART
      ? this.doughnutOptions : this.barOptions;
    },
  },
  methods: {
    doughnutChartData() {
      const datasets = [{
        backgroundColor: colors,
        data: this.data.map((item) => item.count),
      }];
      return {
        labels: this.data.map((item) => item[this.dashboard.options.param]),
        datasets,
      };
    },
    barChartData() {
      const datasets = this.data.reduce((datasets, value) => {
        const dataset = datasets
          .find((dataset) => dataset.label === value[this.dashboard.options.param]);
        if (dataset) {
          dataset.data.push(value.count);
        } else {
          datasets.push({
            label: value[this.dashboard.options.param],
            borderColor: colors[datasets.length + 1],
            backgroundColor: colors[datasets.length + 1],
            data: [value.count],
          });
        }
        return datasets;
      }, []);
      return {
        labels: [...new Set(this.data.map((item) => item.createdAt))],
        datasets,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
