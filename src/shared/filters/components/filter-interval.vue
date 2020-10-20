<template>
  <wt-select
    v-model="value"
    :options="options"
    :label="$t('mainSection.dashboards.interval')"
    :track-by="trackBy"
    @reset="setValueToQuery({ value: value.value, filterQuery, storedProp })"
    @closed="setValueToQuery({ value: value.value, filterQuery, storedProp })"
  ></wt-select>
</template>

<script>
  import enumFilterMixin from '@webitel/ui-sdk/src/mixins/dataFilterMixins/enumFilterMixin';
  import IntervalOptions from '../api/IntervalOptions.enum';

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
