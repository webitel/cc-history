<template>
  <wt-icon-btn
    v-tooltip="$t('registry.stt.downloadTxt')"
    icon="stt-download"
    @click="$emit('click')"
  />
</template>

<script>
export default {
  name: 'SttDownloadAction',
};
</script>

<style lang="scss" scoped>

</style>
