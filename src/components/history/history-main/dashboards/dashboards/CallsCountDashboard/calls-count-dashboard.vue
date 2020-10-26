<template>
  <component
    v-if="!emptyData"
    :is="dashboard.options.visualization"
    :chart-data="chartData"
    :options="options"
  ></component>
  <empty-dashboard v-else />
</template>

<script>
import dashboardMixin from '../../../../../../mixins/history/dashboards/dashboardMixin';

export default {
  name: 'calls-count-dashboard',
  mixins: [dashboardMixin],
};
</script>

<style lang="scss" scoped>
</style>
