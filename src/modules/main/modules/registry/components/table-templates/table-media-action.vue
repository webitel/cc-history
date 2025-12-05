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
    <template #option="{ text, id }">
      <div class="table-media-action__option">
        <wt-icon
          :icon="id === currentlyPlaying ? 'stop' : 'play'"
        />
        {{ text }}
      </div>
    </template>
  </wt-context-menu>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue';

interface Props {
  files: unknown[],
  currentlyPlaying?: string,
}

const props = withDefaults(defineProps<Props>(), {
  currentlyPlaying: '',
});

const emit = defineEmits<{
  (e: 'play', fileId: string): void;
  (e: 'stop'): void;
}>();

const isAnyFilesPlaying = computed(() => props.files.some((file) => file.id === props.currentlyPlaying));
const contextOptions = computed(() => props.files.map(({ name, id, mimeType }) => ({
  text: name,
  id,
  mimeType,
})));

const handleOptionSelect = ({ option }) => {
  if (props.currentlyPlaying === option.id) {
    emit('stop');
  } else {
    emit('play', option.id);
  }
};
</script>

<style lang="scss" scoped>
.table-media-action__option {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}
</style>
