<template>
  <wt-tooltip>
    <template #activator>
      <wt-icon-btn
        icon="stt-download"
        @click="$emit('click')"
      />
    </template>
    {{ $t('registry.stt.downloadTxt') }}
  </wt-tooltip>
</template>

<script>
export default {
  name: 'SttDownloadAction',
};
</script>

<style lang="scss" scoped>

</style>
