<template>
  <wt-table-column-select
    class="filter-table-fields"
    :headers="headers"
    :static-headers="staticHeaders"
    @change="change"
    />
  <wt-variable-column-select
    :headers="headers"
    :static-headers="staticHeaders"
    @change="change"
  />
</template>

<script>
import baseFilterMixin from '@webitel/ui-sdk/src/modules/QueryFilters/mixins/baseFilterMixin/baseFilterMixin';
import WtVariableColumnSelect from '../../../../../../../filters/components/wt-variable-column-select.vue';
import historyHeadersMixin from '../../../../mixins/historyHeadersMixin';

export default {
  name: 'filter-table-fields',
  components: { WtVariableColumnSelect },
  mixins: [
    baseFilterMixin,
    historyHeadersMixin,
  ],
  props: {
    staticHeaders: {
      type: Array,
    },
  },

  data: () => ({
    filterQuery: 'fields',
    storedProp: 'value',
  }),

  methods: {
    change(headers) {
      //TODO: WIP
      const coundryObj = {
        value: 'variables.Country',
        show: true,
        sort: null,
        field: 'variables.Country',
      };
      const qq = {
        value: 'amdResult',
        show: true,
        sort: null,
        field: 'amd_result',
      };
      if (!headers.includes(coundryObj)) {
        headers.push(coundryObj);
        headers.push(qq);
      }
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
