<template>
  <pagination
    v-model="size"
    :is-next="isNext"
    :is-prev="isPrev"
    @next="next"
    @prev="prev"
    @changeSize="sizeChange"
  ></pagination>
</template>

<script>
  import Pagination from '../../../utils/table-pagination.vue';
  import valueFilterMixin from '../../../../mixins/filters/valueFilterMixin';

  export default {
    name: 'filter-pagination',
    mixins: [valueFilterMixin],
    components: {
      Pagination,
    },

    props: {
      isNext: {
        type: Boolean,
        default: true,
      },
    },

    data: () => ({
      page: '1',
      size: '10',
    }),

    computed: {
      isPrev() {
        return +this.page > 1;
      },
    },

    methods: {
      restore() {
        this.restorePage();
        this.restoreSize();
      },

      restorePage() {
        this.page = this.parseQueryValue({ filterQuery: 'page' }) || this.page;
      },

      restoreSize() {
        this.size = this.parseQueryValue({ filterQuery: 'size' }) || this.size;
      },

      next() {
        const value = `${+this.page + 1}`;
        this.page = value;
        this.setQueryValue({
          filterQuery: 'page',
          value,
        });
      },

      prev() {
        const value = `${+this.page - 1}`;
        this.page = value;
        this.setQueryValue({
          filterQuery: 'page',
          value,
        });
      },

      sizeChange(value) {
        this.setQueryValue({
          filterQuery: 'size',
          value,
        });
      },
    },
  };
</script>

<style scoped>

</style>
