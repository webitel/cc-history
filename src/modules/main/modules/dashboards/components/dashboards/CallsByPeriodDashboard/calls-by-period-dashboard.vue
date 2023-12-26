<template>
  <line-chart
    v-if="!emptyData"
    :chart-data="chartData"
    :options="options"
  ></line-chart>
  <wt-dummy
    v-else
    :src="dummy"
    :text="$t('dashboards.empty.resultSearch')"
  ></wt-dummy>
</template>

<script>
import dashboardMixin from '../../../mixins/dashboardMixin';
import DummyLight from '../../../../../../../app/assets/dummy/hs-dummy-after-search-light.svg';
import DummyDark from '../../../../../../../app/assets/dummy/hs-dummy-after-search-dark.svg';

export default {
  name: 'calls-by-period-dashboard',
  props: {
    darkMode: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [dashboardMixin],
  computed: {
    dummy() {
      return this.darkMode ? DummyDark : DummyLight;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
