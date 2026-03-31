<template>
  <wt-galleria 
    v-model:visible="isGalleriaVisible"
    v-model:active-index="galleriaActiveIndex"
    :value="screenshots"
    @delete="handleDelete"
  />
  <div class="screenshots-action-wrapper">
    <wt-icon-btn 
      icon="preview-tag-image"
      @click="openGalleria"
    />
    <span class="typo-body-1">{{ screenshots?.length || '-' }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { EngineCallFileType } from '@webitel/api-services/gen/models';
import { getMediaUrl, FileServicesAPI } from '@webitel/api-services/api';

interface Props {
	files: any;
}

const props = withDefaults(defineProps<Props>(), {
	files: () => ({}),
});

const screenshots = computed(
	() =>
		props.files?.[EngineCallFileType.FileTypeScreenshot]
			?.filter((item) => !deletedIds.value.includes(item.id))
			?.map((item) => ({
				id: item.id,
				src: getMediaUrl(item.id, false),
				thumbnailSrc: getMediaUrl(item.id, true),
				title: item.name,
				alt: item.name,
			})) || [],
);

const galleriaActiveIndex = ref(0);
const isGalleriaVisible = ref(false);

// ids list of screenshots deleted by galleria, needs for files list filtration
const deletedIds = ref([]);

const openGalleria = () => {
	if (!screenshots.value?.length) return;
	isGalleriaVisible.value = true;
};

const handleDelete = async () => {
	const deleteId = screenshots.value[galleriaActiveIndex.value].id;
	await FileServicesAPI.delete([
		deleteId,
	]);

	deletedIds.value.push(deleteId);
	if (galleriaActiveIndex.value > 0) galleriaActiveIndex.value -= 1;
};
</script>

<style scoped>
.screenshots-action-wrapper {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}
</style>