<template>
  <section class="history-section history-main">
    <wt-tabs
      v-if="!isHiddenTabs"
      :current="currentTab"
      :tabs="tabs"
      @change="changeTab($event.value)"
    ></wt-tabs>
    <component :is="currentTab.value"></component>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import StateModules from '../enums/StoreModules.enum';
import Registry from '../modules/registry/components/history-registry.vue';
import Dashboards from '../modules/dashboards/components/history-dashboards.vue';

export default {
  name: 'the-history-main',
  components: {
    Registry,
    Dashboards,
  },
  data: () => ({
    isHiddenTabs: false,
  }),
  computed: {
    ...mapState({
      state: (state) => state.state,
    }),
    ...mapState('registry', {
      dataList: (state) => state.dataList,
    }),
    currentTab() {
      return { value: this.state };
    },
    tabs() {
      return Object.values(StateModules).map((state) => ({
        text: this.$t(`${state}.${state}`),
        value: state,
      }));
    },
  },
  methods: {
    ...mapActions({
      changeTab: 'SET_APP_STATE',
    }),
  },
  watch: {
    dataList: {
      handler() {
        this.isHiddenTabs = this.dataList.length ? false : true;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.history-main {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}
</style>
