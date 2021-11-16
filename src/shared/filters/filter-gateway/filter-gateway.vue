<template>
  <wt-select
    :value="value"
    :label="$t('fields.gateway')"
    :track-by="storedProp"
    :multiple="multiple"
    :search-method="search"
    :close-on-select="false"
    @input="setValue({ filter: filterQuery, value: $event })"
    @reset="setValueToQuery({ value, filterQuery, storedProp })"
    @closed="setValueToQuery({ value, filterQuery, storedProp })"
  ></wt-select>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import apiFilterMixin from '@webitel/ui-sdk/src/modules/QueryFilters/mixins/apiFilterMixin';
import APIRepository from '../../../api/APIRepository';

const gatewayAPI = APIRepository.gateways;

export default {
  name: 'filter-gateway',
  mixins: [apiFilterMixin],

  data: () => ({
    filterQuery: 'gateway',
  }),

  computed: {
    ...mapState('filters', {
      value: (state) => state.gateway.value,
      storedProp: (state) => state.gateway.storedProp,
      multiple: (state) => state.gateway.multiple,
    }),
  },

  methods: {
    ...mapActions('filters', {
      setValue: 'SET_FILTER',
    }),
    search: gatewayAPI.getLookup,
    fetchSelected: async (ids) => {
      const params = { size: ids.length, ids };
      const selected = await gatewayAPI.getLookup(params);
      return selected.items;
    },
  },
};
</script>

<style scoped>

</style>
