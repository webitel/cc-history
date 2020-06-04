<template>
  <column-select
    :value="headers"
    @change="change"
    @close="close"
  ></column-select>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import ColumnSelect from '../utils/table-column-select.vue';
  import valueFilterMixin from '../../mixins/filters/valueFilterMixin';

  export default {
    name: 'filter-table-fields',
    mixins: [valueFilterMixin],
    components: {
      ColumnSelect,
    },

    data: () => ({
      filterQuery: 'fields',
      separator: ',',
      queriedProp: 'field',
    }),

    computed: {
      ...mapState('history', {
        headers: (state) => state.headers,
      }),
    },

    methods: {
      ...mapActions('history', {
        setHeaders: 'SET_HEADERS',
      }),

      change(headers) {
        this.setValue(headers);
        this.close();
      },

      close() {
        this.$emit('close');
      },

      // overrides valueFilterMixin method
      restore({ filterQuery }) {
        let value = this.$route.query[filterQuery];
        if (!value) {
          // if no value in url, check in localStorage
          value = this.getFromLocalStorage({ filterQuery });
        }
        if (value) {
          // if there's a value, set it to url and to component data
          this.setQueryValue({ filterQuery, value });
          this.restoreValue({ value });
        }
      },

      restoreValue({ value }) {
        const headers = this.headers.map((header) => ({
          ...header,
          show: !!value.includes(header.field),
        }));
        this.setHeaders(headers);
      },

      setValue(headers) {
        const value = headers.filter((item) => item.show);
        const params = {
          filterQuery: this.filterQuery,
          value,
          queriedProp: this.queriedProp,
          separator: this.separator,
        };
        this.setQueryArray(params);
        this.setToLocalStorage(params);
        this.setHeaders(headers);
      },

      getFromLocalStorage({ filterQuery }) {
        return localStorage.getItem(filterQuery);
      },

      // copy-pasted params from "setQueryArray method
      // for easier future refactors, if method should be abstract
      setToLocalStorage({
                          filterQuery,
                          value,
                          queriedProp = 'id',
                          separator = '|',
                        }) {
        const filter = value.map((item) => item[queriedProp])
          .join(separator);
        localStorage.setItem(filterQuery, filter);
      },
    },
  };
</script>

<style scoped>

</style>
