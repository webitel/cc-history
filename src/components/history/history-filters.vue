<template>
  <section class="history-section history-filters">
    <form class="history-filters__filters">
      <div class="col-md-12 col-lg-8 col-xl-6">
        <dt-picker/>
      </div>
      <div class="col-md-6 col-lg-4 col-xl-3">
        <multiselect
          :options="options"
          :label="'Type'"
          :filter-query="'type'"
        ></multiselect>
      </div>
      <div
        class="col-lg-4 col-xl-3"
        :class="{
          'd-md-none': !isOpened,
          'd-lg-none': !isOpened,
          'd-xl-block': !isOpened
        }"
      >
        <multiselect
          :options="options"
          :label="'Direction'"
          :filter-query="'direction'"
        ></multiselect>
      </div>
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-xl-none': !isOpened}"
      >
        <multiselect
          :options="options"
          :label="'User'"
          :filter-query="'user'"
        ></multiselect>
      </div>
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-xl-none': !isOpened}"
      >
        <multiselect
          :options="options"
          :label="'Destination'"
          :filter-query="'destination'"
        ></multiselect>
      </div>
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-xl-none': !isOpened}"
      >
        <multiselect
          class="zz"
          :options="options"
          :label="'Gateway'"
          :filter-query="'gateway'"
        ></multiselect>
      </div>
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-xl-none': !isOpened}"
      >
        <multiselect
          :options="options"
          :label="'Agent'"
          :filter-query="'agent'"
        ></multiselect>
      </div>
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-xl-none': !isOpened}"
      >
        <multiselect
          :options="options"
          :label="'Team'"
          :filter-query="'team'"
        ></multiselect>
      </div>
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-xl-none': !isOpened}"
      >
        <multiselect
          :options="options"
          :label="'Queue'"
          :filter-query="'queue'"
        ></multiselect>
      </div>
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-xl-none': !isOpened}"
      >
        <input-timerange
          v-model="duration"
          :label="'Duration'"
          :filter-query="'duration'"
        ></input-timerange>
      </div>
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-xl-none': !isOpened}"
      >
        <multiselect
          :options="options"
          :label="'Tags'"
          :filter-query="'tags'"
        ></multiselect>
      </div>
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-xl-none': !isOpened}"
      >
        <multiselect
          :options="options"
          :label="'Hangup cause'"
          :filter-query="'cause'"
        ></multiselect>
      </div>
    </form>
    <div class="history-filters__controls">
      <button
        class="icon-btn history-filters__icon-btn"
        @click.prevent="isOpened = !isOpened"
      >
        <icon>
          <svg class="icon icon-filter_md md">
            <use xlink:href="#icon-filter_md"></use>
          </svg>
        </icon>
      </button>
      <button class="icon-btn history-filters__icon-btn">
        <icon>
          <svg class="icon icon-download_md md">
            <use xlink:href="#icon-download_md"></use>
          </svg>
        </icon>
      </button>
      <button class="icon-btn history-filters__icon-btn">
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
  import DtPicker from '../utils/datetimepicker.vue';
  import Multiselect from '../utils/multiselect.vue';
  import InputTimerange from '../utils/input-timerange.vue';

  export default {
    name: 'history-filters',
    components: {
      DtPicker,
      Multiselect,
      InputTimerange,
    },

    data: () => ({
      isOpened: false,
      options: [
        {
          name: 'aa',
          value: 'aa',
        }, {
          name: 'bb',
          value: 'bb',
        }, {
          name: 'cc',
          value: 'cc',
        },
      ],
      duration: {
        from: 60,
        to: 120,
      },
    }),
  };
</script>

<style lang="scss" scoped>
  @import "../../css/utils/bootstrap-grid.css";

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
      $icon-w: calcRem(24px*3);
      $margin-w: calcRem(30px*2); // 3 icons + 2 margins
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
