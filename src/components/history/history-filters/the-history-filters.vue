<template>
  <section class="history-section history-filters-section">
    <filter-fields
      v-show="isFilterFieldsOpened"
      @close="isFilterFieldsOpened = false"
    ></filter-fields>
    <form class="history-filters" :class="{'history-filters--opened': isOpened}">
      <filter-from class="history-filters__filter"/>
      <filter-to class="history-filters__filter"/>
      <filter-direction class="history-filters__filter"/>
      <filter-user class="history-filters__filter"/>
      <filter-gateway class="history-filters__filter"/>
      <filter-agent class="history-filters__filter"/>
      <filter-team class="history-filters__filter"/>
      <filter-queue class="history-filters__filter"/>
      <filter-duration class="history-filters__filter"/>
      <filter-tags class="history-filters__filter"/>
      <filter-cause class="history-filters__filter"/>
    </form>
    <wt-table-actions
      :icons="['refresh', 'column-select', 'filter-reset', 'settings']"
      @input="tableActionsHandler"
    ></wt-table-actions>
  </section>
</template>

<script>
  import { mapActions } from 'vuex';
  import FilterFields from '../history-main/registry/filters/filter-table-fields/filter-table-fields.vue';
  import FilterFrom from '../../../shared/filters/filter-from/filter-from.vue';
  import FilterTo from '../../../shared/filters/filter-to/filter-to.vue';
  // import FilterType from '../../../shared/filters/components/filter-type.vue';
  import FilterDirection from '../../../shared/filters/filter-direction/filter-direction.vue';
  import FilterUser from '../../../shared/filters/filter-user/filter-user.vue';
  import FilterGateway from '../../../shared/filters/filter-gateway/filter-gateway.vue';
  import FilterAgent from '../../../shared/filters/filter-agent/filter-agent.vue';
  import FilterTeam from '../../../shared/filters/filter-queues/filter-queue.vue';
  import FilterQueue from '../../../shared/filters/filter-teams/filter-team.vue';
  import FilterCause from '../../../shared/filters/filter-cause/filter-cause.vue';
  import FilterTags from '../../../shared/filters/filter-tags/filter-tags.vue';
  import FilterDuration from '../../../shared/filters/filter-duration/filter-duration.vue';
  import tableActionsHandlerMixin from '../../../mixins/tableActions/tableActionsHandlerMixin';

  export default {
    name: 'the-history-filters',
    mixins: [tableActionsHandlerMixin],
    components: {
      FilterFields,
      FilterFrom,
      FilterTo,
      // FilterType,
      FilterDirection,
      FilterUser,
      FilterGateway,
      FilterAgent,
      FilterTeam,
      FilterQueue,
      FilterCause,
      FilterTags,
      FilterDuration,
    },

    data: () => ({
      isOpened: false,
      isFilterFieldsOpened: false,
    }),

    methods: {
      ...mapActions({
        loadData: 'LOAD_DATA',
      }),
    },
  };
</script>

<style lang="scss" scoped>
  // 30px*2 outer paddings, 30px*2 inner paddings, 216px table actions with 4 buttons
  $width-except-filters: 60px + 60px + 176px;
  $filter-width: 300px;
  $filter-gap: 20px;
  @function filtersWidth($num) {
    // 1px corrects max width
    @return ($filter-width * $num) + ($filter-gap * ($num - 1)) + $width-except-filters - 1px;
  }

  .history-section.history-filters-section {
    display: flex;
    align-items: flex-start;

    .wt-table-actions {
      flex: 0 0 auto;
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
    margin-bottom: 18px;

    &:nth-child(n+6) {
      display: none;
    }
  }
</style>
