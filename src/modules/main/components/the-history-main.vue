<template>
  <section class="history-section history-main">

<!--   https://webitel.atlassian.net/browse/WTEL-4709-->
<!--   dashboard does not work correctly, so the tabs had to be hidden -->

<!--    <wt-tabs-->
<!--      :current="currentTab"-->
<!--      :tabs="tabs"-->
<!--      @change="changeTab($event.value)"-->
<!--    />-->
    <component :is="currentTab.value" />
  </section>
</template>

<script>
import { mapState } from 'vuex';
//import StateModules from '../enums/StoreModules.enum';
import Registry from '../modules/registry/components/history-registry.vue';
// import Dashboards from '../modules/dashboards/components/history-dashboards.vue';

export default {
  name: 'TheHistoryMain',
  components: {
    Registry,
   // Dashboards,
  },
  computed: {
    ...mapState({
      state: (state) => state.state,
    }),
    currentTab() {
      return { value: this.state };
    },
    // tabs() {
    //   return Object.values(StateModules).map((state) => ({
    //     text: this.$t(`${state}.${state}`),
    //     value: state,
    //   }));
    // },
  },
  methods: {
    // ...mapActions({
    //   changeTab: 'SET_APP_STATE',
    // }),
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
