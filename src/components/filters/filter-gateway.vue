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
  import APIRepository from '../../api/APIRepository';

  const gatewayAPI = APIRepository.gateways;

  export default {
    name: 'filter-gateway',
    mixins: [apiFilterMixin],

    data: () => ({
      filterQuery: 'gateway',
    }),

    methods: {
      fetch: gatewayAPI.getGateways,
      fetchSelected: gatewayAPI.getGatewaysByIds,
    },
  };
</script>

<style scoped>

</style>
