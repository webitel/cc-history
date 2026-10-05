<template>
  <wt-vidstack-player
    v-if="isVideoOpen && currentVideo"
    closable
    :src="getMediaUrl(currentVideo.id)"
    :title="currentVideo.viewName || currentVideo.name"
    :mime="currentVideo.mimeType"
    @close="closeVideo"
  />
  <header class="table-title">
    <h3 class="table-title__title">
      {{ t('objects.screenRecordings', 2) }}
    </h3>
    <wt-action-bar
      :include="[IconAction.DOWNLOAD, IconAction.FILTERS, IconAction.DELETE]"
      :disabled:download="!dataList.length || isDownloadingArchive"
      :disabled:delete="!visibleSelected.length || !hasDeleteAccess"
      @click:download="downloadArchive"
      @click:delete="
        askDeleteConfirmation({
          deleted: visibleSelected,
          callback: () => handleDelete(visibleSelected),
        })
      "
    >
      <template #filters>
        <wt-badge :hidden="!hasDateFilter">
          <wt-icon-action
            :action="IconAction.FILTERS"
            @click="areDateFiltersOpen = !areDateFiltersOpen"
          />
        </wt-badge>
      </template>
    </wt-action-bar>
  </header>

  <wt-filters-panel-wrapper
    v-if="areDateFiltersOpen"
    class="screen-recordings-filters"
    is-opened
    :table-action-icons="['filter-reset']"
    @reset="resetDateFilters"
  >
    <wt-datepicker
      :model-value="startAtFrom"
      show-time
      clearable
      :label="t('reusable.from')"
      @update:model-value="setStartAtFrom"
    />
    <wt-datepicker
      :model-value="startAtTo"
      show-time
      clearable
      :label="t('reusable.to')"
      @update:model-value="setStartAtTo"
    />
  </wt-filters-panel-wrapper>

  <delete-confirmation-popup
    :shown="isDeleteConfirmationPopup"
    :callback="deleteCallback"
    :delete-count="deleteCount"
    @close="closeDelete"
  />

  <div class="table-section__table-wrapper">
    <wt-empty
      v-show="showEmpty"
      :image="imageEmpty"
      :text="textEmpty"
    />

    <wt-loader v-show="isLoading" />

    <wt-table
      v-show="dataList.length && !isLoading"
      v-model:selected="selected"
      :data="dataList"
      :headers="headers"
      sortable
    >
      <template #screenRecordings="{ item }">
        <wt-image
          width="48px"
          overlay-icon="play"
          :src="getMediaUrl(item.id, true)"
          alt=""
          @click="openVideo(item)"
        />
      </template>

      <template #name="{ item }">
        {{ item.viewName || item.name }}
      </template>

      <template #dateTime="{ item }">
        {{ prettifyTimestamp(item) }}
      </template>

      <template #recordingDuration="{ item }">
        {{ calcDuration(item) }}
      </template>

      <template #actions="{ item }">
        <wt-icon-action
          action="download"
          @click="downloadFile(item.id, item.viewName || item.name)"
        />
        <wt-icon-action
          action="delete"
          :disabled="!hasDeleteAccess"
          @click="
            askDeleteConfirmation({
              deleted: [item],
              callback: () => handleDelete([item]),
            })
          "
        />
      </template>
    </wt-table>
  </div>
</template>

<script setup lang="ts">
import {
	downloadFile,
	FileServicesAPI,
	getMediaUrl,
	PdfServicesAPI,
} from '@webitel/api-services/api';
import {
	SearchScreenRecordingsByCallChannel,
	SearchScreenRecordingsByCallType,
	type StorageFile,
} from '@webitel/api-services/gen/models';
import {
	FileFormat,
	downloadFile as saveArchiveFile,
} from '@webitel/api-services/scripts';
import { WtEmpty, WtVidstackPlayer } from '@webitel/ui-sdk/components';
import { FormatDateMode, IconAction } from '@webitel/ui-sdk/enums';
import { eventBus } from '@webitel/ui-sdk/scripts';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { formatDate } from '@webitel/ui-sdk/utils';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { useRecordingFilesAccess } from '../../../../../composables/useRecordingFilesAccess';

import { buildCallScreenRecordingArchiveParams } from './buildCallScreenRecordingArchiveParams';
import { headers } from './store/headers/headers';

const props = defineProps({
	call: {
		type: Object,
		default: null,
	},
	namespace: {
		type: String,
	},
});

const store = useStore();

const { t } = useI18n();

const dataList = ref<StorageFile[]>([]);
const isLoading = ref(false);
const error = ref('');

