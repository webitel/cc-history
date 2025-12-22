<template>
  <agent-pdfs-tab-sdk
    class="agent-pdfs-tab"
    :store="tableStore"
    entity-id-key="callId"
    :entity-id-value="callId"
    :on-delete-item="handleDeleteItem"
  >
    <template #header="{ selected, loadDataList, askDeleteConfirmation, handleDelete }">
      <header class="table-title">
        <h3 class="table-title__title">
          {{ t('registry.call.pdfs', 2) }}
        </h3>
        <wt-action-bar
          :include="[IconAction.REFRESH, IconAction.DELETE]"
          :disabled:delete="!selected.length"
          @click:refresh="loadDataList"
          @click:delete="
            askDeleteConfirmation({
              deleted: selected,
              callback: () => handleDelete(selected),
            })
          "
        >
        </wt-action-bar>
      </header>
    </template>
  </agent-pdfs-tab-sdk>
</template>

<script lang="ts" setup>
import { IconAction } from '@webitel/ui-sdk/enums';
import AgentPdfsTabSdk from '@webitel/ui-sdk/src/modules/AgentPdfs/components/agent-pdfs-tab.vue';
import { usePdfsDataListStore } from './store/pdfs';
import { useRoute } from 'vue-router';
import { FileServicesAPI } from '@webitel/api-services/api';
import { WebitelMediaExporterExportRecord } from '@webitel/api-services/gen/models';
import { useI18n } from 'vue-i18n';

const route = useRoute();

const { t } = useI18n();

const callId = route.params.pathMatch as string;

const tableStore = usePdfsDataListStore();

const handleDeleteItem = (item: WebitelMediaExporterExportRecord) => {
  return FileServicesAPI.delete([item.fileId]);
};
</script>

<style lang="scss" scoped>
@use '@webitel/styleguide/typography' as *;

// These styles are duplicated here because they weren't being 
// applied from their location in the supervisor repo
.agent-pdfs-tab {
  :deep(.wt-table) {
    margin-bottom: var(--spacing-sm);
  }

  :deep(.wt-pagination) {
    display: flex;
    justify-content: flex-end;
  }
}

.table-title {
  padding-inline: var(--spacing-xs);
}

.table-title__title {
  @extend %typo-heading-4;
}
</style>