<template>
  <line-chart
    :chart-data="chartData"
    :options="options"
  ></line-chart>
</template>

<script>
import dashboardMixin from '../../../../../../mixins/history/dashboards/dashboardMixin';

export default {
  name: 'calls-by-period-dashboard',
  mixins: [dashboardMixin],
};
</script>

<style lang="scss" scoped>
</style>
