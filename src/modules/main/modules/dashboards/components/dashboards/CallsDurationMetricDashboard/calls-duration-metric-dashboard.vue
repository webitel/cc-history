<template>
  <metric
    v-if="!emptyData"
    :chart-data="chartData"
    :options="options"
  ></metric>
  <empty-dashboard v-else />
</template>

<script>
import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';
import dashboardMixin from '../../../mixins/dashboardMixin';

export default {
  name: 'calls-count-metric-dashboard',
  mixins: [dashboardMixin],
  computed: {
    options() {
      return {
        aggregation: this.dashboard.options.aggregation,
        convertData: convertDuration,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.metric {
  flex-grow: 1;
}
</style>
