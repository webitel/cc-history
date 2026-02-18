<template>
  <wt-galleria
    v-model:visible="galleriaVisible"
    v-model:active-index="galleriaActiveIndex"
    :value="galleriaData"
    @download="downloadFile(dataList[galleriaActiveIndex].id)"
    @delete="handleDeleteFromGalleria"
  />

  <section class="table-page">
    <header class="table-title">
      <h3 class="table-title__title typo-heading-4">
        {{ t('objects.screenshots', 2) }}
      </h3>
      <wt-action-bar
        :include="[IconAction.DOWNLOAD_PDF, IconAction.DOWNLOAD, IconAction.DELETE]"
        :disabled:delete="!selected.length"
        :disabled:download-pdf="!dataList.length"
        :disabled:download="!dataList.length"
        @click:download-pdf="downloadPdf"
        @click:download="downloadZip"
        @click:delete="
          askDeleteConfirmation({
            deleted: selected,
            callback: () => handleDelete(selected),
          })
        "
      >
      </wt-action-bar>
    </header>

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
        :headline="textEmpty"
      />

      <wt-loader v-show="isLoading" />

      <wt-table
        v-show="dataList.length && !isLoading"
        v-model:selected="selected"
        :data="dataList"
        :headers="headers"
        sortable
      >
        <template #screenshots="{ item }">
          <wt-image
            width="48"
            overlay-icon="zoom-in"
            :src="getMediaUrl(item.id, true)"
            alt=""
            @click="openScreenshot(item.id)"
          />
        </template>

        <template #uploaded_at="{ item }">
          {{ formatDate(+item.startAt, FormatDateMode.DATETIME) }}
        </template>

        <template #actions="{ item }">
          <wt-icon-action
            action="download"
            @click="downloadFile(item.id)"
          />
          <wt-icon-action
            action="delete"
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
  </section>
</template>

<script setup lang="ts">
import {
	downloadFile,
	FileServicesAPI,
	getMediaUrl,
	PdfServicesAPI,
} from '@webitel/api-services/api';
import { EngineCallFileType } from '@webitel/api-services/gen/models';
import { useFilesExport } from '@webitel/ui-sdk/modules/FilesExport';
import { FormatDateMode, IconAction } from '@webitel/ui-sdk/enums';
import { eventBus } from '@webitel/ui-sdk/scripts';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { formatDate } from '@webitel/ui-sdk/utils';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { EngineHistoryCall } from 'webitel-sdk';

import { headers } from './store/headers/headers';

interface Props {
	call: EngineHistoryCall;
	namespace?: string;
}

const props = withDefaults(defineProps<Props>(), {
	call: () => [],
	namespace: '',
});

const store = useStore();

const route = useRoute();

const callId = computed(() => route.params.pathMatch);

const isLoading = computed(() => {
	return getNamespacedState(store.state, props.namespace).isLoading;
});

const dataList = ref(
	props.call?.files?.[EngineCallFileType.FileTypeScreenshot] || [],
);

const { t } = useI18n();

const error = ref('');

const selected = ref([]);

const galleriaVisible = ref(false);
const galleriaActiveIndex = ref(0);

const galleriaData = computed(() => {
	if (!dataList.value?.length) return [];

	return dataList.value
		.filter((item) => item && item.id && item.name)
		.map((item) => ({
			src: getMediaUrl(item.id, false),
			thumbnailSrc: getMediaUrl(item.id, true),
			title: item.name,
			alt: item.name,
		}));
});

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
	error,
});

const openScreenshot = (id) => {
	galleriaActiveIndex.value = dataList.value.findIndex(
		(item) => item.id === id,
	);
	galleriaVisible.value = true;
};

const handleDelete = async (items: []) => {
	const deleteIds = items.map((item) => item.id);

	await FileServicesAPI.delete(deleteIds);

	dataList.value = dataList.value.filter(
		(item) => !deleteIds.includes(item.id),
	);
	selected.value = selected.value.filter(
		(item) => !deleteIds.includes(item.id),
	);
};

const downloadPdf = async () => {
	try {
		await PdfServicesAPI.createCallExport({
			callId: callId.value,
			itemInstance: {
				fileIds: selected.value.length
					? selected.value.map(({ id }) => id)
					: dataList.value.map(({ id }) => id),
			},
		});
		eventBus.$emit('notification', {
			type: 'info',
			text: t('webitelUI.pdfGeneration.generationStarted'),
		});
	} catch (e) {
		eventBus.$emit('notification', {
			type: 'error',
			text: e?.response?.data?.detail,
		});
	}
};

const { exportFiles: downloadZip } = useFilesExport({
	getFileURL: (item) => getMediaUrl(item.id, false),
	fetch: () => {
		const items = selected.value.length ? selected.value : dataList.value;
		return {
			items,
		};
	},
	filename: `screenshots-callId-${callId.value}`,
});

const handleDeleteFromGalleria = () => {
	handleDelete([
		dataList.value[galleriaActiveIndex.value],
	]);
	if (galleriaActiveIndex.value > 0) galleriaActiveIndex.value -= 1;
};
</script>

<style scoped>
.table-title {
  padding-inline: var(--spacing-xs);
}
</style>