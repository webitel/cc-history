<template>
  <wt-select
    :value="value"
    :options="options"
    :label="$t('dashboards.interval')"
    :track-by="storedProp"
    :multiple="multiple"
    :clearable="false"
    @input="setInterval"
    @reset="setValueToQuery({ value: value.value, filterQuery, storedProp })"
    @closed="setValueToQuery({ value: value.value, filterQuery, storedProp })"
  ></wt-select>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import enumFilterMixin from '@webitel/ui-sdk/src/modules/QueryFilters/mixins/enumFilterMixin';
import IntervalOptions from './IntervalOptions.enum';

export default {
  name: 'filter-interval',
  mixins: [enumFilterMixin],

  data: () => ({
    options: IntervalOptions,
    filterQuery: 'interval',
  }),

  computed: {
    ...mapState('dashboards', {
      value: (state) => state.intervalFilter.value,
      storedProp: (state) => state.intervalFilter.storedProp,
      multiple: (state) => state.intervalFilter.multiple,
    }),
  },
  methods: {
    ...mapActions('dashboards', {
      setInterval: 'SET_INTERVAL',
    }),
    setValue({ value }) {
      this.setInterval(value);
    },
  },
};
</script>

<style scoped>

</style>
