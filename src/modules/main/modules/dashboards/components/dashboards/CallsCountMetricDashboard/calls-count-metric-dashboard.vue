<template>
  <metric
    v-if="!emptyData"
    :chart-data="chartData"
    :options="options"
  />
  <wt-dummy
    v-else
    :src="dummy"
    :text="$t('dashboards.empty.resultSearch')"
  />
</template>

<script>
import DummyDark from '../../../../../../../app/assets/dummy/hs-dummy-after-search-dark.svg';
import DummyLight from '../../../../../../../app/assets/dummy/hs-dummy-after-search-light.svg';
import dashboardMixin from '../../../mixins/dashboardMixin';

export default {
  name: 'CallsCountMetricDashboard',
  mixins: [dashboardMixin],
  props: {
    darkMode: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    dummy() {
      return this.darkMode ? DummyDark : DummyLight;
    },
  },
};
</script>

<style lang="scss" scoped>
.metric {
  flex-grow: 1;
}
</style>
