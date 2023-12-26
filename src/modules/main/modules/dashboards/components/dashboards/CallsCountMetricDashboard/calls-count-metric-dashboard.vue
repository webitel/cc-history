<template>
  <metric
    v-if="!emptyData"
    :chart-data="chartData"
    :options="options"
  ></metric>
  <wt-dummy
    v-else
    :src="dummy"
    :text="$t('dashboards.empty.resultSearch')"
  ></wt-dummy>
</template>

<script>
import dashboardMixin from '../../../mixins/dashboardMixin';
import DummyDark from '../../../../../../../app/assets/dummy/hs-dummy-after-search-dark.svg';
import DummyLight from '../../../../../../../app/assets/dummy/hs-dummy-after-search-light.svg';

export default {
  name: 'calls-count-metric-dashboard',
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
.metric {
  flex-grow: 1;
}
</style>
