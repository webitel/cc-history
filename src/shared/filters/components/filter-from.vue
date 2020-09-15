<template>
  <wt-datetimepicker
    v-model="value"
    :label="$t('components.dtPicker.from')"
    @change="setValueToQuery({ filterQuery, value: $event })"
  ></wt-datetimepicker>
</template>

<script>
import baseFilterMixin from '@webitel/ui-sdk/src/mixins/dataFilterMixins/baseFilterMixin/baseFilterMixin';

export default {
  name: 'filter-from',
  mixins: [baseFilterMixin],

  data: () => ({
    value: new Date().setHours(0, 0, 0, 0),
    filterQuery: 'from',
  }),

  methods: {
    restoreValue(value) {
      const dayStart = new Date().setHours(0, 0, 0, 0);
      this.value = +value || dayStart;
    },
  },
};
</script>

<style scoped>

</style>
