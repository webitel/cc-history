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
  computed: {
    chartData() {
      const trueCount = this.data
        .find((item) => item[this.dashboard.options.param] === true) || {};
      const falseCount = this.data
        .find((item) => item[this.dashboard.options.param] === false) || {};
      return {
        true: {
          value: trueCount[this.valueProp],
          label: this.$t('dashboards.bridged.true'),
        },
        false: {
          value: falseCount[this.valueProp],
          label: this.$t('dashboards.bridged.false'),
        },
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
