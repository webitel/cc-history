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
  data: () => ({
    unsubscribeFilterChangeCallback: null,
  }),
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
    subscribeFilterChange() {
      this.unsubscribeFilterChangeCallback = this.$store.subscribeAction((({ type }) => {
        const triggerResetPageAtTypes = ['filters/SET_FILTER', 'registry/SET_SIZE'];
        if (triggerResetPageAtTypes.includes(type) && this.page !== 1) {
          this.resetPage();
        }
      }));
    },
    unsubscribeFilterChange() {
      this.unsubscribeFilterChangeCallback();
    },
  },

  mounted() {
    this.subscribeFilterChange();
  },
  unmounted() {
    this.unsubscribeFilterChange();
  },
};
</script>

<style scoped>

</style>
