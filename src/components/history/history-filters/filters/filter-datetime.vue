<template>
  <dt-picker
    :value="value"
    @input="setDateTime"
  ></dt-picker>
</template>

<script>
  import DtPicker from '../../../utils/datetimepicker.vue';
  import valueFilterMixin from '../../../../mixins/filters/valueFilterMixin';

  const msInMin = 60 * 10 ** 3;

  export default {
    name: 'datetime-filter',
    mixins: [valueFilterMixin],
    components: {
      DtPicker,
    },

    data: () => ({
      value: {
        from: Math.floor(Date.now() / msInMin) * msInMin,
        to: Math.floor(Date.now() / msInMin) * msInMin,
      },
    }),

    created() {
      this.restoreFrom();
      this.restoreTo();
    },

    methods: {
      restoreFrom() {
        const queryValue = this.$route.query.from;
        const defaultValue = Math.floor(Date.now() / msInMin) * msInMin;
        this.value.from = +queryValue || defaultValue;
      },

      restoreTo() {
        const queryValue = this.$route.query.to;
        const defaultValue = Math.floor(Date.now() / msInMin) * msInMin;
        this.value.to = +queryValue || defaultValue;
      },

      setDateTime(value) {
        this.value = value;

        this.setQueryValue({
          filterQuery: 'from',
          value: `${value.from}`,
        });
        this.setQueryValue({
          filterQuery: 'to',
          value: `${value.to}`,
        });
      },
    },
  };
</script>

<style scoped>

</style>
