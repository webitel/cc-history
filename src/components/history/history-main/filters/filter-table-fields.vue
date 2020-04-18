<template>
  <column-select
    :value="headers"
    @change="setValue"
  ></column-select>
</template>

<script>
  import ColumnSelect from '../../../utils/table-column-select.vue';
  import valueFilterMixin from '../../../../mixins/filters/valueFilterMixin';

  export default {
    name: 'filter-table-fields',
    mixins: [valueFilterMixin],
    components: {
      ColumnSelect,
    },
    props: {
      headers: {
        type: Array,
        required: true,
      },
    },

    data: () => ({
      filterQuery: 'fields',
      separator: ',',
      queriedProp: 'value',
    }),

    model: {
      prop: 'headers',
      event: 'change',
    },

    methods: {
      restoreValue({ value }) {
        const headers = this.headers.map((header) => ({
          ...header,
          show: !!value.includes(header.value),
        }));
        this.$emit('change', headers);
      },

      setValue(headers) {
        const value = headers.filter((item) => item.show);
        this.setQueryArray({
          filterQuery: this.filterQuery,
          value,
          queriedProp: this.queriedProp,
          separator: this.separator,
        });
        this.$emit('change', headers);
      },
    },
  };
</script>

<style scoped>

</style>
