<template>
  <wt-select
    :value="value"
    :label="$t('fields.user')"
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

const userAPI = APIRepository.users;

export default {
  name: 'filter-user',
  mixins: [apiFilterMixin],

  data: () => ({
    filterQuery: 'user',
  }),

  computed: {
    ...mapState('filters', {
      value: (state) => state.user.value,
      storedProp: (state) => state.user.storedProp,
      multiple: (state) => state.user.multiple,
    }),
  },
  methods: {
    ...mapActions('filters', {
      setValue: 'SET_FILTER',
    }),
    search: userAPI.getLookup,
    fetchSelected: async (ids) => {
      const params = { size: ids.length, ids };
      const selected = await userAPI.getLookup(params);
      return selected.items;
    },
  },
};
</script>

<style scoped>

</style>
