<template>
  <section class="table-actions">
    <icon-btn
      v-if="this.import"
      :icon="'download'"
      :tooltip="$t('icon.import')"
      @click.native="$emit('import')"
    ></icon-btn>
    <icon-btn
      v-if="this.export"
      :icon="'upload'"
      :tooltip="$t('icon.export')"
      @click.native="$emit('export')"
    ></icon-btn>
    <icon-btn
      v-if="filterReset"
      :icon="'reset-filters'"
      :tooltip="$t('tooltip.filterReset')"
      @click.native="$emit('filter-reset')"
    ></icon-btn>
    <icon-btn
      v-if="columnSelect"
      :icon="'col-select'"
      :tooltip="$t('tooltip.columnSelect')"
      @click.native="$emit('column-select')"
    ></icon-btn>
    <icon-btn
      v-if="refresh"
      :icon="'refresh'"
      :tooltip="$t('tooltip.refreshTable')"
      @click.native="$emit('refresh')"
    ></icon-btn>
    <icon-btn
      v-if="settings"
      :class="{'active': isSettingsActive}"
      :icon="'filter'"
      :tooltip="$t('tooltip.expandFilters')"
      @click.native="$emit('settings')"
    ></icon-btn>
  </section>
</template>

<script>
  export default {
    name: 'table-actions',
    props: {
      settings: {
        type: Boolean,
        default: false,
      },
      refresh: {
        type: Boolean,
        default: true,
      },
      columnSelect: {
        type: Boolean,
        default: false,
      },
      filterReset: {
        type: Boolean,
        default: false,
      },
      export: {
        type: Boolean,
        default: false,
      },
      import: {
        type: Boolean,
        default: true,
      },
      isSettingsActive: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style lang="scss" scoped>
  .table-actions {
    .icon-btn {
      margin-left: 30px;
    }
  }
</style>
