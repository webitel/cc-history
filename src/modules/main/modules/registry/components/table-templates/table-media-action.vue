<template>
  <wt-context-menu
    class="table-media-action"
    :options="contextOptions"
    max-width="400px"
    @click="handleOptionSelect"
  >
    <template #activator="{ toggle }">
      <wt-icon-btn
        :icon="isAnyFilesPlaying ? 'stop': 'play'"
        @click="toggle"
      />
    </template>
    <template #option="{ text, id, mimeType }">
      <div class="table-media-action__option">
        <wt-icon
          :icon="id === currentlyPlaying ? 'stop' : 'play'"
        />
        {{ text }}
        {{ getRecordingType(mimeType) }}
      </div>
    </template>
  </wt-context-menu>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue';

import { MediaType } from './types/mediaAction';
import generateMediaURL from './utils/generateMediaURL';

interface Props {
  files: unknown[],
  currentlyPlaying?: string,
}

const props = withDefaults(defineProps<Props>(), {
  currentlyPlaying: '',
});

const isAnyFilesPlaying = computed(() => props.files.some((file) => file.id === props.currentlyPlaying));
const contextOptions = computed(() => props.files.map(({ name, id, mimeType }) => ({
  text: name,
  id,
  mimeType,
})));

const handleOptionSelect = ({ option }) => {
  if (option.id && getRecordingType(option.mimeType) === MediaType.VIDEO) {
    window.open(generateMediaURL(option.id), '_blank');
    return;
  }

  if (props.currentlyPlaying === option.id) {
    emit('stop');
  } else {
    emit('play', option.id);
  }
};
const getRecordingType = (mimeType: string): MediaType => {
  if (mimeType.startsWith('audio/')) {
    return MediaType.AUDIO;
  } else if (mimeType.startsWith('video/')) {
    return MediaType.VIDEO;
  }
  return MediaType.UNKNOWN;
};
</script>

<style lang="scss" scoped>
.table-media-action__option {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}
</style>
