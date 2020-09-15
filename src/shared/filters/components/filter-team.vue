<template>
  <wt-select
    v-model="value"
    :label="$t('fields.team')"
    :track-by="trackBy"
    :search="fetch"
    :internal-search="false"
    :close-on-select="false"
    multiple
    @reset="setValueToQuery({ value, filterQuery, storedProp })"
    @closed="setValueToQuery({ value, filterQuery, storedProp })"
  ></wt-select>
</template>

<script>
  import apiFilterMixin from '@webitel/ui-sdk/src/mixins/dataFilterMixins/apiFilterMixin';
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
