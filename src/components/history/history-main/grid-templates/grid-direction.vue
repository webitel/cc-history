<template>
  <div>
    <div v-if="item.direction === CallDirection.Inbound">
      <icon class="icon-wrap__inbound">
        <svg class="icon icon-inbound_md md">
          <use xlink:href="#icon-inbound_md"></use>
        </svg>
      </icon>
    </div>
    <div v-else-if="item.direction === CallDirection.Outbound">
      <icon class="icon-wrap__outbound">
        <svg class="icon icon-outbound_md md">
          <use xlink:href="#icon-outbound_md"></use>
        </svg>
      </icon>
    </div>
  </div>
</template>

<script>
  import { CallDirection } from 'webitel-sdk';

  export default {
    name: 'grid-direction',
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    data: () => ({
      CallDirection,
    }),
  };
</script>

<style lang="scss" scoped>


  .icon-wrap {
    /*margin: auto;*/

    &__inbound {
      .icon {
        fill: $inbound-icon-color;
        stroke: $inbound-icon-color;
      }
    }

    &__outbound {
      .icon {
        fill: $outbound-icon-color;
        stroke: $outbound-icon-color;
      }
    }
  }
</style>
