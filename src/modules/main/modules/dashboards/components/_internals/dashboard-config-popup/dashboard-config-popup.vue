<template>
  <wt-popup
    class="dashboard-config"
    @close="$emit('close')"
  >
    <template #title>
      {{ $t('dashboards.dashboardSelect') }}
    </template>
    <template #main>
      <form class="dashboard-config-form">
        <wt-input
          v-model="options.name"
          :label="$t('dashboards.dashboardConfigForm.name')"
        />
        <wt-select
          v-model="visualization"
          :label="$t('dashboards.dashboardConfigForm.visualization')"
          :disabled="!dashboard.visualizationOptions"
          :options="visualizationOptions"
          track-by="value"
          :clearable="false"
        />
        <wt-select
          v-if="aggregationOptions.length"
          v-model="aggregation"
          :label="$t('dashboards.dashboardConfigForm.aggregation')"
          :options="aggregationOptions"
          track-by="value"
          :clearable="false"
        />
        <wt-select
          v-if="paramOptions.length"
          v-model="param"
          :label="$t('dashboards.dashboardConfigForm.param')"
          :options="paramOptions"
          track-by="value"
          :clearable="false"
        />
        <wt-input
          v-if="dashboard.options.param === VisualizationParams.VARIABLES"
          v-model="options.variable"
          :label="$t('dashboards.dashboardConfigForm.variable')"
        />
        <wt-select
          v-if="isLimit"
          v-model="limit"
          :label="$t('dashboards.dashboardConfigForm.limit.limit')"
          :options="limitOptions"
          track-by="value"
          :clearable="false"
        />
        <wt-checkbox
          v-if="isRelative"
          v-model="options.relative"
          :label="$t('dashboards.dashboardConfigForm.relative')"
        />
      </form>
    </template>
    <template #actions>
      <wt-button
        @click="save"
      >
        {{ $t('reusable.save') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="$emit('close')"
      >
        {{ $t('reusable.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import { VisualizationParams } from '../../../api/params/DashboardParams.enum';

export default {
  name: 'DashboardConfigPopup',
  props: {
    dashboard: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    VisualizationParams,
    options: {},
  }),

  computed: {
    visualization: {
      get() {
        const { visualization } = this.options;
        return {
          name: this.$t(`dashboards.visualizations.${visualization.split('-')[0]}`),
          value: visualization,
        };
      },
      set(value) { this.options.visualization = value.value; },
    },

    aggregation: {
      get() {
        const { aggregation } = this.options;
        return {
          name: this.$t(`dashboards.aggregations.${aggregation}`),
          value: aggregation,
        };
      },
      set(value) { this.options.aggregation = value.value; },
    },

    param: {
      get() {
        const { param } = this.options;
        return { name: this.$t(`fields.${param}`), value: param };
      },
      set(value) { this.options.param = value.value; },
    },

    limit: {
      get() {
        const { limit } = this.options;
        return { name: this.$t(`dashboards.dashboardConfigForm.limit.${limit}`), value: limit };
      },
      set(value) { this.options.limit = value.value; },
    },

    visualizationOptions() {
      return this.dashboard.visualizationOptions
        ? this.dashboard.visualizationOptions
        .map((visualization) => ({
          name: this.$t(`dashboards.visualizations.${visualization.split('-')[0]}`),
          value: visualization,
        }))
        : [];
    },

    aggregationOptions() {
      return this.dashboard.aggregationOptions
        ? this.dashboard.aggregationOptions
        .map((aggregation) => ({ name: this.$t(`dashboards.aggregations.${aggregation}`), value: aggregation }))
        : [];
    },

    paramOptions() {
      return this.dashboard.paramOptions
        ? this.dashboard.paramOptions
        .map((param) => ({ name: this.$t(`fields.${param}`), value: param }))
        : [];
    },

    limitOptions() {
      return [
        { name: this.$t('dashboards.dashboardConfigForm.limit.5'), value: 5 },
        { name: this.$t('dashboards.dashboardConfigForm.limit.10'), value: 10 },
        { name: this.$t('dashboards.dashboardConfigForm.limit.15'), value: 15 },
        { name: this.$t('dashboards.dashboardConfigForm.limit.20'), value: 20 },
        ];
    },

    isLimit() {
      return this.dashboard.isLimit();
    },

    isRelative() {
      return this.dashboard.isRelative();
    },
  },

  created() {
    this.options = { ...this.dashboard.options };
  },

  methods: {
    save() {
      this.$emit('input', this.options);
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-config ::v-deep .wt-popup__popup {
  min-width: 600px;
  overflow: visible; // param select visibility
}

.dashboard-config-form * {
  margin-bottom: 20px;
}
</style>
