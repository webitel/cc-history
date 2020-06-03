<template>
  <section class="table-actions">
    <button
      v-if="importBtn"
      class="icon-btn">
      <icon>
        <svg class="icon md">
          <use xlink:href="#icon-download_md"></use>
        </svg>
      </icon>
    </button>
    <button
      v-if="exportBtn"
      class="icon-btn">
      <icon>
        <svg class="icon md">
          <use xlink:href="#icon-upload_md"></use>
        </svg>
      </icon>
    </button>
    <button
      v-if="filterReset"
      class="icon-btn"
      @click.prevent=""
    >
      <icon>
        <svg class="icon md">
          <use xlink:href="#icon-close_md"></use>
        </svg>
      </icon>
    </button>
    <button
      v-if="columnSelect"
      class="icon-btn history-filters__icon-btn">
      <icon>
        <svg class="icon md">
          <use xlink:href="#icon-col-select_md"></use>
        </svg>
      </icon>
    </button>
    <button
      v-if="refresh"
      class="icon-btn">
      <icon>
        <svg class="icon md">
          <use xlink:href="#icon-refresh_md"></use>
        </svg>
      </icon>
    </button>
    <button
      v-if="settings"
      class="icon-btn history-filters__icon-btn"
      :class="{'active': isSettingsActive}"
      @click.prevent="$emit('settings')"
    >
      <icon>
        <svg class="icon icon-filter_md md">
          <use xlink:href="#icon-filter_md"></use>
        </svg>
      </icon>
    </button>
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
      // export and import keywords are reserved
      exportBtn: {
        type: Boolean,
        default: false,
      },
      importBtn: {
        type: Boolean,
        default: false,
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
