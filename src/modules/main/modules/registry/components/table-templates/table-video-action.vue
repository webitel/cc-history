<template>
  <div class="table-video-action__title-wrapper">
    <wt-context-menu
      class="table-video-action"
      :options="contextOptions"
      max-width="400px"
      @click="handleOptionSelect"
    >
      <template #activator="{ toggle }">
        <wt-icon-btn
          v-if="contextOptions?.length"
          icon="preview-tag-video"
          @click="toggle"
        />
      </template>
      <template #option="{ text }">
        <div class="table-video-action__option">
          <wt-icon
            icon="preview-tag-video"
          />
          {{ text }}
        </div>
      </template>
    </wt-context-menu>
    <p>
      {{ contextOptions?.length || EMPTY_SYMBOL }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { EMPTY_SYMBOL } from '@webitel/ui-sdk/utils';
import { computed, defineEmits, defineProps } from 'vue';

import { MediaType } from './types/mediaAction';
import { getRecordingType } from './utils/getRecordingType.ts';

interface Props {
  files: unknown[],
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'set-video', val: unknown): void;
}>();

const contextOptions = computed(() => props?.files?.map(({ name, id, mimeType }) => ({
  text: name,
  id,
  mimeType,
})).filter((option) => getRecordingType(option.mimeType) === MediaType.Video));


const handleOptionSelect = ({ option }) => {
  if (option.id && getRecordingType(option.mimeType) === MediaType.Video) {
    emit('set-video', option)
    return;
  }
};
</script>

<style lang="scss" scoped>

.table-video-action__title-wrapper {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.table-video-action__option {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}
</style>