const startAtFrom = ref<number | null>(null);
const startAtTo = ref<number | null>(null);
const areDateFiltersOpen = ref(false);

const hasDateFilter = computed(
	() => startAtFrom.value != null || startAtTo.value != null,
);

const dateFilters = computed(() => ({
	from: startAtFrom.value,
	to: startAtTo.value,
}));

const selected = ref<StorageFile[]>([]);
const visibleSelected = computed(() =>
	selected.value.filter((item) =>
		dataList.value.some((row) => row.id === item.id),
	),
);
const isDownloadingArchive = ref(false);

const callId = computed(() => {
	if (props.call?.id != null) return String(props.call.id);

	const id = getNamespacedState(store.state, props.namespace).mainCallId;
	return id == null ? '' : String(id);
});

const currentVideo = ref<StorageFile | null>(null);
const isVideoOpen = ref(false);

const recordingStartAt = (item: StorageFile) =>
	item.properties?.startTime ?? item.uploadedAt;

const prettifyTimestamp = (item: StorageFile) => {
	const startAt = recordingStartAt(item);
	return startAt ? formatDate(+startAt, FormatDateMode.DATETIME) : '';
};

const calcDuration = (item: StorageFile) => {
	const startAt = Number(item.properties?.startTime);
	const stopAt = Number(item.properties?.endTime);
	if (!Number.isFinite(startAt) || !Number.isFinite(stopAt)) return '';

	return convertDuration(Math.floor((stopAt - startAt) / 1000));
};

const { hasDeleteAccess } = useRecordingFilesAccess();

const loadDataList = async () => {
	if (!callId.value) {
		dataList.value = [];
		return;
	}

	isLoading.value = true;
	error.value = '';

	try {
		const { items } = await FileServicesAPI.getScreenRecordingsByCall({
			callId: callId.value,
			type: SearchScreenRecordingsByCallType.Screensharing,
			channel: SearchScreenRecordingsByCallChannel.Screenrecording,
			size: 100,
			fields: [
				'name',
				'uploaded_at',
				'properties',
			],
			startAtFrom: startAtFrom.value?.toString(),
			startAtTo: startAtTo.value?.toString(),
		});

		dataList.value = items;
		selected.value = selected.value.filter((item) =>
			items.some((row) => row.id === item.id),
		);
	} catch (e) {
		dataList.value = [];
		error.value = e?.response?.data?.detail || e?.message || 'error';
	} finally {
		isLoading.value = false;
	}
};

const resetDateFilters = () => {
	startAtFrom.value = null;
	startAtTo.value = null;
	loadDataList();
};

const setStartAtFrom = (value: number | null) => {
	startAtFrom.value = value;
	loadDataList();
};

const setStartAtTo = (value: number | null) => {
	startAtTo.value = value;
	loadDataList();
};

const downloadArchive = async () => {
	if (!callId.value || isDownloadingArchive.value) return;

	isDownloadingArchive.value = true;
	try {
		const response = await PdfServicesAPI.downloadCallScreenrecordingArchive({
			callId: callId.value,
			...buildCallScreenRecordingArchiveParams({
				selected: visibleSelected.value,
				from: startAtFrom.value,
				to: startAtTo.value,
			}),
		});

		saveArchiveFile({
			response,
			fileFormat: FileFormat.ZIP,
			filename: `screen-recordings-${callId.value}-${new Date().toISOString().slice(0, 10)}`,
		});
	} catch (e) {
		eventBus.$emit('notification', {
			type: 'error',
			text: e?.response?.data?.detail || e?.message,
		});
	} finally {
		isDownloadingArchive.value = false;
	}
};

const handleDelete = async (items: StorageFile[]) => {
	const deleteIds = items
		.map((item) => item.id)
		.filter((id): id is string => id != null);

	try {
		await FileServicesAPI.delete(deleteIds);
	} finally {
		await loadDataList();
	}
};

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,

	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();

const {
	showEmpty,
	image: imageEmpty,
	text: textEmpty,
} = useTableEmpty({
	dataList,
	filters: dateFilters,
	error,
	isLoading,
});

const openVideo = (item: StorageFile) => {
	currentVideo.value = item;
	isVideoOpen.value = true;
};

const closeVideo = () => {
	currentVideo.value = null;
	isVideoOpen.value = false;
};

watch(callId, loadDataList, {
	immediate: true,
});
</script>

<style scoped>
.table-title {
  padding-inline: var(--spacing-xs);
}

.screen-recordings-filters {
  padding: 0 var(--spacing-xs) var(--spacing-xs);
}
</style>
