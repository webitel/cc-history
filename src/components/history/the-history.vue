<template>
  <div class="body">
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
  import HistoryHeading from './history-heading.vue';
  import HistoryFilters from './history-filters.vue';
  import HistoryMain from './history-main.vue';

  export default {
    name: 'the-history',
    components: {
      Notification,
      HistoryHeading,
      HistoryFilters,
      HistoryMain,
    },
  };
</script>

<style lang="scss" scoped>
  .history-container {
    display: flex;
    flex-direction: column;
    padding: calcRem(20px) calcRem(30px) calcRem(60px);
    background: $page-bg-color;
  }
</style>
