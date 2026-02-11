<template>
  <wt-icon-btn
    v-tooltip="$t('reusable.delete')"
    icon="bucket"
    @click="$emit('click')"
  />
</template>

<script>
export default {
	name: 'SttDeleteAction',
};
</script>

<style lang="scss" scoped>

</style>
