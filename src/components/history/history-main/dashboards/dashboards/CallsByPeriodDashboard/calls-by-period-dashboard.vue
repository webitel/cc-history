<template>
  <line-chart
    v-if="!emptyData"
    :chart-data="chartData"
    :options="options"
  ></line-chart>
  <empty-dashboard v-else />
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
