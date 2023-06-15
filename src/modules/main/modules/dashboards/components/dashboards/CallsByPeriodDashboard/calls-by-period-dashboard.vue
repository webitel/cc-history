<template>
  <line-chart
    v-if="!emptyData"
    :chart-data="chartData"
    :options="options"
  ></line-chart>
  <wt-dummy
    v-else
    :src="dummySrc"
    :locale="$t('dashboards.empty.description')"
  ></wt-dummy>
</template>

<script>
import dashboardMixin from '../../../mixins/dashboardMixin';
import Dummy from '../../../../../../../app/assets/dummy/hs-dummy-after-search.svg';

export default {
  name: 'calls-by-period-dashboard',
  mixins: [dashboardMixin],
  computed: {
    dummySrc() {
      return Dummy;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
