<template>
  <button class="icon-btn">
    <icon>
      <svg class="icon" :class="size">
        <use :xlink:href="`#icon-${icon}_${size}`"></use>
      </svg>
    </icon>
    <tooltip v-if="tooltip">{{tooltip}}</tooltip>
  </button>
</template>

<script>
  import Tooltip from './tooltip.vue';

  export default {
    name: 'icon-btn',
    components: {
      Tooltip,
    },
    props: {
      icon: {
        type: String,
        required: true,
      },
      size: {
        type: String,
        default: 'md',
      },
      tooltip: {
        type: String,
      },
    },
  };
</script>

<style lang="scss" scoped>
  .icon-btn {
    position: relative;
    .tooltip {
      top: calc(100% + 11px); // icon height + 11px margin
      left: 50%;
      transform: translateX(-50%);
    }

    &:hover .tooltip {
      opacity: 1;
      pointer-events: auto;
    }
  }
</style>
