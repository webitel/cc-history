<template>
  <dt-picker
    v-model="value"
    :label="$t('components.dtPicker.from')"
    :preview-label="$t('components.dtPicker.dateTime')"
    @input="setQueryValue({ filterQuery, value: `${$event}` })"
    @lastHour="setComplexValue"
    @lastDay="setComplexValue"
  ></dt-picker>
</template>

<script>
  import DtPicker from '../utils/datetimepicker.vue';
  import valueFilterMixin from '../../mixins/filters/valueFilterMixin';
  import getTodayStart from '../../utils/getTodayStart';

  export default {
    name: 'filter-from',
    mixins: [valueFilterMixin],
    components: {
      DtPicker,
    },

    watch: {
      '$route.query.from': {
        handler() {
          this.restore({ filterQuery: this.filterQuery });
        },
      },
    },

    data: () => ({
      value: getTodayStart(),
      filterQuery: 'from',
    }),

    methods: {
      restoreValue({ value }) {
        this.value = +value;
      },
      setComplexValue({ from, to }) {
        this.setQueryValue({ filterQuery: this.filterQuery, value: `${from}` });
        this.setQueryValue({ filterQuery: 'to', value: `${to}` });
      },
    },
  };
</script>

<style scoped>

</style>
