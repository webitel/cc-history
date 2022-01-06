<template>
  <column-select
    :value="headers"
    @change="change"
    @close="close"
  ></column-select>
</template>

<script>
import { mapActions } from 'vuex';
import baseFilterMixin from '@webitel/ui-sdk/src/modules/QueryFilters/mixins/baseFilterMixin/baseFilterMixin';
import ColumnSelect from '../../../../../utils/table-column-select.vue';
import historyHeadersMixin from '../../../../../../mixins/history/registry/historyHeadersMixin';

export default {
  name: 'filter-table-fields',
  mixins: [
    baseFilterMixin,
    historyHeadersMixin,
  ],
  components: {
    ColumnSelect,
  },

  data: () => ({
    filterQuery: 'fields',
    storedProp: 'value',
  }),

  methods: {
    ...mapActions('query-controller', {
      setValueToQuery: 'SET_VALUE_TO_QUERY',
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
      const queryValue = this.getValueFromQuery({ filterQuery });
      const storageValue = this.getFromLocalStorage({ filterQuery });
      if (!queryValue && storageValue) {
        this.setValueToQuery({ filterQuery, value: storageValue, storedProp: this.storedProp });
      }
      if (queryValue || storageValue) {
        this.restoreValue(queryValue || storageValue);
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
      };
      this.setValueToQuery(params);
      this.setToLocalStorage(params);
      this.setHeaders(headers);
    },

    getFromLocalStorage({ filterQuery }) {
      const value = localStorage.getItem(filterQuery);
      return value ? value.split(',').map((item) => item) : '';
    },

    // copy-pasted params from "setQueryArray method
    // for easier future refactors, if method should be abstract
    setToLocalStorage({
                        filterQuery,
                        value,
                        storedProp = 'value',
                      }) {
      const filter = value.map((item) => item[storedProp]);
      localStorage.setItem(filterQuery, filter);
    },
  },
};
</script>

<style scoped>

</style>
