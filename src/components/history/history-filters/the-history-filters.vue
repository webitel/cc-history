<template>
  <section class="history-section history-filters-section">
    <filter-fields
      v-show="isFilterFieldsOpened"
      @close="isFilterFieldsOpened = false"
    ></filter-fields>
    <form class="history-filters">
      <!--      dt picker-->
<!--      <div class="col-md-12 col-lg-8 col-xl-6">-->
        <filter-from/>
        <filter-to/>
<!--      </div>-->
      <!--      [ARRAY] type multi select-->
<!--      <div-->
<!--        class="col-md-6 col-lg-4 col-xl-3"-->
<!--        :class="{-->
<!--          'd-md-none': !isOpened,-->
<!--          'd-lg-block': !isOpened,-->
<!--        }"-->
<!--      >-->
        <filter-type/>
<!--      </div>-->
      <!--      [ARRAY] direction multi select-->
<!--      <div-->
<!--        class="col-md-6 col-lg-4 col-xl-3"-->
<!--        :class="{-->
<!--                'd-md-none': !isOpened,-->
<!--                'd-lg-none': !isOpened,-->
<!--                'd-xl-block': !isOpened-->
<!--              }"-->
<!--      >-->
        <filter-direction/>
<!--      </div>-->
      <!--     [ARRAY] [API FETCH] user multi select-->
<!--      <div-->
<!--        class="col-md-6 col-lg-4 col-xl-3"-->
<!--        :class="{-->
<!--                'd-md-none': !isOpened,-->
<!--              }"-->
<!--      >-->
        <filter-user/>
<!--      </div>-->
      <!--      [ARRAY] [API FETCH] gateway multi select-->
<!--      <div-->
<!--        class="col-md-6 col-lg-4 col-xl-3"-->
<!--        :class="{'d-md-none': !isOpened}"-->
<!--      >-->
        <filter-gateway/>
<!--      </div>-->
      <!--      [ARRAY] [API FETCH] agent multi select-->
<!--      <div-->
<!--        class="col-md-6 col-lg-4 col-xl-3"-->
<!--        :class="{'d-md-none': !isOpened}"-->
<!--      >-->
        <filter-agent/>
<!--      </div>-->
      <!--     [ARRAY]  [API FETCH] team multi select-->
<!--      <div-->
<!--        class="col-md-6 col-lg-4 col-xl-3"-->
<!--        :class="{'d-md-none': !isOpened}"-->
<!--      >-->
        <filter-team/>
<!--      </div>-->
      <!--    [ARRAY]   [API FETCH] queue multi select-->
<!--      <div-->
<!--        class="col-md-6 col-lg-4 col-xl-3"-->
<!--        :class="{'d-md-none': !isOpened}"-->
<!--      >-->
        <filter-queue/>
<!--      </div>-->
      <!--      duration inputs -->
<!--      <div-->
<!--        class="col-md-6 col-lg-4 col-xl-3"-->
<!--        :class="{'d-md-none': !isOpened}"-->
<!--      >-->
        <filter-duration/>
<!--      </div>-->
      <!--     [ARRAY]  tags multi select-->
      <!--      <div-->
      <!--        class="col-md-6 col-lg-4 col-xl-3"-->
      <!--        :class="{'d-md-none': !isOpened}"-->
      <!--      >-->
      <!--        <filter-tags/>-->
      <!--      </div>-->
      <!--     [ARRAY]  hangup cause multi select-->
<!--      <div-->
<!--        class="col-md-6 col-lg-4 col-xl-3"-->
<!--        :class="{'d-md-none': !isOpened}"-->
<!--      >-->
        <filter-cause/>
<!--      </div>-->
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
    /*display: flex;*/
    /*flex-wrap: wrap;*/
    display: grid;
    grid-template-columns: repeat(auto-fill,  minmax(300px, 1fr));
    grid-template-rows: repeat(1, 1fr);
    /*grid-auto-rows: 0; !* set height to 0 for autogenerated grid rows *!*/
    /*overflow: hidden; !* hide grid items that overflow *!*/
    grid-column-gap: 20px;

    .dt-picker {
      width: 100%;
      /*width: 596px;*/
    }

    .hs-multiselect {
      width: 100%;
      /*width: 271px;*/
    }

    .dt-picker, .hs-multiselect {
      /*margin-right: (50px);*/
      margin-bottom: (18px);
    }
  }
</style>
