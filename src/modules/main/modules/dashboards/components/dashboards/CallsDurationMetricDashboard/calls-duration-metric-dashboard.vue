<template>
  <metric
    v-if="!emptyData"
    :chart-data="chartData"
    :options="options"
  ></metric>
  <wt-dummy
    v-else
    :src="dummy"
    :locale="$t('dashboards.empty.resultSearch')"
  ></wt-dummy>
</template>

<script>
import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';
import dashboardMixin from '../../../mixins/dashboardMixin';
import Dummy from '../../../../../../../app/assets/dummy/hs-dummy-after-search.svg';

export default {
  name: 'calls-count-metric-dashboard',
  mixins: [dashboardMixin],
  data: () => ({
    dummy: Dummy,
  }),
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
