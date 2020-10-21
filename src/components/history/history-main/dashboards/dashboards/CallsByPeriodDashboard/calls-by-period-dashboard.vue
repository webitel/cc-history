<template>
  <line-chart
    :chart-data="chartData"
    :options="options"
  ></line-chart>
</template>

<script>
import dashboardMixin from '../../../../../../mixins/dashboards/dashboardMixin';

const colors = ['#FF6384', '#FF9F40', '#FFCD56', '#4BC0C0', '#36A2EB'];
export default {
  name: 'calls-by-period-dashboard',
  mixins: [dashboardMixin],
  data: () => ({
    options: {
      scales: {
        xAxes: [{
          display: true,
        }],
        yAxes: [{
          display: true,
          // ticks: {
          //   min: 0,
          //   max: 30,
          //   stepSize: 6,
          // },
        }],
      },
      legend: {
        labels: { fontFamily: "'Montserrat Medium', 'monospace'" },
      },
    },
  }),
  computed: {
    chartData() {
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
