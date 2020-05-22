<template>
  <div class="body">
    <cc-header/>
    <main class="history-container">
      <notification/>
      <history-heading/>
      <history-filters/>
      <history-main/>
    </main>
  </div>
</template>

<script>
  import Notification from '../utils/notification.vue';
  import CcHeader from '../cc-header/cc-header.vue';
  import HistoryHeading from './history-heading/the-history-heading.vue';
  import HistoryFilters from './history-filters/the-history-filters.vue';
  import HistoryMain from './history-main/the-history-main.vue';

  export default {
    name: 'the-history',
    components: {
      Notification,
      CcHeader,
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
    padding: (20px) (30px) (60px);
    background: $page-bg-color;
  }
</style>
