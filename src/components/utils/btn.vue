<template>
  <button class="cc-btn" type="button">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'btn',
  };
</script>

<style lang="scss" scoped>
  .cc-btn {
    @extend .typo-btn;
    padding: calcRem(10px) calcRem(17px) calcRem(6px); // 11px and 7px vertical -2 px border
    color: #000;
    background: $default-btn-color;
    border: 1px solid transparent;
    border-radius: $border-radius;
    white-space: nowrap;
    transition: $transition;
    cursor: pointer;

    &:hover {
      background: $default-btn-color__hover;
    }

    &.secondary {
      color: $secondary-btn-color;
      background: #fff;
      border: 1px solid $secondary-btn-color;

      &:hover {
        color: $secondary-btn-color__hover;
        border-color: $secondary-btn-color__hover;
      }
    }

    &.disabled {
      color: $btn-disabled;
      background: $btn-disabled;
    }
  }
</style>
