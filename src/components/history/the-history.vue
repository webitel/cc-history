<template>
  <div class="the-history">
    <app-header/>
    <wt-notifications-bar/>
    <wt-page-wrapper>
      <template slot="header">
        <history-heading/>
      </template>
      <template slot="actions-panel">
        <history-filters/>
      </template>
      <template slot="main">
        <history-main/>
      </template>
    </wt-page-wrapper>
  </div>
</template>

<script>
import AppHeader from './shared/app-header/app-header.vue';
import HistoryHeading from './history-heading/the-history-heading.vue';
import HistoryFilters from './history-filters/the-history-filters.vue';
import HistoryMain from './history-main/the-history-main.vue';

export default {
  name: 'the-history',
  components: {
    AppHeader,
    HistoryHeading,
    HistoryFilters,
    HistoryMain,
  },
};
</script>

<style lang="scss" scoped>
.the-history {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
