<template>
  <wt-pagination
    :size="size"
    :next="isNext"
    :prev="isPrev"
    debounce
    @next="next"
    @prev="prev"
    @input="setSize"
    @change="sizeChange"
  ></wt-pagination>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import paginationFilterMixin from '@webitel/ui-sdk/src/modules/QueryFilters/mixins/paginationFilterMixin';

export default {
  name: 'filter-pagination',
  mixins: [paginationFilterMixin],

  computed: {
    ...mapState('registry', {
      page: (state) => state.page,
      size: (state) => state.size,
    }),
  },

  methods: {
    ...mapActions('registry', {
      setPage: 'SET_PAGE',
      setSize: 'SET_SIZE',
    }),
  },
};
</script>

<style scoped>

</style>
