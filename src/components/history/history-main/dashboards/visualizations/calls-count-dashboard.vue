<template>
  <component
    :is="dashboard.visualization"
    :data="dataData"
    :options="optionsData"
  ></component>
</template>

<script>
import BarChart from './charts/bar-chart.vue';
import DoughnutChart from './charts/doughnut-chart.vue';

export default {
  name: 'calls-count-dashboard',
  components: { BarChart, DoughnutChart },
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
          backgroundColor: ['#FF6384', '#FF9F40', '#FFCD56', '#4BC0C0', '#36A2EB'],
          data: [10, 20, 4, 12, 8].reverse(),
        },
      ],
    },
    optionsData: {
      legend: {
        labels: { fontFamily: "'Montserrat Medium', 'monospace'" },
        position: 'right',
      },
    },
  }),
};
</script>

<style lang="scss" scoped>
</style>
