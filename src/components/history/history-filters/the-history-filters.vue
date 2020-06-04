<template>
  <section class="history-section history-filters">
    <filter-fields
      v-show="isFilterFieldsOpened"
      @close="isFilterFieldsOpened = false"
    ></filter-fields>
    <form class="history-filters__filters">
      <!--      dt picker-->
      <div class="col-md-12 col-lg-8 col-xl-6">
        <filter-datetime/>
      </div>
      <!--      [ARRAY] type multi select-->
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{
          'd-md-none': !isOpened,
          'd-lg-block': !isOpened,
        }"
      >
        <filter-type/>
      </div>
      <!--      [ARRAY] direction multi select-->
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{
                'd-md-none': !isOpened,
                'd-lg-none': !isOpened,
                'd-xl-block': !isOpened
              }"
      >
        <filter-direction/>
      </div>
      <!--     [ARRAY] [API FETCH] user multi select-->
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{
                'd-md-none': !isOpened,
              }"
      >
        <filter-user/>
      </div>
      <!--      [ARRAY] [API FETCH] gateway multi select-->
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-md-none': !isOpened}"
      >
        <filter-gateway/>
      </div>
      <!--      [ARRAY] [API FETCH] agent multi select-->
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-md-none': !isOpened}"
      >
        <filter-agent/>
      </div>
      <!--     [ARRAY]  [API FETCH] team multi select-->
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-md-none': !isOpened}"
      >
        <filter-team/>
      </div>
      <!--    [ARRAY]   [API FETCH] queue multi select-->
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-md-none': !isOpened}"
      >
        <filter-queue/>
      </div>
      <!--      duration inputs -->
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-md-none': !isOpened}"
      >
        <filter-duration/>
      </div>
      <!--     [ARRAY]  tags multi select-->
      <!--      <div-->
      <!--        class="col-md-6 col-lg-4 col-xl-3"-->
      <!--        :class="{'d-md-none': !isOpened}"-->
      <!--      >-->
      <!--        <filter-tags/>-->
      <!--      </div>-->
      <!--     [ARRAY]  hangup cause multi select-->
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-md-none': !isOpened}"
      >
        <filter-cause/>
      </div>
    </form>
    <table-actions
      settings
      column-select
      filter-reset
      export-btn
      import-btn
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
  import FilterFields from '../../filters/filter-table-fields.vue';
  import FilterDatetime from '../../filters/filter-datetime.vue';
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
      FilterDatetime,
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
      expandFilters() {
        this.isOpened = !this.isOpened;
      },
      refreshData() {
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

  .history-filters {
    display: flex;
    align-items: flex-start;
    padding: (18px) (28px);
    margin: (20px) 0;

    &__filters {
      flex: 1 1 auto;
      display: flex;
      flex-wrap: wrap;

      .dt-picker {
        width: 100%;
      }

      .hs-multiselect {
        width: 100%;
      }

      .dt-picker, .hs-multiselect {
        /*margin-right: (50px);*/
        margin-bottom: (18px);
      }
    }

    .table-actions {
      margin-top: 48px;
    }
  }
</style>
