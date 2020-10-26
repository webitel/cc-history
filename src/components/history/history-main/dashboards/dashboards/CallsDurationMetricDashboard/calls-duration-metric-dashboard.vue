<template>
  <metric
    :chart-data="chartData"
    :options="options"
  ></metric>
</template>

<script>
import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';
import dashboardMixin from '../../../../../../mixins/history/dashboards/dashboardMixin';

export default {
  name: 'calls-count-metric-dashboard',
  mixins: [dashboardMixin],
  computed: {
    options() {
      return {
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
