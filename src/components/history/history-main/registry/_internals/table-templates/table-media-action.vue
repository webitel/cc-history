<template>
  <wt-icon-btn
    :icon="isAnyFilesPlaying ? 'stop': 'play'"
    @click="$emit('click', $event)"
  >
  </wt-icon-btn>
</template>

<script>

export default {
  name: 'table-media-action',
  props: {
    isAnyFilesPlaying: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>

</style>
