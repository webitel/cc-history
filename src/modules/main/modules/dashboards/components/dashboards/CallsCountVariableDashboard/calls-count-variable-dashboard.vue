<template>
  <component
    v-if="!emptyData"
    :is="dashboard.options.visualization"
    :chart-data="chartData"
    :options="options"
  ></component>
  <wt-dummy
    v-else
    :src="dummy"
    :text="$t('dashboards.empty.resultSearch')"
  ></wt-dummy>
</template>

<script>
import dashboardMixin from '../../../mixins/dashboardMixin';
import Dummy from '../../../../../../../app/assets/dummy/hs-dummy-after-search.svg';

export default {
  name: 'calls-count-variable-dashboard',
  mixins: [dashboardMixin],
  data: () => ({
    dummy: Dummy,
  }),
};
</script>

<style lang="scss" scoped>
</style>
