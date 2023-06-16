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
import dashboardMixin from '../../../mixins/dashboardMixin';
import Dummy from '../../../../../../../app/assets/dummy/hs-dummy-after-search.svg';

export default {
  name: 'calls-count-metric-dashboard',
  mixins: [dashboardMixin],
  data: () => ({
    dummy: Dummy,
  }),
};
</script>

<style lang="scss" scoped>
.metric {
  flex-grow: 1;
}
</style>
