<template>
  <multiselect
    v-model="value"
    :fetch-method="fetch"
    :label="'Queue'"
    :api-mode="apiMode"
    :track-by="trackBy"
    @closed="setQueryArray({ value, filterQuery, queriedProp })"
  ></multiselect>
</template>

<script>
  import apiFilterMixin from '../../mixins/filters/apiFilterMixin';
  import { fetchQueues, getSelectedQueues } from '../../api/filter-getters/queueFilter';

  export default {
    name: 'filter-queue',
    mixins: [apiFilterMixin],

    data: () => ({
      filterQuery: 'queue',
    }),

    methods: {
      fetch: fetchQueues,
      fetchSelected: getSelectedQueues,
    },
  };
</script>

<style scoped>

</style>
