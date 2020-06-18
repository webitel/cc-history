<template>
  <multiselect
    v-model="value"
    :fetch-method="fetch"
    :label="$t('fields.agent')"
    :api-mode="apiMode"
    :track-by="trackBy"
    @closed="setQueryArray({ value, filterQuery, queriedProp })"
  ></multiselect>
</template>

<script>
  import apiFilterMixin from '../../mixins/filters/apiFilterMixin';
  import APIRepository from '../../api/APIRepository';

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
