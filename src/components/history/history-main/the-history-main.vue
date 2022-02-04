<template>
  <section class="history-section history-main">
    <wt-tabs
      :current="currentTab"
      :tabs="tabs"
      @change="changeTab($event.value)"
    ></wt-tabs>
    <component :is="currentTab.value"></component>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import StateModules from '../../../store/modules/StoreModules.enum';
import Registry from './registry/history-registry.vue';
import Dashboards from './dashboards/history-dashboards.vue';

export default {
  name: 'the-history-main',
  components: {
    Registry,
    Dashboards,
  },

  computed: {
    ...mapState({
      state: (state) => state.state,
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
