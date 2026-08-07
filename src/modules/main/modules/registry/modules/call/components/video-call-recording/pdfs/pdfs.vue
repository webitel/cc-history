<template>
  <agent-pdfs-tab-sdk
    class="agent-pdfs-tab"
    :store="tableStore"
    entity-id-key="callId"
    :entity-id-value="callId"
    :is-created-at-filter="false"
    :access="{
      delete: hasDeleteAccess,
    }"
    :on-delete-item="handleDeleteItem"
  >
    <template
      #header="{
        selected,
        loadDataList,
        askDeleteConfirmation,
        handleDelete,
        downloadArchive,
        isDownloadingArchive,
      }"
    >
      <header class="table-title">
        <h3 class="table-title__title typo-heading-4">
          {{ t('registry.call.pdfs', 2) }}
        </h3>
        <wt-action-bar
          :include="[IconAction.REFRESH, IconAction.DOWNLOAD, IconAction.DELETE]"
          :disabled:delete="!selected.length || !hasDeleteAccess"
          :disabled:download="isDownloadingArchive"
          @click:refresh="loadDataList"
          @click:download="downloadArchive"
          @click:delete="
            askDeleteConfirmation({
              deleted: selected,
              callback: () => handleDelete(selected),
            })
          "
        >
          <template #download="{ onClick }">
            <wt-loader
              v-if="isDownloadingArchive"
              :size="ComponentSize.SM"
            />
            <wt-icon-action
              v-else
              action="download"
              @click="onClick"
            />
          </template>
        </wt-action-bar>
      </header>
    </template>
  </agent-pdfs-tab-sdk>
</template>

<script lang="ts" setup>
import { FileServicesAPI } from '@webitel/api-services/api';
import { WebitelMediaExporterExportRecord } from '@webitel/api-services/gen/models';
import { ComponentSize, IconAction } from '@webitel/ui-sdk/enums';
import AgentPdfsTabSdk from '@webitel/ui-sdk/src/modules/AgentPdfs/components/agent-pdfs-tab.vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useRecordingFilesAccess } from '../../../../../composables/useRecordingFilesAccess';
import { usePdfsDataListStore } from './store/pdfs';

const route = useRoute();

const { t } = useI18n();

const callId = route.params.pathMatch as string;

const tableStore = usePdfsDataListStore();

const { hasDeleteAccess } = useRecordingFilesAccess();

const handleDeleteItem = (item: WebitelMediaExporterExportRecord) => {
	return FileServicesAPI.delete([
		item.fileId,
	]);
};
</script>

<style lang="scss" scoped>

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
}
</style>