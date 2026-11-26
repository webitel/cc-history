<template>
  <header class="table-title">
    <h3 class="table-title__title">
      {{ t('objects.screenRecordings', 2) }}
    </h3>
    <wt-action-bar
      :include="[IconAction.DOWNLOAD, IconAction.DELETE]"
      :disabled:delete="!selected.length || !hasDeleteAccess"
      @click:download="downloadArchive"
      @click:delete="
        askDeleteConfirmation({
          deleted: selected,
          callback: () => deleteRecordings(selected),
        })
      "
    >
      <template #download="{ action, onClick }">
        <wt-loader
          v-if="isDownloadingArchive"
          :size="ComponentSize.SM"
        />
        <wt-icon-action
          v-else
          :action="action"
          :disabled="!dataList.length"
          @click="onClick"
        />
      </template>
    </wt-action-bar>
  </header>

  <delete-confirmation-popup
    :shown="isDeleteConfirmationPopup"
    :callback="deleteCallback"
    :delete-count="deleteCount"
    @close="closeDelete"
  />

  <screen-recordings
    v-model:selected="selected"
    :data-list="dataList"
    :is-loading="isLoading"
    :has-delete-access="hasDeleteAccess"
    @delete="
      askDeleteConfirmation({
        deleted: [$event],
        callback: () => deleteRecordings([$event]),
      })
    "
  />
</template>

<script setup lang="ts">
import { useDownloadAction } from '@webitel/ui-sdk/composables';
import { ComponentSize, IconAction } from '@webitel/ui-sdk/enums';
import {
	downloadScreenRecordingsArchive,
	ScreenRecordings,
	useCallScreenRecordings,
} from '@webitel/ui-sdk/modules/ScreenRecordings';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';

import { useScreenRecordingsAccess } from '../../../../../composables/useScreenRecordingsAccess';

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

const callId = computed(() => {
	if (props.call?.id != null) return String(props.call.id);

	const id = getNamespacedState(store.state, props.namespace).mainCallId;
	return id == null ? '' : String(id);
});

const { dataList, isLoading, selected, deleteRecordings } =
	useCallScreenRecordings({
		callId,
	});

const { hasDeleteAccess } = useScreenRecordingsAccess();

const { isLoading: isDownloadingArchive, runDownload } = useDownloadAction();

const downloadArchive = () =>
	runDownload(() =>
		downloadScreenRecordingsArchive({
			callId: callId.value,
			selected: selected.value,
		}),
	);

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,

	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();
</script>

<style scoped>
.table-title {
  padding-inline: var(--spacing-xs);
}
</style>
