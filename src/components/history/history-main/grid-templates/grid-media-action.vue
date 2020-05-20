<template>
  <button class="media-select__btn icon-btn table-action">
    <icon v-if="!isAnyFilesPlaying">
      <svg class="icon icon-play_md md">
        <use xlink:href="#icon-play_md"></use>
      </svg>
    </icon>
    <icon v-else>
      <svg class="icon icon-pause_md md">
        <use xlink:href="#icon-pause_md"></use>
      </svg>
    </icon>
  </button>
</template>

<script>
  export default {
    name: 'grid-media-action',
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
