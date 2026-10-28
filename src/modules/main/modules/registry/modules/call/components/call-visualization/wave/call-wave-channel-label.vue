<template>
  <div
    class="call-wave-channel-label"
    :style="{ color }"
  >
    <svg
      width="16"
      height="16"
      fill="currentColor"
    ><use xlink:href="#contacts" /></svg>
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
}
</style>
