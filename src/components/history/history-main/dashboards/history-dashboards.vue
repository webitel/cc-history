<template>
  <div class="history-dashboards">
    <div class="dashboards-wrapper">
      <component
        class="dashboard-wrapper"
        v-for="(dashboard, key) of dashboards"
        :key="key"
        :is="dashboard.component"
        :dashboard="dashboard"
      ></component>
      <div class="dashboard-wrapper">
        <wt-button color="secondary" @click="openDashboardSelect">
          {{ $t('mainSection.dashboards.newBtn') }}
        </wt-button>
      </div>
    </div>

    <dashboard-select-popup
      v-if="isDashboardSelect"
      @close="closeDashboardSelect"
      @input="selectDashboardDraft"
    ></dashboard-select-popup>

    <dashboard-config-popup
      v-if="isDashboardConfig"
      :dashboard="dashboardDraft"
      @close="closeDashboardConfig"
      @input="addDashboard"
    ></dashboard-config-popup>
  </div>
</template>

<script>
import CallsByPeriodDashboard from './visualizations/calls-by-period-dashboard.vue';
import CallsCountDashboard from './visualizations/calls-count-dashboard.vue';
import DashboardSelectPopup from './dashboard-select-popup.vue';
import DashboardConfigPopup from './dashboard-config-popup.vue';

export default {
  name: 'history-dashboards',
  components: {
    CallsByPeriodDashboard,
    CallsCountDashboard,
    DashboardSelectPopup,
    DashboardConfigPopup,
  },
  data: () => ({
    dashboards: [
      // { component: 'CallsByPeriodDashboard' },
      // { visualization: 'doughnut-chart', component: 'CallsCountDashboard' },
    ],
    dashboardDraft: {},
    isDashboardSelect: false,
    isDashboardConfig: false,
  }),
  methods: {
    addDashboard(dashboard) {
      this.closeDashboardConfig();
      this.dashboards.push(dashboard);
      this.resetDashboardDraft();
    },
    openDashboardSelect() {
      this.isDashboardSelect = true;
    },
    selectDashboardDraft(dashboard) {
      this.dashboardDraft = dashboard;
      this.closeDashboardSelect();
      this.isDashboardConfig = true;
    },
    closeDashboardSelect() {
      this.isDashboardSelect = false;
    },
    closeDashboardConfig() {
      this.isDashboardConfig = false;
    },
    resetDashboardDraft() {
      this.dashboardDraft = {};
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboards-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(580px, 1fr));
  grid-gap: 30px;
  margin-top: 10px;
}

.dashboard-wrapper {
  min-height: 333px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed var(--form-outline-border-color);
  overflow: auto;
}
</style>
