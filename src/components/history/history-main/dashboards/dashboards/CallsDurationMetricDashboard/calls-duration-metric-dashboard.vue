<template>
  <metric
    :chart-data="chartData"
  ></metric>
</template>

<script>
import dashboardMixin from '../../../../../../mixins/dashboards/dashboardMixin';

export default {
  name: 'calls-count-metric-dashboard',
  mixins: [dashboardMixin],
  computed: {
    responseValueProp() {
      return this.dashboard.getResponseValueProperty();
    },
    chartData() {
      const trueCount = this.data
        .find((item) => item[this.dashboard.options.param] === true);
      const falseCount = this.data
        .find((item) => item[this.dashboard.options.param] === false);
      return {
        true: {
          count: trueCount ? trueCount[this.responseValueProp] : 0,
          label: this.$t('mainSection.dashboards.bridged.true'),
        },
        false: {
          count: falseCount ? falseCount[this.responseValueProp] : 0,
          label: this.$t('mainSection.dashboards.bridged.false'),
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
