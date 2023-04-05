<template>
  <section class="history-section history-filters-section">
    <filter-fields
      v-show="isFilterFieldsOpened"
      @close="isFilterFieldsOpened = false"
    ></filter-fields>
    <form class="history-filters" :class="{'history-filters--opened': isOpened}">
      <filter-from class="history-filters__filter"/>
      <filter-to class="history-filters__filter"/>
      <component
        class="history-filters__filter"
        v-for="(filter, key) of filters"
        :key="key"
        :is="`abstract-${filter.type}-filter`"
        :filter-query="filter.filterQuery"
        :namespace="namespace"
      ></component>
      <filter-duration class="history-filters__filter"/>
<!--      <filter-total-duration class="history-filters__filter"/>-->
      <filter-from-to
        class="history-filters__filter"
        :filter-query="'duration'"
        :label="$t('fields.duration')"/>
      <filter-score class="history-filters__filter"/>
    </form>
    <wt-table-actions
      :icons="['refresh', 'column-select', 'filter-reset', 'settings']"
      @input="tableActionsHandler"
    ></wt-table-actions>
  </section>
</template>

<script>

  import { mapActions } from 'vuex';
  import AbstractApiFilter from '@webitel/ui-sdk/src/modules/QueryFilters/components/abstract-api-filter.vue';
  import AbstractEnumFilter from '@webitel/ui-sdk/src/modules/QueryFilters/components/abstract-enum-filter.vue';
  import FilterFields from '../../main/modules/registry/modules/filters/components/filter-table-fields/filter-table-fields.vue';
  import FilterFrom from './filters/filter-from.vue';
  import FilterTo from './filters/filter-to.vue';
  import FilterDuration from './filters/filter-duration.vue';
  import tableActionsHandlerMixin from '../mixins/tableActions/tableActionsHandlerMixin';
  import FilterTotalDuration from './filters/filter-total-duration.vue';
  import FilterScore from './filters/filter-score.vue';

  export default {
    name: 'the-history-filters',
    mixins: [tableActionsHandlerMixin],
    components: {
      FilterScore,
      FilterTotalDuration,
      AbstractApiFilter,
      AbstractEnumFilter,
      FilterFields,
      FilterFrom,
      FilterTo,
      FilterDuration,
    },

    data: () => ({
      isOpened: false,
      isFilterFieldsOpened: false,
      filters: [
        { type: 'enum', filterQuery: 'direction' },
        { type: 'api', filterQuery: 'user' },
        { type: 'api', filterQuery: 'gateway' },
        { type: 'api', filterQuery: 'agent' },
        { type: 'api', filterQuery: 'team' },
        { type: 'api', filterQuery: 'queue' },
        { type: 'api', filterQuery: 'grantee' },
        { type: 'enum', filterQuery: 'tags' },
        { type: 'enum', filterQuery: 'cause' },
        { type: 'enum', filterQuery: 'amdResult' },
        { type: 'enum', filterQuery: 'hasFile' },
        { type: 'enum', filterQuery: 'hasTranscription' },
        { type: 'api', filterQuery: 'ratedBy' },
        { type: 'enum', filterQuery: 'rated' },
      ],
      namespace: 'filters',
    }),

    methods: {
      ...mapActions({
        loadData: 'LOAD_DATA',
        resetFilters: 'RESET_FILTERS',
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
