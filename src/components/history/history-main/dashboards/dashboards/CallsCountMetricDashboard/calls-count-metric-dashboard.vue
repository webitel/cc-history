<template>
  <metric
    v-if="!emptyData"
    :chart-data="chartData"
  ></metric>
  <empty-dashboard v-else />
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
