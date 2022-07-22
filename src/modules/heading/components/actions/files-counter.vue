<template>
  <div class="files-counter">
    <div>
      {{ $t('headerSection.filesLoaded') }}
      <span class="files-counter__count">
        {{ downloadProgress }}
      </span>
    </div>
    <div v-show="zippingProgress">
      {{ $t('headerSection.zippingProgress') }}
      <span class="files-counter__count">
        {{ zippingProgress }}%
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'files-counter',
  props: {
    downloadProgress: {
      type: Number,
    },
    zippingProgress: {
      type: Number,
    },
  },
};
</script>

<style lang="scss" scoped>
.files-counter {
  @extend %typo-caption;
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 10px;
  padding: 10px 15px;
  border-radius: var(--border-radius);
  background: var(--main-color);
  box-shadow: var(--box-shadow);

  &__count {
    @extend %typo-caption;
  }
}
</style>
