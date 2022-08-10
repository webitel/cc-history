<template>
  <wt-tooltip>
    <template v-slot:activator>
      <wt-icon-btn
        icon="stt-download"
        @click="$emit('click')"
      ></wt-icon-btn>
    </template>
    {{ $t('registry.stt.downloadTxt') }}
  </wt-tooltip>
</template>

<script>
export default {
  name: 'stt-download-action',
};
</script>

<style lang="scss" scoped>

</style>
