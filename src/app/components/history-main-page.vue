<template>
  <wt-page-wrapper>
    <template #header>
      <history-heading />
    </template>
    <template #actions-panel>
      <history-filters />
    </template>
    <template #main>
      <history-main />
    </template>
  </wt-page-wrapper>
</template>

<script>
// import HistoryFilters from '../../modules/filters/components/the-history-filters.vue';
import HistoryFilters from '../../modules/filters/components/v2/the-history-filters.vue';
import HistoryHeading from '../../modules/heading/components/the-history-heading.vue';
import HistoryMain from '../../modules/main/components/the-history-main.vue';

export default {
  name: 'HistoryMainPage',
  components: {
    HistoryHeading,
    HistoryFilters,
    HistoryMain,
  },
};
</script>

<style lang="scss" scoped>

</style>
