<template>
  <component
    :is="dashboard.options.visualization"
    :chart-data="chartData"
    :options="options"
  ></component>
</template>

<script>
import dashboardMixin from '../../../../../../mixins/history/dashboards/dashboardMixin';

export default {
  name: 'calls-count-variable-dashboard',
  mixins: [dashboardMixin],
};
</script>

<style lang="scss" scoped>
</style>
