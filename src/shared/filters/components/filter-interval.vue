<template>
  <wt-select
    v-model="value"
    :options="options"
    :label="$t('dashboards.interval')"
    :track-by="trackBy"
    @reset="setValueToQuery({ value: value.value, filterQuery, storedProp })"
    @closed="setValueToQuery({ value: value.value, filterQuery, storedProp })"
  ></wt-select>
</template>

<script>
  import enumFilterMixin from '@webitel/ui-sdk/src/mixins/dataFilterMixins/enumFilterMixin';

  const IntervalOptions = Object.freeze([
    { name: '15 min', value: '15 min' },
    { name: '30 min', value: '30 min' },
    { name: '1 hour', value: '1 hour' },
    { name: '3 hours', value: '3 hour' },
    { name: '6 hours', value: '6 hour' },
    { name: '12 hours', value: '12 hour' },
    { name: '1 day', value: '1 day' },
    { name: '2 days', value: '2 day' },
    { name: '1 week', value: '1 week' },
    { name: '2 weeks', value: '2 week' },
    { name: '1 month', value: '1 month' },
    { name: '3 month', value: '3 month' },
    { name: '6 month', value: '6 month' },
    { name: '1 year', value: '1 year' },
  ]);
  export default {
    name: 'filter-interval',
    mixins: [enumFilterMixin],

    data: () => ({
      options: IntervalOptions,
      filterQuery: 'interval',
      storedProp: 'value',
    }),
  };
</script>

<style scoped>

</style>
