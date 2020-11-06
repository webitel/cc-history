<template>
  <wt-select
    :value="value"
    :label="$t('fields.agent')"
    :track-by="storedProp"
    :multiple="multiple"
    :search="search"
    :internal-search="false"
    :close-on-select="false"
    @input="setValue({ filter: filterQuery, value: $event })"
    @reset="setValueToQuery({ value, filterQuery, storedProp })"
    @closed="setValueToQuery({ value, filterQuery, storedProp })"
  ></wt-select>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import apiFilterMixin from '@webitel/ui-sdk/src/mixins/dataFilterMixins/apiFilterMixin';
import APIRepository from '../../../api/APIRepository';

const agentAPI = APIRepository.agents;

export default {
  name: 'filter-agent',
  mixins: [apiFilterMixin],

  data: () => ({
    filterQuery: 'agent',
  }),

  computed: {
    ...mapState('filters', {
      value: (state) => state.agent.value,
      storedProp: (state) => state.agent.storedProp,
      multiple: (state) => state.agent.multiple,
    }),
  },

  methods: {
    ...mapActions('filters', {
      setValue: 'SET_FILTER',
    }),
    search: agentAPI.getAgents,
    fetchSelected: agentAPI.getAgentsByIds,
  },
};
</script>

<style scoped>

</style>
