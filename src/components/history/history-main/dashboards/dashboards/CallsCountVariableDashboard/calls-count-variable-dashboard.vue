<template>
  <component
    :is="dashboard.options.visualization"
    :chart-data="chartData"
    :options="options"
  ></component>
</template>

<script>
import { snakeToCamel } from '@webitel/ui-sdk/src/scripts/caseConverters';
import Visualizations from '../enums/Visualizations.enum';
import dashboardMixin from '../../../../../../mixins/dashboards/dashboardMixin';

export default {
  name: 'calls-count-variable-dashboard',
  mixins: [dashboardMixin],
  computed: {
    doughnutOptions() {
      return {
        legend: {
          labels: {
            fontFamily: "'Montserrat Medium', 'monospace'",
            generateLabels: (chart) => (
              chart.data.labels.map((label, index) => ({
                text: label.length <= 21 ? label : `${label.slice(0, 18)}...`,
                fillStyle: this.colors[index],
                index,
              }))
            ),
          },
          position: 'right',
        },
      };
    },
    barOptions() {
      return {
        scales: {},
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
        legend: {
          labels: {
            fontFamily: "'Montserrat Medium', 'monospace'",
            generateLabels: (chart) => (
              chart.data.datasets
                .filter((dataset) => dataset.label)
                .map((dataset, index) => ({
                text: dataset.label.length <= 21 ? dataset.label : `${dataset.label.slice(0, 18)}...`,
                fillStyle: dataset.borderColor || dataset.backgroundColor,
                datasetIndex: index,
              }))
            ),
          },
          position: 'right',
        },
      };
    },
    chartData() {
      return this.dashboard.options.visualization === Visualizations.DOUGHNUT_CHART
        ? this.doughnutChartData() : this.barChartData();
    },
    options() {
      return this.dashboard.options.visualization === Visualizations.DOUGHNUT_CHART
        ? this.doughnutOptions : this.barOptions;
    },
    dataLabel() {
      return `${this.dashboard.options.param}.${snakeToCamel(this.dashboard.options.variable)}`;
    },
  },
  methods: {
    doughnutChartData() {
      const datasets = [{
        backgroundColor: this.colors,
        data: this.data.map((item) => item[this.valueProp]),
      }];
      return {
        labels: this.data.map((item) => item[this.dataLabel]),
        datasets,
      };
    },
    barChartData() {
      const datasets = this.data.reduce((datasets, value) => {
        const dataset = datasets
          .find((dataset) => dataset.label === value[this.dataLabel]);
        if (dataset) {
          dataset.data.push(value[this.valueProp]);
        } else {
          datasets.push({
            label: value[this.dataLabel],
            borderColor: this.colors[datasets.length],
            backgroundColor: this.colors[datasets.length],
            data: [value[this.valueProp]],
          });
        }
        return datasets;
      }, []);
      return {
        labels: [...new Set(this.data.map((item) => this.prettifyDate(item.createdAt)))],
        datasets,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
