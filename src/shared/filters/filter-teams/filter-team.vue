<template>
  <wt-select
    :value="value"
    :label="$t('fields.team')"
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
    search: teamAPI.getLookup,
    fetchSelected: async (ids) => {
      const params = { size: ids.length, ids };
      const selected = await teamAPI.getLookup(params);
      return selected.items;
    },
  },
};
</script>

<style scoped>

</style>
