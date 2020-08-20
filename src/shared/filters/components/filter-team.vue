<template>
  <wt-select
    v-model="value"
    :label="$t('fields.team')"
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
