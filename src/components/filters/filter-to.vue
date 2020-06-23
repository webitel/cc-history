<template>
  <dt-picker
    v-model="value"
    :label="$t('components.dtPicker.to')"
    :preview-label="$t('components.dtPicker.dateTime')"
    @input="setQueryValue({ filterQuery, value: `${$event}` })"
  ></dt-picker>
</template>

<script>
  import DtPicker from '../utils/datetimepicker.vue';
  import valueFilterMixin from '../../mixins/filters/valueFilterMixin';

  const msInMin = 60 * 10 ** 3;

  export default {
    name: 'filter-to',
    mixins: [valueFilterMixin],
    components: {
      DtPicker,
    },

    data: () => ({
      value: Math.floor(Date.now() / msInMin) * msInMin,
      filterQuery: 'to',
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
