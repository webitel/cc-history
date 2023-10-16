<template>
  <header class="dashboards-header">
    <wt-icon-btn
      :color="layout === '1' ? 'active': 'default'"
      icon-prefix="hs"
      icon="dashboard-grid-1"
      @click="$emit('reflow', '1')"
    ></wt-icon-btn>
    <wt-icon-btn
      :color="layout === '2' ? 'active': 'default'"
      icon-prefix="hs"
      icon="dashboard-grid-2"
      @click="$emit('reflow', '2')"
    ></wt-icon-btn>
    <wt-icon-btn
      :color="layout === '3' ? 'active': 'default'"
      icon-prefix="hs"
      icon="dashboard-grid-3"
      @click="$emit('reflow', '3')"
    ></wt-icon-btn>
    <filter-interval class="dashboards-header__filter"/>
  </header>
</template>

<script>
import FilterInterval from '../../../modules/filters/components/interval/filter-interval.vue';

export default {
  name: 'dashboards-header',
  components: { FilterInterval },
  props: {
    layout: {
      type: String,
    },
  },
  model: {
    prop: 'layout',
    event: 'reflow',
  },
};
</script>

<style lang="scss" scoped>
.dashboards-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  //margin-top: 20px;
}

.dashboards-header__filter.wt-select {
  width: 300px;
  margin-left: auto;
}

.wt-icon-btn {
  margin-right: 20px;
}
</style>
