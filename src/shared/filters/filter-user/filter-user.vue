<template>
  <wt-select
    :value="value"
    :label="$t('fields.user')"
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
    search: (search) => userAPI.getUsers({ search }),
    fetchSelected: userAPI.getUsersByIds,
  },
};
</script>

<style scoped>

</style>
