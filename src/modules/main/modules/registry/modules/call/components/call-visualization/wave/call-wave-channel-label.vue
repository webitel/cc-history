<template>
  <div
    class="call-wave-channel-label"
    :style="{ color }"
  >
    <wt-icon
      icon="contacts"
      size="sm"
    />
    <span>{{ name }}</span>
  </div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'CallWaveChannelLabel',
});

defineProps<{
	name: string;
	color: string;
}>();
</script>

<style scoped>
.call-wave-channel-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  box-sizing: border-box;
  min-height: 0;
  --icon-color: currentColor;
}
</style>
