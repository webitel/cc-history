<template>
  <div class="table-page">
    <section class="table-section">
      <header class="table-title">
        <h3 class="table-title__title">
          {{ t('objects.screenRecordings', 2) }}
        </h3>
        <wt-action-bar
          :include="[IconAction.REFRESH, IconAction.DELETE]"
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
          :data="dataList"
          :headers="headers"
          sortable
          v-model:selected="selected"
        >
          <template #screenRecordings="{ item }">
            <wt-image 
              width="48px" 
              overlay-icon="play" 
              :src="getScreenRecordingMediaUrl(item.id, true)" 
              alt="" />
          </template>

          <template #dateTime="{item}">
              {{prettifyTimestamp(item)}}
          </template>

          <template #recordingDuration="{item}">
            {{ calcDuration(item) }}
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
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { useRegistryStore } from '../../../../../store/new/registry.store.js';
import { useStore } from 'vuex';
import { IconAction } from '@webitel/ui-sdk/enums';
import { WtEmpty } from '@webitel/ui-sdk/components';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { useI18n } from 'vue-i18n';
import { headers } from './store/headers/headers.js';
import { FileServicesAPI } from '@webitel/api-services/api';
import { downloadFile, getScreenRecordingMediaUrl } from '@webitel/api-services/api'; 
import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';

const props = defineProps({
  namespace: {
    type: String,
  },
})

const store = useStore();

const { t } = useI18n();

const dataList = computed(() => {
  return getNamespacedState(store.state, props.namespace).screenRecordingsFiles
});

const error = ref('')

const selected = ref([])

const isLoading = computed(() => {
  return getNamespacedState(store.state, props.namespace).isLoading
});

const loadDataList = () => {
  store.dispatch(`${props.namespace}/LOAD_MAIN_CALL`);
};

const prettifyTimestamp = (item) => new Date(+item.startAt).toLocaleString()

const calcDuration = (item) => convertDuration(+item.stopAt - +item.startAt)

const handleDelete = async (items: []) => {
  const deleteIds = items.map(item => item.id)
  try {
    FileServicesAPI.delete(deleteIds);
  } finally {
    loadDataList();
  }
}

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
</script>