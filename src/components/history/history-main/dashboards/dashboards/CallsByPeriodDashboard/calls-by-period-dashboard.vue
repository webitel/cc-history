<template>
  <line-chart
    :chart-data="chartData"
    :options="options"
  ></line-chart>
</template>

<script>
import dashboardMixin from '../../../../../../mixins/dashboards/dashboardMixin';

export default {
  name: 'calls-by-period-dashboard',
  mixins: [dashboardMixin],
  computed: {
    options() {
      return {
        scales: {
          xAxes: [{
            display: true,
          }],
          yAxes: [{
            display: true,
            ticks: { callback: (value) => (this.dashboard.isRelative() ? `${value}%` : value) },
          }],
        },
        legend: {
          labels: { fontFamily: "'Montserrat Medium', 'monospace'" },
        },
      };
    },
    chartData() {
      const datasets = this.data.reduce((datasets, value) => {
        const dataset = datasets
          .find((dataset) => dataset.label === value[this.dashboard.options.param]);
        if (dataset) {
          dataset.data.push(value[this.valueProp]);
        } else {
          datasets.push({
            label: value[this.dashboard.options.param],
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
