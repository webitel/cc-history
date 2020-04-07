<template>
  <header class="history-section history-heading">
    <h1 class="history-heading__h1">History</h1>
    <div class="history-heading__actions-wrap">
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
    name: 'history-heading',
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
  .history-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .history-heading__h1 {
    @extend .typo-heading-md;
  }

  .history-heading__actions-wrap {
    display: flex;
    align-items: center;

    .cc-btn {
      margin-left: calcRem(20px);
    }
  }
</style>
