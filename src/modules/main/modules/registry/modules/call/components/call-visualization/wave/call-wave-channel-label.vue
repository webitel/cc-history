<template>
  <div class="call-wave-channel-label">
    <wt-icon
      icon="user"
      :color="color"
    />
    <span>{{ name }}</span>
  </div>
</template>

<script setup lang="ts">
import type { IconColor } from '@webitel/ui-sdk/enums';

defineOptions({
	name: 'CallWaveChannelLabel',
});

defineProps<{
	name: string;
	color: IconColor;
}>();
</script>

<style scoped>
.call-wave-channel-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  box-sizing: border-box;
  min-height: 0;
}
</style>
