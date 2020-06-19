<template>
  <multiselect
    v-model="value"
    :fetch-method="fetch"
    :label="$t('fields.user')"
    :api-mode="apiMode"
    :track-by="trackBy"
    @closed="setQueryArray({ value, filterQuery, queriedProp })"
  ></multiselect>
</template>

<script>
  import apiFilterMixin from '../../mixins/filters/apiFilterMixin';
  import APIRepository from '../../api/APIRepository';

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
