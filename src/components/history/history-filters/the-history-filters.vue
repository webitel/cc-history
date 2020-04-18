<template>
  <section class="history-section history-filters">
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
    <div class="history-filters__controls">
      <button
        class="icon-btn history-filters__icon-btn"
        :class="{'active': isOpened}"
        @click.prevent="isOpened = !isOpened"
      >
        <icon>
          <svg class="icon icon-filter_md md">
            <use xlink:href="#icon-filter_md"></use>
          </svg>
        </icon>
      </button>
      <button v-if="false" class="icon-btn history-filters__icon-btn">
        <icon>
          <svg class="icon icon-download_md md">
            <use xlink:href="#icon-download_md"></use>
          </svg>
        </icon>
      </button>
      <button v-if="false" class="icon-btn history-filters__icon-btn">
        <icon>
          <svg class="icon icon-upload_md md">
            <use xlink:href="#icon-upload_md"></use>
          </svg>
        </icon>
      </button>
    </div>
  </section>
</template>

<script>
  import FilterDatetime from './filters/filter-datetime.vue';
  import FilterType from './filters/filter-type.vue';
  import FilterDirection from './filters/filter-direction.vue';
  import FilterUser from './filters/filter-user.vue';
  import FilterGateway from './filters/filter-gateway.vue';
  import FilterAgent from './filters/filter-agent.vue';
  import FilterTeam from './filters/filter-queue.vue';
  import FilterQueue from './filters/filter-team.vue';
  import FilterCause from './filters/filter-cause.vue';
  // import FilterTags from './filters/filter-tags.vue';
  import FilterDuration from './filters/filter-duration.vue';

  export default {
    name: 'the-history-filters',
    components: {
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
    },

    data: () => ({
      isOpened: false,
    }),
  };
</script>

<style lang="scss" scoped>
  @import "../../../css/utils/bootstrap-grid.css";

  .history-filters {
    display: flex;
    align-items: flex-start;
    padding: calcRem(18px) calcRem(28px);
    margin: calcRem(20px) 0;

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
        /*margin-right: calcRem(50px);*/
        margin-bottom: calcRem(18px);
      }
    }

    &__controls {
      // $icon-w: calcRem(24px*3);
      // $margin-w: calcRem(30px*2); // 3 icons + 2 margins
      $icon-w: calcRem(24px);
      $margin-w: calcRem(0px);
      margin: calcRem(30px) 0 0 calcRem(30px);
      flex: 0 0 calc(#{$icon-w} + #{$margin-w});

      .icon-btn {
        margin-left: calcRem(30px);

        &:first-child {
          margin-left: 0;
        }
      }
    }
  }
</style>
