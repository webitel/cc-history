<template>
  <wt-tooltip>
    <template v-slot:activator>
      <wt-icon-btn
        icon="bucket"
        @click="$emit('click')"
      ></wt-icon-btn>
    </template>
    {{ $t('reusable.delete') }}
  </wt-tooltip>
</template>

<script>
export default {
  name: 'stt-delete-action',
};
</script>

<style lang="scss" scoped>

</style>
