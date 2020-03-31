<template>
  <header class="stats-heading">
    <h1>Statistics</h1>
    <div class="stats-heading__actions-wrap">
      <search v-model="search"/>
      <btn class="secondary">Download</btn>
      <btn class="primary">Export CSV</btn>
    </div>
  </header>
</template>

<script>
  import Search from '../utils/search-input.vue';
  import Btn from '../utils/btn.vue';

  export default {
    name: 'stats-heading',
    components: {
      Search,
      Btn,
    },

    data: () => ({
      search: '',
    }),
  };
</script>

<style lang="scss" scoped>
  .stats-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: calcRem(12px) calcRem(28px);
    border-radius: $border-radius;
  }

  .stats-heading__actions-wrap {
    display: flex;
    align-items: center;

    .cc-btn {
      margin-left: calcRem(20px);
    }
  }
</style>
