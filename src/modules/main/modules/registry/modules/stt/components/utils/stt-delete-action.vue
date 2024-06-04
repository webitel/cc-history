<template>
  <wt-tooltip>
    <template #activator>
      <wt-icon-btn
        icon="bucket"
        @click="$emit('click')"
      />
    </template>
    {{ $t('reusable.delete') }}
  </wt-tooltip>
</template>

<script>
export default {
  name: 'SttDeleteAction',
};
</script>

<style lang="scss" scoped>

</style>
