<template>
  <div class="files-counter">
    <div class="files-counter__line-wrapper">
      {{ $t('headerSection.filesLoaded') }}
      <span class="files-counter__count">
        {{ downloadProgress }}
      </span>
    </div>
    <div
      v-show="zippingProgress"
      class="files-counter__line-wrapper"
    >
      {{ $t('headerSection.zippingProgress') }}
      <span class="files-counter__count">
        {{ zippingProgress }}%
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilesCounter',
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
@use '@webitel/ui-sdk/src/css/main' as *;

.files-counter {
  @extend %typo-caption;
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 10px;
  padding: 10px 15px;
  border-radius: var(--border-radius);
  background: var(--content-wrapper-color);
  box-shadow: var(--box-shadow);

  &__line-wrapper {
    display: flex;
    align-items: center;
  }

  &__count {
    @extend %typo-caption;
  }
}
</style>
