<template>
  <div class="call-wave-hold-markers">
    <wt-tooltip
      v-for="marker of markers"
      :key="marker.key"
      class="call-wave-hold-markers__marker"
      :style="{ left: `${marker.leftPx}px` }"
    >
      <template #activator>
        <wt-icon
          class="call-wave-hold-markers__icon"
          icon="pause"
        />
      </template>
      {{ marker.durationLabel }}
    </wt-tooltip>
  </div>
</template>

<script setup lang="ts">
import type { HoldMarker } from './composables/useCallWaveHoldMarkers';

defineOptions({
	name: 'CallWaveHoldMarkers',
});

defineProps<{
	markers: HoldMarker[];
}>();
</script>

<style lang="scss" scoped>
.call-wave-hold-markers {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  // Above the wavesurfer regions container (z-index: 5), so icons get the pointer.
  z-index: 6;

  &__marker {
    position: absolute;
    top: 0;
    pointer-events: auto;
  }

  &__icon {
    --icon-color: var(--hold-color);
    cursor: default;
  }
}
</style>
