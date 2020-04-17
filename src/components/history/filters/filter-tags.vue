<template>
  <multiselect
    v-model="value"
    :fetch-method="fetch"
    :label="'Team'"
    :api-mode="apiMode"
    :track-by="trackBy"
    @closed="setQueryArray({ value, filterQuery, queriedProp })"
  ></multiselect>
</template>

<script>
  import apiFilterMixin from '../../../mixins/filters/apiFilterMixin';
  import { fetchTeams, getSelectedTeams } from '../../../api/filter-getters/teamFilter';

  export default {
    name: 'filter-team',
    mixins: [apiFilterMixin],

    data: () => ({
      filterQuery: 'team',
    }),

    methods: {
      fetch: fetchTeams,
      fetchSelected: getSelectedTeams,
    },
  };
</script>

<style scoped>

</style>
