<template>
  <wt-search-bar
    :value="value"
    debounce
    @input="setValue({ filter: filterQuery, value: $event })"
    @search="setValueToQuery({ filterQuery, value })"
  />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import baseFilterMixin from '@webitel/ui-sdk/src/modules/QueryFilters/mixins/baseFilterMixin/baseFilterMixin';

export default {
  name: 'filter-search',
  mixins: [baseFilterMixin],

  data: () => ({
    filterQuery: 'search',
  }),

  computed: {
    ...mapState('filters', {
      value: (state) => state.search.value,
    }),
  },

  methods: {
    ...mapActions('filters', {
      setValue: 'SET_FILTER',
    }),
    restoreValue(value) {
      this.setValue({ filter: this.filterQuery, value });
    },
  },
};
</script>

<style scoped>

</style>
