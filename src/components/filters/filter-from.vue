<template>
  <dt-picker
    v-model="value"
    :label="$t('components.dtPicker.from')"
    :preview-label="$t('components.dtPicker.dateTime')"
    @input="setQueryValue({ filterQuery, value: `${$event}` })"
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

    data: () => ({
      value: getTodayStart(),
      filterQuery: 'from',
    }),

    methods: {
      restoreValue({ value }) {
        this.value = +value;
      },
    },
  };
</script>

<style scoped>

</style>
