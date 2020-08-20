<template>
  <wt-select
    v-model="value"
    :label="$t('fields.gateway')"
    :track-by="trackBy"
    :search="fetch"
    :close-on-select="false"
    :internal-search="false"
    multiple
    @reset="setValueArrayToQuery({ value, filterQuery, storedProp })"
    @closed="setValueArrayToQuery({ value, filterQuery, storedProp })"
  ></wt-select>
</template>

<script>
  import apiFilterMixin from '../mixins/apiFilterMixin';
  import APIRepository from '../../../api/APIRepository';

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
