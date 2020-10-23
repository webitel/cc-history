<template>
  <wt-select
    v-model="value"
    :options="options"
    :label="$t('dashboards.interval')"
    :track-by="trackBy"
    :clearable="false"
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

    created() {
      this.setDefaultValue();
    },
    methods: {
      setDefaultValue() {
        const defaultValue = IntervalOptions.find((interval) => interval.value === 'auto');
        const queryValue = this.getValueFromQuery({ filterQuery: this.filterQuery });
        if (!queryValue) {
          this.setValueToQuery({
            filterQuery: this.filterQuery,
            storedProp: this.storedProp,
            value: defaultValue.value,
          });
        }
      },
    },
  };
</script>

<style scoped>

</style>
