<template>
  <metric
    :chart-data="chartData"
  ></metric>
</template>

<script>
import dashboardMixin from '../../../../../../mixins/history/dashboards/dashboardMixin';

export default {
  name: 'calls-count-metric-dashboard',
  mixins: [dashboardMixin],
};
</script>

<style lang="scss" scoped>
.metric {
  flex-grow: 1;
}
</style>
