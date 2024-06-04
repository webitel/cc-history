<template>
  <wt-icon
    :icon="callStateIcon"
    :color="callStateIconColor"
  />
</template>

<script>
  import { CallDirection } from 'webitel-sdk';

  export default {
    name: 'TableDirection',
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    computed: {
      callStateIcon() {
        if (this.item.direction === CallDirection.Inbound) return 'call-inbound';
        if (this.item.direction === CallDirection.Outbound) return 'call-outbound';
        return '';
      },
      callStateIconColor() {
        switch (this.callStateIcon) {
          case 'call-inbound': return 'warning';
          case 'call-outbound': return 'success';
          default: return '';
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>
