<template>
  <wt-search-bar
    v-model="value"
    debounce
    @search="setValueToQuery({ filterQuery, value })"
  />
</template>

<script>
  import baseFilterMixin from '@webitel/ui-sdk/src/mixins/dataFilterMixins/baseFilterMixin/baseFilterMixin';

  export default {
    name: 'filter-search',
    mixins: [baseFilterMixin],

    data: () => ({
      value: '',
      filterQuery: 'search',
    }),

    methods: {
      restoreValue(value) {
        this.value = value;
      },
    },
  };
</script>

<style scoped>

</style>
