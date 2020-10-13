<template>
  <section class="history-section history-main">
    <wt-tabs v-model="currentTab" :tabs="tabs"></wt-tabs>
    <wt-loader v-show="isLoading"/>
    <component
      class="content-wrapper"
      v-show="!isLoading"
      :is="currentTab.value"
    ></component>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import HistoryTable from './history/history-table.vue';
import HistoryDashboards from './dashboards/history-dashboards.vue';

export default {
  name: 'the-history-main',
  components: {
    HistoryTable,
    HistoryDashboards,
  },
  data: () => ({
    currentTab: { value: 'history-dashboards' },
  }),

  watch: {
    '$route.query': {
      async handler() {
        await this.loadList();
      },
      immediate: true,
    },
  },

  computed: {
    ...mapState('history', {
      isLoading: (state) => state.isLoading,
    }),

    tabs() {
      return [
        { text: this.$t('mainSection.history.history'), value: 'history-table' },
        { text: this.$t('mainSection.dashboards.dashboards'), value: 'history-dashboards' },
      ];
    },
  },

  methods: {
    ...mapActions('history', {
      loadList: 'LOAD_DATA_LIST',
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
}

.content-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 100%;
  width: 100%;
  box-sizing: border-box;
}
</style>
