<template>
  <wt-select
    v-model="value"
    :label="$t('fields.agent')"
    :track-by="trackBy"
    :search="fetch"
    :internal-search="false"
    :close-on-select="false"
    multiple
    @reset="setValueArrayToQuery({ value, filterQuery, storedProp })"
    @closed="setValueArrayToQuery({ value, filterQuery, storedProp })"
  ></wt-select>
</template>

<script>
  import apiFilterMixin from '../mixins/apiFilterMixin';
  import APIRepository from '../../../api/APIRepository';

  const agentAPI = APIRepository.agents;

  export default {
    name: 'filter-agent',
    mixins: [apiFilterMixin],

    data: () => ({
      filterQuery: 'agent',
    }),

    methods: {
      fetch: agentAPI.getAgents,
      fetchSelected: agentAPI.getAgentsByIds,
    },
  };
</script>

<style scoped>

</style>
