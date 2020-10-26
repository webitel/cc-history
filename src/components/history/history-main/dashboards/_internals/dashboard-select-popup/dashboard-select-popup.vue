<template>
  <wt-popup class="dashboard-select" @close="$emit('close')">
    <template slot="title">
      {{ $t('dashboards.dashboardSelect') }}
    </template>
    <template slot="main">
      <ul class="dashboard-select__options-list">
        <li
          class="dashboard-select__option"
          :class="{ 'dashboard-select__option--selected': dashboard.type === selected }"
          v-for="(dashboard, key) of dashboards"
          :key="key"
          @click="selected = dashboard.type"
        >
          <h4 class="dashboard-select__option__title">{{dashboard.title}}</h4>
          <p class="dashboard-select__option__description">{{dashboard.description}}</p>
        </li>
      </ul>
    </template>
    <template slot="actions">
      <wt-button
        :disabled="!selected"
        @click="selectDashboard"
      >{{ $t('reusable.ok') }}</wt-button>
      <wt-button
        color="secondary"
        @click="$emit('close')"
      >{{ $t('reusable.cancel') }}</wt-button>
    </template>
  </wt-popup>
</template>

<script>
import Dashboards from '../../dashboards/enums/Dashboards.enum';

export default {
  name: 'dashboard-select-popup',
  data: () => ({
    selected: null,
  }),
  computed: {
    dashboards() {
      return Dashboards.map((Dashboard) => ({
        title: this.$t(`dashboards.${Dashboard.type}.title`),
        description: this.$t(`dashboards.${Dashboard.type}.description`),
        type: Dashboard.type,
    }));
    },
  },
  methods: {
    selectDashboard() {
      const Dashboard = Dashboards.find((Dashboard) => Dashboard.type === this.selected);
      const dashboard = new Dashboard();
      this.$emit('input', dashboard);
    },
  },
};
</script>

<style lang="scss" scoped>
  .dashboard-select ::v-deep .wt-popup__popup {
    min-width: 600px;
  }

  .dashboard-select__option {
    padding: 12px 20px;
    margin-top: 20px;
    border: 2px solid var(--form-border-color);
    border-radius: var(--border-radius);
    transition: var(--transition);
    cursor: pointer;

    &:hover, &--selected {
      border-color: var(--main-accent-color);
    }

    &__title {
      @extend %typo-strong-md;
      margin-bottom: 5px;
    }

    &__description {
      @extend %typo-body-md;
    }
  }
</style>
