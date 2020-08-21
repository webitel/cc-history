<template>
  <div class="body">
    <app-header/>
    <main class="history-container">
      <wt-notifications-bar/>
      <history-heading/>
      <history-filters/>
      <history-main/>
    </main>
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
  .body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .history-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 20px 30px;
    background: var(--main-page-bg-color);
  }
</style>
