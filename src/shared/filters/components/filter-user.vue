<template>
  <wt-select
    v-model="value"
    :label="$t('fields.user')"
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
