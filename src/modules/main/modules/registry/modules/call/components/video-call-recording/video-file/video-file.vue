<template>
  <section class="video-file">
    <delete-confirmation-popup
      :shown="isDeleteConfirmationPopup"
      :callback="deleteCallback"
      :delete-count="deleteCount"
      @close="closeDelete"
    />

    <div class="video-file__header">
      <span class="video-file__title">
        {{ t('registry.call.videoFile') }}
      </span>
      <div class="video-file__actions">
        <wt-icon-btn
          icon="download"
          :disabled="!currentVideo"
          @click="downloadFile(currentVideo.id)"
        />
        <wt-icon-btn
          icon="bucket"
          :disabled="!currentVideo"
          @click="
            askDeleteConfirmation({
            deleted: [currentVideo],
            callback: () => handleDelete(),
          })"
        />
      </div>
    </div>
    <wt-select 
      v-model="currentVideo"
      :options="dataList"
      :placeholder="t('vocabulary.file')"
      :clearable="false"
    />
    <div class="video-file__player">
      <wt-empty 
        v-if="!currentVideo"
        :image="darkMode ? EmptyVideoDark : EmptyVideo"
        :title="t('registry.call.noVideoFile')"
        style="width: auto;"
      />
      <wt-vidstack-player
        v-else
        static
        :size="ComponentSize.LG"
        :src="currentVideoUrl"
        :title="currentVideo.name"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { FileServicesAPI } from '@webitel/api-services/api';
import { useI18n } from 'vue-i18n';
import EmptyVideo from './_internals/assets/empty-video.svg'
import EmptyVideoDark from './_internals/assets/empty-video-dark.svg'
import { computed, inject, ref } from 'vue';
import { EngineCallFile } from '@webitel/api-services/gen/models';
import { downloadFile,getMediaUrl } from '@webitel/api-services/api';
import { ComponentSize } from '@webitel/ui-sdk/enums';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';

interface Props {
  files?: EngineCallFile[]
}

const props = withDefaults(defineProps<Props>(), {
  files: [],
});

const { t } = useI18n();

const darkMode = inject('darkMode');

const dataList = ref(props.files || []);

const currentVideo = ref<EngineCallFile | null>(dataList.value[0] ?? null);

const currentVideoUrl = computed(() => {
  return currentVideo.value ? getMediaUrl(currentVideo.value.id) : '';
})

const {
  isVisible: isDeleteConfirmationPopup,
  deleteCount,
  deleteCallback,

  askDeleteConfirmation,
  closeDelete,
} = useDeleteConfirmationPopup();

const handleDelete = async () => {
  await FileServicesAPI.delete([currentVideo.value?.id]);

  dataList.value = dataList.value.filter((item) => item.id !== currentVideo.value?.id);
  if (dataList.value.length) { 
    currentVideo.value = dataList.value[0];
  } else {
    currentVideo.value = null;
  }
}
</script>

<style lang="scss" scoped>
@use '@webitel/ui-sdk/src/css/main' as *;

.video-file__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-xs);
  margin-bottom: var(--spacing-xs);
}

.video-file__title {
  @extend %typo-heading-4;
}

.video-file__actions {
  display: flex;
  gap: var(--spacing-xs);
}

.video-file__player {
  display: flex;
  width: 100%;
  aspect-ratio: var(--p-player-wrapper-sm-aspect-ratio);
  margin-top: var(--spacing-sm);
}
</style>