<template>
  <section class="history-section history-filters-section">
    <filter-fields
      v-show="isFilterFieldsOpened"
      @close="isFilterFieldsOpened = false"
    ></filter-fields>
    <form class="history-filters" :class="{'history-filters--opened': isOpened}">
      <!--      dt pickers-->
      <filter-from class="history-filters__filter"/>
      <filter-to class="history-filters__filter"/>
      <!--      [ARRAY] type multi select-->
      <filter-type class="history-filters__filter"/>
      <!--      [ARRAY] direction multi select-->
      <filter-direction class="history-filters__filter"/>
      <!--     [ARRAY] [API FETCH] user multi select-->
      <filter-user class="history-filters__filter"/>
      <!--      [ARRAY] [API FETCH] gateway multi select-->
      <filter-gateway class="history-filters__filter"/>
      <!--      [ARRAY] [API FETCH] agent multi select-->
      <filter-agent class="history-filters__filter"/>
      <!--     [ARRAY]  [API FETCH] team multi select-->
      <filter-team class="history-filters__filter"/>
      <!--    [ARRAY]   [API FETCH] queue multi select-->
      <filter-queue class="history-filters__filter"/>
      <!--      duration inputs -->
      <filter-duration class="history-filters__filter"/>
      <!--     [ARRAY]  tags multi select-->
      <!--        <filter-tags/>-->
      <!--     [ARRAY]  hangup cause multi select-->
      <filter-cause class="history-filters__filter"/>
    </form>
    <table-actions
      settings
      refresh
      column-select
      filter-reset
      :is-settings-active="isOpened"
      @settings="expandFilters"
      @refresh="refreshData"
      @column-select="openColumnSelect"
      @filter-reset="resetFilters"
      @export="handleExport"
      @import="handleImport"
    ></table-actions>
  </section>
</template>

<script>
  import { mapActions } from 'vuex';
  import FilterFields from '../../filters/filter-table-fields.vue';
  import FilterFrom from '../../filters/filter-from.vue';
  import FilterTo from '../../filters/filter-to.vue';
  import FilterType from '../../filters/filter-type.vue';
  import FilterDirection from '../../filters/filter-direction.vue';
  import FilterUser from '../../filters/filter-user.vue';
  import FilterGateway from '../../filters/filter-gateway.vue';
  import FilterAgent from '../../filters/filter-agent.vue';
  import FilterTeam from '../../filters/filter-queue.vue';
  import FilterQueue from '../../filters/filter-team.vue';
  import FilterCause from '../../filters/filter-cause.vue';
  // import FilterTags from './filters/filter-tags.vue';
  import FilterDuration from '../../filters/filter-duration.vue';
  import TableActions from '../../utils/table-actions.vue';

  export default {
    name: 'the-history-filters',
    components: {
      FilterFields,
      FilterFrom,
      FilterTo,
      FilterType,
      FilterDirection,
      FilterUser,
      FilterGateway,
      FilterAgent,
      FilterTeam,
      FilterQueue,
      FilterCause,
      // FilterTags,
      FilterDuration,
      TableActions,
    },

    data: () => ({
      isOpened: false,
      isFilterFieldsOpened: false,
    }),

    methods: {
      ...mapActions('history', {
        loadDataList: 'LOAD_DATA_LIST',
      }),

      expandFilters() {
        this.isOpened = !this.isOpened;
      },
      refreshData() {
        this.loadDataList();
      },
      openColumnSelect() {
        this.isFilterFieldsOpened = true;
      },
      resetFilters() {
        this.$router.replace({ query: null });
      },
      handleExport() {
      },
      handleImport() {
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../../css/utils/bootstrap-grid.css";
  // 30px*2 outer paddings, 28px*2 inner paddings, 216px table actions with 4 buttons
  $width-except-filters: 60px + 56px + 216px;
  $filter-width: 300px;
  $filter-gap: 20px;
  @function filtersWidth($num) {
    // 1px corrects max width
    @return ($filter-width) * $num + $filter-gap * ($num - 1) + $width-except-filters - 1px;
  }

  .history-section.history-filters-section {
    display: flex;
    align-items: flex-start;
    padding: 18px 28px 0;
    margin: 20px 0;

    .table-actions {
      margin-top: 24px;
    }
  }

  .history-filters {
    flex: 1 1 auto;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: $filter-gap;

    @media (max-width: filtersWidth(5)) {
      grid-template-columns: repeat(4, 1fr);

      .history-filters__filter:nth-child(n+5) {
        display: none;
      }
    }

    @media (max-width: filtersWidth(4)) {
      grid-template-columns: repeat(3, 1fr);

      .history-filters__filter:nth-child(n+4) {
        display: none;
      }
    }

    @media (max-width: filtersWidth(3)) {
      grid-template-columns: repeat(2, 1fr);

      .history-filters__filter:nth-child(n+3) {
        display: none;
      }
    }

    @media (max-width: filtersWidth(2)) {
      grid-template-columns: repeat(1, 1fr);

      .history-filters__filter:nth-child(n+2) {
        display: none;
      }
    }

    &.history-filters--opened {
      .history-filters__filter {
        display: block;
      }
    }
  }

  .history-filters__filter {
    margin-bottom: (18px);

    &:nth-child(n+6) {
      display: none;
    }

    .dt-picker, .hs-multiselect {
      width: 100%;
    }
  }
</style>
