<template>
  <wt-page-wrapper
    :actions-panel="showActionsPanel"
    class="table-page"
  >
    <template #header>
      <history-heading />
    </template>
    <template #actions-panel>
      <history-filters
        @hide="showActionsPanel = false"
      />
    </template>
    <template #main>
      <history-registry
        @toggle:filters-panel="showActionsPanel = !showActionsPanel"
      />
    </template>
  </wt-page-wrapper>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// import HistoryFilters from '../../modules/filters/components/the-history-filters.vue';
import HistoryFilters from '../../modules/filters/components/the-history-filters.vue';
import HistoryHeading from '../../modules/heading/components/the-history-heading.vue';
import HistoryRegistry from '../../modules/main/modules/registry/components/history-registry.vue';

const showActionsPanel = ref(true);
</script>

<style lang="scss" scoped>
@use '@webitel/ui-sdk/src/css/pages/table-page.scss' as *;

.table-page.wt-page-wrapper {
  flex: 1;
  min-height: 0;

  :deep(.wt-page-wrapper__main) {
    min-height: 0;
  }
}
</style>
