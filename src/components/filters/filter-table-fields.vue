<template>
  <column-select
    :value="headers"
    @change="change"
    @close="close"
  ></column-select>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import baseFilterMixin from '../../shared/filters/mixins/baseFilterMixin/baseFilterMixin';
  import ColumnSelect from '../utils/table-column-select.vue';

  export default {
    name: 'filter-table-fields',
    mixins: [baseFilterMixin],
    components: {
      ColumnSelect,
    },

    data: () => ({
      filterQuery: 'fields',
      separator: ',',
      storedProp: 'value',
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

      // overrides baseFilterMixin method
      restore({ filterQuery }) {
        let value = this.getValueFromQuery({ filterQuery });
        if (!value) {
          // if no value in url, check in localStorage
          value = this.getFromLocalStorage({ filterQuery });
        }
        if (value) {
          // if there's a value, set it to url and to component data
          this.setValueToQuery({ filterQuery, value });
          this.restoreValue(value);
        }
      },

      restoreValue(value) {
        const headers = this.headers.map((header) => ({
          ...header,
          show: !!value.includes(header.value),
        }));
        this.setHeaders(headers);
      },

      setValue(headers) {
        const value = headers.filter((item) => item.show);
        const params = {
          filterQuery: this.filterQuery,
          value,
          storedProp: this.storedProp,
          separator: this.separator,
        };
        this.setValueArrayToQuery(params);
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
                          storedProp = 'id',
                          separator = '|',
                        }) {
        const filter = value.map((item) => item[storedProp])
          .join(separator);
        localStorage.setItem(filterQuery, filter);
      },
    },
  };
</script>

<style scoped>

</style>
