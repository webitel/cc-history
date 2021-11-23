<template>
  <abstract-enum-filter
    :filter-query="filter.filterQuery"
    :namespace="namespace"
  ></abstract-enum-filter>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AbstractEnumFilter from '@webitel/ui-sdk/src/modules/QueryFilters/components/abstract-enum-filter.vue';
import IntervalOptions from './IntervalOptions.enum';

export default {
  name: 'filter-interval',
  components: { AbstractEnumFilter },
  data: () => ({
    options: IntervalOptions,
    filterQuery: 'interval',
    namespace: 'dashboards',
  }),
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
