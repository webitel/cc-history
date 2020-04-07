<template>
  <section class="history-section history-filters">
    <dt-picker/>
  </section>
</template>

<script>
  import DtPicker from '../utils/datetimepicker.vue';

  export default {
    name: 'history-filters',
    components: {
      DtPicker,
    },
  };
</script>

<style lang="scss" scoped>
  .history-filters {
    margin: calcRem(20px) 0;
  }
</style>
