<template>
  <wt-popup class="dashboard-config" @close="$emit('close')">
    <template slot="header">
      <h3 class="dashboard-config__title">{{ $t('mainSection.dashboards.dashboardSelect') }}</h3>
    </template>
    <template slot="main">
      <form class="dashboard-config-form">
        <wt-input
          v-model="dashboardDraft.name"
          :label="$t('mainSection.dashboards.dashboardConfigForm.name')"
        ></wt-input>
        <wt-select
          v-model="visualization"
          :label="$t('mainSection.dashboards.dashboardConfigForm.visualization')"
          :disabled="!dashboard.visualizationOptions"
          :options="visualizationOptions"
          track-by="value"
          :resetable="false"
        ></wt-select>
        <wt-select
          v-model="param"
          :label="$t('mainSection.dashboards.dashboardConfigForm.param')"
          :disabled="!dashboard.paramOptions"
          :options="paramOptions"
          track-by="value"
        ></wt-select>
        <wt-checkbox
          v-if="isGroup"
          v-model="dashboardDraft.group"
          :label="$t('mainSection.dashboards.dashboardConfigForm.group')"
        ></wt-checkbox>
        <wt-checkbox
          v-if="isRelative"
          v-model="dashboardDraft.relative"
          :label="$t('mainSection.dashboards.dashboardConfigForm.relative')"
        ></wt-checkbox>
      </form>
    </template>
    <template slot="actions">
      <wt-button
        @click="add"
      >{{ $t('reusable.add') }}</wt-button>
      <wt-button
        color="secondary"
        @click="$emit('close')"
      >{{ $t('reusable.close') }}</wt-button>
    </template>
  </wt-popup>
</template>

<script>
import deepCopy from 'deep-copy';

export default {
  name: 'dashboard-config-popup',
  props: {
    dashboard: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    dashboardDraft: {},
  }),

  created() {
    this.dashboardDraft = deepCopy(this.dashboard);
  },

  computed: {
    param: {
      get() {
        const { param } = this.dashboardDraft;
        return {
          name: this.$t(`fields.${param}`),
          value: param,
        };
      },
      set(value) {
        this.dashboardDraft.param = value.value;
      },
    },

    visualization: {
      get() {
        const { visualization } = this.dashboardDraft;
        return {
          name: this.$t(`mainSection.dashboards.visualizations.${visualization.split('-')[0]}`),
          value: visualization,
        };
      },
      set(value) {
        this.dashboardDraft.visualization = value.value;
      },
    },

    visualizationOptions() {
      return this.dashboard.visualizationOptions
        ? this.dashboard.visualizationOptions
        .map((visualization) => ({
          name: this.$t(`mainSection.dashboards.visualizations.${visualization.split('-')[0]}`),
          value: visualization,
        }))
        : [];
    },

    paramOptions() {
      return this.dashboard.paramOptions
        ? this.dashboard.paramOptions
        .map((param) => ({
          name: this.$t(`fields.${param}`),
          value: param,
        }))
        : [];
    },

    isGroup() {
      return this.dashboard.group != null;
    },
    isRelative() {
      return this.dashboard.relative != null;
    },
  },

  methods: {
    add() {
      this.$emit('input', this.dashboardDraft);
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-config ::v-deep .wt-popup__popup {
  min-width: 600px;
  overflow: visible; // param select visibility
}

.dashboard-config__title {
  @extend %typo-strong-lg;
  text-align: center;
  padding-top: 16px;
}

.dashboard-config-form * {
  margin-bottom: 20px;
}

.wt-button:first-child {
  margin-right: 20px;
}
</style>
