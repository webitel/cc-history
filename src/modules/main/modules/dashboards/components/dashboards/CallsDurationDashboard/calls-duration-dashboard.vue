<template>
  <component
    v-if="!emptyData"
    :is="dashboard.options.visualization"
    :chart-data="chartData"
    :options="options"
  ></component>
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
  name: 'calls-duration-dashboard',
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
