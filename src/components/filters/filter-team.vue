<template>
  <multiselect
    v-model="value"
    :fetch-method="fetch"
    :label="$t('fields.team')"
    :api-mode="apiMode"
    :track-by="trackBy"
    @closed="setQueryArray({ value, filterQuery, queriedProp })"
  ></multiselect>
</template>

<script>
  import apiFilterMixin from '../../mixins/filters/apiFilterMixin';
  import APIRepository from '../../api/APIRepository';

  const teamAPI = APIRepository.teams;

  export default {
    name: 'filter-team',
    mixins: [apiFilterMixin],

    data: () => ({
      filterQuery: 'team',
    }),

    methods: {
      fetch: teamAPI.getTeams,
      fetchSelected: teamAPI.getTeamsByIds,
    },
  };
</script>

<style scoped>

</style>
