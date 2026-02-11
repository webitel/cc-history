<template>
  <div class="content-wrapper">
    <dashboards-header
      :layout="layout"
      @reflow="reflow"
    />
    <wt-loader v-show="isLoading || isReflow" />
    <div
      v-if="!isReflow"
      v-show="!isLoading"
      class="history-dashboards"
    >
      <div
        class="dashboards-wrapper"
        :class="`dashboards-wrapper--${layout}-col`"
      >
        <div
          v-for="(dashboard, key) of dashboards"
          :key="key"
          class="dashboard-wrapper"
        >
          <dashboard-header
            :name="dashboard.options.name"
            @edit="editDashboard(dashboard)"
            @delete="deleteDashboard(dashboard)"
          />
          <component
            :is="dashboard.getDisplayName()"
            class="chart"
            :dashboard="dashboard"
            :data="dashboardsData[key]"
            :dark-mode="darkMode"
          />
        </div>
        <div class="dashboard-wrapper dashboard-wrapper--empty">
          <wt-button
            color="secondary"
            @click="openDashboardSelect"
          >
            {{ $t('dashboards.newBtn') }}
          </wt-button>
        </div>
      </div>

      <dashboard-select-popup
        v-if="isDashboardSelect"
        @close="closeDashboardSelect"
        @input="selectDashboard"
      />

      <dashboard-config-popup
        v-if="isDashboardConfig"
        :dashboard="configuredDashboard"
        @close="closeDashboardConfig"
        @input="handleDashboardConfig"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

import DashboardConfigPopup from './_internals/dashboard-config-popup/dashboard-config-popup.vue';
import DashboardSelectPopup from './_internals/dashboard-select-popup/dashboard-select-popup.vue';
import DashboardsHeader from './_internals/dashboards-header/dashboards-header.vue';
import DashboardHeader from './dashboards/_internals/dashboard-header/dashboard-header.vue';
import CallsByPeriodDashboard from './dashboards/CallsByPeriodDashboard/calls-by-period-dashboard.vue';
import CallsCountDashboard from './dashboards/CallsCountDashboard/calls-count-dashboard.vue';
import CallsCountMetricDashboard from './dashboards/CallsCountMetricDashboard/calls-count-metric-dashboard.vue';
import CallsCountVariableDashboard from './dashboards/CallsCountVariableDashboard/calls-count-variable-dashboard.vue';
import CallsDurationDashboard from './dashboards/CallsDurationDashboard/calls-duration-dashboard.vue';
import CallsDurationMetricDashboard from './dashboards/CallsDurationMetricDashboard/calls-duration-metric-dashboard.vue';

export default {
	name: 'HistoryDashboards',
	components: {
		DashboardsHeader,
		DashboardHeader,
		CallsByPeriodDashboard,
		CallsCountDashboard,
		DashboardSelectPopup,
		DashboardConfigPopup,
		CallsCountMetricDashboard,
		CallsCountVariableDashboard,
		CallsDurationDashboard,
		CallsDurationMetricDashboard,
	},
	data: () => ({
		isReflow: false, // variable forces dashboards rerender
		configuredDashboard: null,
		isDashboardSelect: false,
		isDashboardConfig: false,
	}),
	watch: {
		'$route.query': {
			handler() {
				this.loadDashboardsData();
			},
		},
		dashboards() {
			this.loadDashboardsData();
		},
	},
	created() {
		this.restoreDashboards();
	},
	computed: {
		...mapState('dashboards', {
			dashboards: (state) => state.dashboards,
			dashboardsData: (state) => state.dashboardsData,
			layout: (state) => state.layout,
			isLoading: (state) => state.isLoading,
		}),
		...mapGetters('appearance', {
			darkMode: 'DARK_MODE',
		}),
	},
	methods: {
		...mapActions('dashboards', {
			addDashboard: 'ADD_DASHBOARD',
			deleteDashboard: 'DELETE_DASHBOARD',
			restoreDashboards: 'RESTORE_DASHBOARDS',
			loadDashboardsData: 'LOAD_DASHBOARDS_DATA',
			changeLayout: 'CHANGE_LAYOUT',
		}),

		async reflow(value) {
			this.isReflow = true;
			this.changeLayout(value);
			await this.$nextTick();
			this.isReflow = false;
		},
		handleDashboardConfig(options) {
			this.closeDashboardConfig();
			this.addDashboard({
				dashboard: this.configuredDashboard,
				options,
			});
			this.resetConfiguredDashboard();
		},
		editDashboard(dashboard) {
			this.configuredDashboard = dashboard;
			this.openDashboardConfig();
		},
		selectDashboard(dashboard) {
			this.configuredDashboard = dashboard;
			this.closeDashboardSelect();
			this.openDashboardConfig();
		},
		openDashboardSelect() {
			this.isDashboardSelect = true;
		},
		openDashboardConfig() {
			this.isDashboardConfig = true;
		},
		closeDashboardSelect() {
			this.isDashboardSelect = false;
		},
		closeDashboardConfig() {
			this.isDashboardConfig = false;
		},
		resetConfiguredDashboard() {
			this.configuredDashboard = null;
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

  &--1-col {
    grid-template-columns: 1fr;
  }

  &--2-col {
    grid-template-columns: 1fr 1fr;
  }

  &--3-col {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.dashboard-wrapper {
  min-height: 333px;
  min-width: fit-content; // prevent scrolls caused by 0.5px width diff between chart and wrapper
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px dashed var(--form-outline-border-color);
  overflow: auto;

  .dashboard-header,
  .chart {
    width: 100%;
    box-sizing: border-box;
  }

  .chart {
    flex-grow: 1;
  }
}
</style>
