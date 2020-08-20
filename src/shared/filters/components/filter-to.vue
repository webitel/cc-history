<template>
  <wt-datetimepicker
    v-model="value"
    :label="$t('components.dtPicker.to')"
    @change="setValueToQuery({ filterQuery, value: $event })"
  ></wt-datetimepicker>
</template>

<script>
import baseFilterMixin from '../mixins/baseFilterMixin/baseFilterMixin';

const msInMin = 60 * 10 ** 3;

export default {
  name: 'filter-to',
  mixins: [baseFilterMixin],

  data: () => ({
    value: Math.floor(new Date().setHours(23, 59, 59) / msInMin) * msInMin,
    filterQuery: 'to',
  }),

  methods: {
    restoreValue(value) {
      const dayEnd = new Date().setHours(23, 59, 59, 999);
      this.value = +value || dayEnd;
    },
  },
};
</script>

<style scoped>

</style>
