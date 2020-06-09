<template>
  <multiselect
    v-model="value"
    :fetch-method="fetch"
    :label="$t('fields.gateway')"
    :api-mode="apiMode"
    :track-by="trackBy"
    @closed="setQueryArray({ value, filterQuery, queriedProp })"
  ></multiselect>
</template>

<script>
  import apiFilterMixin from '../../mixins/filters/apiFilterMixin';
  import { fetchGateways, getSelectedGateways } from '../../api/filter-getters/gatewayFilter';

  export default {
    name: 'filter-gateway',
    mixins: [apiFilterMixin],

    data: () => ({
      filterQuery: 'gateway',
    }),

    methods: {
      fetch: fetchGateways,
      fetchSelected: getSelectedGateways,
    },
  };
</script>

<style scoped>

</style>
