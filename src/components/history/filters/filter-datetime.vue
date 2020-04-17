<template>
  <dt-picker
    :value="{
            from,
            to,
          }"
    @input="setDateTime"
  ></dt-picker>
</template>

<script>
  import DtPicker from '../../utils/datetimepicker.vue';
  import urlQueryControllerMixin from '../../../mixins/urlQueryControllerMixin';

  const msInMin = 60 * 10 ** 3;

  export default {
    name: 'datetime-filter',
    mixins: [urlQueryControllerMixin],
    components: {
      DtPicker,
    },

    data: () => ({
      from: Math.floor(Date.now() / msInMin) * msInMin,
      to: Math.floor(Date.now() / msInMin) * msInMin,
    }),

    created() {
      this.restoreFrom();
      this.restoreTo();
    },

    methods: {
      restoreFrom() {
        const queryValue = this.$route.query.from;
        const defaultValue = Math.floor(Date.now() / msInMin) * msInMin;
        this.from = +queryValue || defaultValue;
      },

      restoreTo() {
        const queryValue = this.$route.query.to;
        const defaultValue = Math.floor(Date.now() / msInMin) * msInMin;
        this.to = +queryValue || defaultValue;
      },

      setDateTime({ from, to }) {
        this.setQueryValue({
          filterQuery: 'from',
          value: from,
        });
        this.setQueryValue({
          filterQuery: 'to',
          value: to,
        });
      },
    },
  };
</script>

<style scoped>

</style>
