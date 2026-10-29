<template>
  <section class="call-wave-playback-controls">
    <div class="call-wave-playback-controls__group">
      <wt-button
        v-for="rate of PLAYBACK_RATES"
        :key="rate"
        :color="rate === playbackRate ? 'primary' : 'secondary'"
        variant="outlined"
        @click="emit('toggle-rate', rate)"
      >
        x{{ rate }}
      </wt-button>
      <wt-button
        :color="isPlaying ? 'primary' : 'secondary'"
        variant="outlined"
        :icon="isPlaying ? 'pause' : 'play'"
        @click="emit('play-pause')"
      />
    </div>

    <div class="call-wave-playback-controls__group">
      <wt-button
        :disabled="zoomInDisabled"
        color="secondary"
        variant="outlined"
        icon="plus"
        @click="emit('zoom-in')"
      />
      <wt-button
        :disabled="zoomOutDisabled"
        color="secondary"
        variant="outlined"
        icon="minus"
        @click="emit('zoom-out')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
defineOptions({
	name: 'CallWavePlaybackControls',
});

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

const PLAYBACK_RATES = [
	2,
	1.5,
	0.75,
	0.5,
];
</script>

<style lang="scss" scoped>
.call-wave-playback-controls {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-sm);

  &__group {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }
}
</style>
