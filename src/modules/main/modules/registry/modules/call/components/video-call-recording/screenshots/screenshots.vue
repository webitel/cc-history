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
      <h3 class="table-title__title">
        {{ t('objects.screenshots', 2) }}
      </h3>
      <wt-action-bar
        :include="[IconAction.DOWNLOAD_PDF, IconAction.DELETE]"
        :disabled:delete="!selected.length"
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
      <!-- {{ selected }} -->
      <wt-table
        v-show="dataList.length && !isLoading"
        v-model:selected="selected"
        :data="dataList"
        :headers="headers"
        sortable
        @update:selected="updateSelected"
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
          {{ item.formattedDate }}
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
import { FileServicesAPI } from '@webitel/api-services/api';
import {
  downloadFile,
  getMediaUrl,
} from '@webitel/api-services/api';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { IconAction } from '@webitel/ui-sdk/enums';
import { EngineCallFileType } from '@webitel/api-services/gen/models';
import { useStore } from 'vuex';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { headers } from './store/headers/headers.ts';
import { formatDate } from '@webitel/ui-sdk/utils';
import { FormatDateMode } from '@webitel/ui-sdk/enums';

interface Props {
  call: any,
  namespace?: string,
}

const props = withDefaults(defineProps<Props>(), {
  call: () => [],
  namespace: '',
});

const store = useStore();

const isLoading = computed(() => {
  return getNamespacedState(store.state, props.namespace).isLoading;
});

const dataList = computed(() => {
  const files = props.call?.files?.[EngineCallFileType.FileTypeScreenshot] || [];
  return files.map(item => ({
    ...item,
    formattedDate: item.startAt ? formatDate(+item.startAt, FormatDateMode.DATETIME) : ''
  }));
})

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

const updateSelected = (value) => {
  console.log(value);
  // selected.value = value.map((item) => item.id);
};

const handleDelete = async (items: []) => {
  const deleteIds = items.map((item) => item.id);
  console.log(deleteIds);

  // await FileServicesAPI.delete(deleteIds);

};

const handleDeleteFromGalleria = () => {
  // handleDelete([dataList.value[galleriaActiveIndex.value]]);
  if (galleriaActiveIndex.value > 0) galleriaActiveIndex.value -= 1;
};
</script>

<style scoped lang="scss">
@use '@webitel/styleguide/typography' as *;

.table-title {
  padding-inline: var(--spacing-xs);
}

.table-title__title {
  @extend %typo-heading-4;
}
</style>