<template>
  <wt-pagination
    v-model="size"
    :next="isNext"
    :prev="isPrev"
    debounce
    @next="next"
    @prev="prev"
    @change="sizeChange"
  ></wt-pagination>
</template>

<script>
import paginationFilterMixin from '@webitel/ui-sdk/src/mixins/dataFilterMixins/paginationFilterMixin';

export default {
  name: 'filter-pagination',
  mixins: [paginationFilterMixin],
};
</script>

<style scoped>

</style>
