<template>
  <section class="history-section history-filters">
    <dt-picker/>
    <multiselect
      :options="options"
      :label="'Type'"
      :filter-query="'type'"
    ></multiselect>
  </section>
</template>

<script>
  import DtPicker from '../utils/datetimepicker.vue';
  import Multiselect from '../utils/multiselect.vue';

  export default {
    name: 'history-filters',
    components: {
      DtPicker,
      Multiselect,
    },

    data: () => ({
      options: [
        { name: 'aa', value: 'aa' }, { name: 'bb', value: 'bb' }, { name: 'cc', value: 'cc' },
      ],
    }),
  };
</script>

<style lang="scss" scoped>
  .history-filters {
    display: flex;
    margin: calcRem(20px) 0;
  }

  .hs-multiselect {
    margin-left: calcRem(50px);
  }
</style>
