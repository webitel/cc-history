<template>
  <section class="call-wave-playback-controls">
    <div class="call-wave-playback-controls__group">
      <wt-button
        v-for="rate of Object.values(PlaybackRate)"
        :key="rate"
        :color="rate === playbackRate ? ButtonColor.PRIMARY : ButtonColor.SECONDARY"
        variant="outlined"
        @click="emit('toggle-rate', rate)"
      >
        x{{ rate }}
      </wt-button>
      <wt-button
        :color="isPlaying ? ButtonColor.PRIMARY : ButtonColor.SECONDARY"
        variant="outlined"
        :icon="isPlaying ? 'pause' : 'play'"
        @click="emit('play-pause')"
      />
    </div>

    <div class="call-wave-playback-controls__group">
      <wt-button
        :disabled="zoomInDisabled"
        :color="ButtonColor.SECONDARY"
        variant="outlined"
        icon="zoom-in"
        @click="emit('zoom-in')"
      />
      <wt-button
        :disabled="zoomOutDisabled"
        :color="ButtonColor.SECONDARY"
        variant="outlined"
        icon="zoom-out"
        @click="emit('zoom-out')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ButtonColor } from '@webitel/ui-sdk/enums';

import { PlaybackRate } from './call-wave.types';

defineProps<{
	playbackRate: number;
	isPlaying: boolean;
	zoomInDisabled: boolean;
	zoomOutDisabled: boolean;
}>();

const emit = defineEmits<{
	(event: 'toggle-rate', value: number): void;
	(event: 'play-pause'): void;
	(event: 'zoom-in'): void;
	(event: 'zoom-out'): void;
}>();
</script>

<style lang="scss" scoped>
.call-wave-playback-controls {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-xs);
  padding: var(--spacing-2xs);

  &__group {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
  }
}
</style>
