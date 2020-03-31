<template>
  <div class="body">
    <main class="stats-container">
      <notification/>
      <stats-heading/>
      <stats-filters/>
      <stats-main/>
    </main>
  </div>
</template>

<script>
  import Notification from '../utils/notification.vue';
  import StatsHeading from './stats-heading.vue';
  import StatsFilters from './stats-filters.vue';
  import StatsMain from './stats-main.vue';

  export default {
    name: 'the-statistics',
    components: {
      Notification,
      StatsHeading,
      StatsFilters,
      StatsMain,
    },
  };
</script>

<style lang="scss" scoped>

</style>
