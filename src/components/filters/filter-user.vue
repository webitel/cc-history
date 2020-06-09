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
  import { fetchUsers, getSelectedUsers } from '../../api/filter-getters/userFilter';

  export default {
    name: 'filter-user',
    mixins: [apiFilterMixin],

    data: () => ({
      filterQuery: 'user',
    }),

    methods: {
      fetch: fetchUsers,
      fetchSelected: getSelectedUsers,
    },
  };
</script>

<style scoped>

</style>
