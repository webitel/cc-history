<template>
  <wt-select
    v-model="value"
    :label="$t('fields.user')"
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

  const userAPI = APIRepository.users;

  export default {
    name: 'filter-user',
    mixins: [apiFilterMixin],

    data: () => ({
      filterQuery: 'user',
    }),

    methods: {
      fetch: userAPI.getUsers,
      fetchSelected: userAPI.getUsersByIds,
    },
  };
</script>

<style scoped>

</style>
