<template>
  <button class="cc-btn" type="button">
    <spinner v-if="loading"/>
    <slot v-else></slot>
  </button>
</template>

<script>
  import Spinner from './spinner.vue';

  export default {
    name: 'btn',
    components: { Spinner },
    props: {
      loading: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style lang="scss" scoped>
  .cc-btn {
    @extend .typo-btn;
    padding: (10px) (17px) (6px); // 11px and 7px vertical -2 px border
    color: #000;
    background: $default-btn-color;
    border: 1px solid transparent;
    border-radius: $border-radius;
    white-space: nowrap;
    transition: $transition;
    cursor: pointer;

    .spinner {
      color: #000;
    }

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
