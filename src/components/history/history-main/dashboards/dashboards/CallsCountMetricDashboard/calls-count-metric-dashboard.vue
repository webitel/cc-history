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
    chartData() {
      return {
        true: {
          count: this.data.find((item) => item[this.dashboard.options.param] === true)?.count,
          label: this.$t('mainSection.dashboards.bridged.true'),
        },
        false: {
          count: this.data.find((item) => item[this.dashboard.options.param] === false)?.count,
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
