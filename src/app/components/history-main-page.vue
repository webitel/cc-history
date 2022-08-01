<template>
  <wt-page-wrapper>
    <template v-slot:header>
      <history-heading/>
    </template>
    <template v-slot:actions-panel>
      <history-filters/>
    </template>
    <template v-slot:main>
      <history-main/>
    </template>
  </wt-page-wrapper>
</template>

<script>
import HistoryFilters from '../../modules/filters/components/the-history-filters.vue';
import HistoryHeading from '../../modules/heading/components/the-history-heading.vue';
import HistoryMain from '../../modules/main/components/the-history-main.vue';

export default {
  name: 'history-main-page',
  components: {
    HistoryHeading,
    HistoryFilters,
    HistoryMain,
  },
};
</script>

<style lang="scss" scoped>

</style>
