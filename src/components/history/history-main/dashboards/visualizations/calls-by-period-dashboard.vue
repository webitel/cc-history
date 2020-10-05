<template>
  <line-chart
    :data="dataData"
    :options="optionsData"
  ></line-chart>
</template>

<script>
import LineChart from './charts/line-chart.vue';

export default {
  name: 'calls-by-period-dashboard',
  components: { LineChart },
  props: {
    dashboard: {
      type: Object,
      required: true,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    dataData: {
      labels: ['Not registered', 'Registered', 'In progress', 'Offline', 'Online'],
      datasets: [
        {
          label: '1',
          borderColor: '#FF6384',
          data: [10, 20, 4, 12, 8].reverse(),
          fill: false,
        },
      ],
    },
    optionsData: {
      scales: {
        xAxes: [{
          display: true,
        }],
        yAxes: [{
          display: true,
          ticks: {
            min: 0,
            max: 30,
            stepSize: 6,
          },
        }],
      },
      legend: {
        labels: { fontFamily: "'Montserrat Medium', 'monospace'" },
      },
    },
  }),
};
</script>

<style lang="scss" scoped>
</style>
