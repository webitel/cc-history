<template>
  <wt-select
    :value="value"
    :label="$t('fields.team')"
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

const teamAPI = APIRepository.teams;

export default {
  name: 'filter-team',
  mixins: [apiFilterMixin],

  data: () => ({
    filterQuery: 'team',
  }),

  computed: {
    ...mapState('filters', {
      value: (state) => state.team.value,
      storedProp: (state) => state.team.storedProp,
      multiple: (state) => state.team.multiple,
    }),
  },
  methods: {
    ...mapActions('filters', {
      setValue: 'SET_FILTER',
    }),
    search: teamAPI.getTeams,
    fetchSelected: teamAPI.getTeamsByIds,
  },
};
</script>

<style scoped>

</style>
