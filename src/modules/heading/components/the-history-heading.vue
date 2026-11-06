<template>
  <wt-headline class="the-history-heading">
    <template #title>
      {{ $t('reusable.history') }}
    </template>
    <template #actions>
      <div class="the-history-heading-actions">
        <dynamic-filter-search
          :filters-manager="filtersManager"
          :is-filters-restoring="isFiltersRestoring"
          :search-mode-options="searchModeOptions"
          @filter:add="addFilter"
          @filter:update="updateFilter"
          @filter:delete="deleteFilter"
        />

        <history-transcribe-action
          :selected="selected"
          class="history-action"
          @refresh="loadDataList"
        />

        <export-action
          :filters="filters"
          :fields="fields"
          :selected="selected"
          :disabled="!dataList.length || !hasExportDataGridAccess"
          filename="history"
          class="history-action"
          @fetch="APIRepository.history.exportHistoryToFile"
        />

        <download-action
          :selected="selected"
          :disabled="!dataList.length"
          filename="history"
          class="history-action"
          @fetch="fetchHistoryPage"
        />

        <history-delete-action
          :selected="selected"
          class="history-action"
          @refresh="loadDataList"
        />
      </div>
    </template>
  </wt-headline>
</template>

<script lang="ts" setup>
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import type { DownloadFetch } from '@webitel/ui-sdk/modules/FilesExport';
import { SpecialGlobalAction } from '@webitel/ui-sdk/modules/Userinfo';
import ExportAction from '@webitel/ui-sdk/src/modules/CSVExport/components/export-action.vue';
import DownloadAction from '@webitel/ui-sdk/src/modules/FilesExport/components/download-action.vue';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import APIRepository from '../../../app/api/APIRepository';
import { SearchMode } from '../../filters/enums/SearchMode';
import { useRegistryStore } from '../../main/modules/registry/store/new/registry.store.ts';
import { useUserinfoStore } from '../../userinfo/stores/userinfoStore';
import HistoryDeleteAction from './actions/history-delete-action.vue';
import HistoryTranscribeAction from './actions/history-transcribe-action.vue';
import { buildHistoryDownloadParams } from './buildHistoryDownloadParams';

const { t } = useI18n();
const registryStore = useRegistryStore();

const {
	dataList,
	selected,
	fields: tableFields,
	filtersManager,
	isFiltersRestoring,
} = storeToRefs(registryStore);

const { loadDataList, addFilter, updateFilter, deleteFilter } = registryStore;

// [WTEL-6378](https://webitel.atlassian.net/browse/WTEL-6378?focusedCommentId=669091)
const fields = computed(() => {
	return [
		'id',
	].concat(tableFields.value);
});

const filters = computed(() => filtersManager.value.getAllValues());

const fetchHistoryPage: DownloadFetch = (params) =>
	APIRepository.history.getHistory(
		buildHistoryDownloadParams({
			...params,
			filters: filters.value,
		}),
	);

const userinfoStore = useUserinfoStore();

const hasExportDataGridAccess = computed(() =>
	userinfoStore.hasSpecialGlobalActionAccess(
		SpecialGlobalAction.ExportDataGrid,
	),
);

const searchModeOptions = computed(() => {
	return Object.values(SearchMode).map((mode) => {
		return {
			text: t(`filters.search.${mode}`),
			value: mode,
		};
	});
});
</script>

<style lang="scss" scoped>
.the-history-heading-actions {
  display: flex;
  flex-wrap: wrap;
}
</style>
