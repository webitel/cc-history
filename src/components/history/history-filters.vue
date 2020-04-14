<template>
  <section class="history-section history-filters">
    <form class="history-filters__filters">
      <!--      dt picker-->
      <div class="col-md-12 col-lg-8 col-xl-6">
        <dt-picker
          :value="{
            from: this.from,
            to: this.to,
          }"
          @input="setDateTime"
        ></dt-picker>
      </div>
      <!--      type multiselect-->
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{
          'd-md-none': !isOpened,
          'd-lg-block': !isOpened,
        }"
      >
        <multiselect
          v-model="type"
          :options="options"
          :label="'Type'"
          @closed="setQueryFromValue({value: type, filterQuery: 'type', separator: '|'})"
        ></multiselect>
      </div>
      <!--      <div-->
      <!--        class="col-md-6 col-lg-4 col-xl-3"-->
      <!--        :class="{-->
      <!--          'd-md-none': !isOpened,-->
      <!--          'd-lg-none': !isOpened,-->
      <!--          'd-xl-block': !isOpened-->
      <!--        }"-->
      <!--      >-->
      <!--        <multiselect-->
      <!--          :options="options"-->
      <!--          :label="'Direction'"-->
      <!--          :filter-query="'direction'"-->
      <!--        ></multiselect>-->
      <!--      </div>-->
      <!--      <div-->
      <!--        class="col-md-6 col-lg-4 col-xl-3"-->
      <!--        :class="{-->
      <!--          'd-md-none': !isOpened,-->
      <!--        }"-->
      <!--      >-->
      <!--        <multiselect-->
      <!--          :options="options"-->
      <!--          :label="'User'"-->
      <!--          :filter-query="'user'"-->
      <!--        ></multiselect>-->
      <!--      </div>-->
      <!--      <div-->
      <!--        class="col-md-6 col-lg-4 col-xl-3"-->
      <!--        :class="{'d-md-none': !isOpened}"-->
      <!--      >-->
      <!--        <multiselect-->
      <!--          :options="options"-->
      <!--          :label="'Destination'"-->
      <!--          :filter-query="'destination'"-->
      <!--        ></multiselect>-->
      <!--      </div>-->
      <!--      <div-->
      <!--        class="col-md-6 col-lg-4 col-xl-3"-->
      <!--        :class="{'d-md-none': !isOpened}"-->
      <!--      >-->
      <!--        <multiselect-->
      <!--          :options="options"-->
      <!--          :label="'Gateway'"-->
      <!--          :filter-query="'gateway'"-->
      <!--        ></multiselect>-->
      <!--      </div>-->
      <!--      <div-->
      <!--        class="col-md-6 col-lg-4 col-xl-3"-->
      <!--        :class="{'d-md-none': !isOpened}"-->
      <!--      >-->
      <!--        <multiselect-->
      <!--          :options="options"-->
      <!--          :label="'Agent'"-->
      <!--          :filter-query="'agent'"-->
      <!--        ></multiselect>-->
      <!--      </div>-->
      <!--      <div-->
      <!--        class="col-md-6 col-lg-4 col-xl-3"-->
      <!--        :class="{'d-md-none': !isOpened}"-->
      <!--      >-->
      <!--        <multiselect-->
      <!--          :options="options"-->
      <!--          :label="'Team'"-->
      <!--          :filter-query="'team'"-->
      <!--        ></multiselect>-->
      <!--      </div>-->
      <!--      <div-->
      <!--        class="col-md-6 col-lg-4 col-xl-3"-->
      <!--        :class="{'d-md-none': !isOpened}"-->
      <!--      >-->
      <!--        <multiselect-->
      <!--          :options="options"-->
      <!--          :label="'Queue'"-->
      <!--          :filter-query="'queue'"-->
      <!--        ></multiselect>-->
      <!--      </div>-->
      <!--      duration inputs -->
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-md-none': !isOpened}"
      >
        <input-timerange
          v-model="duration"
          :label="'Duration'"
          :filter-query="'duration'"
        ></input-timerange>
      </div>
      <!--      <div-->
      <!--        class="col-md-6 col-lg-4 col-xl-3"-->
      <!--        :class="{'d-md-none': !isOpened}"-->
      <!--      >-->
      <!--        <multiselect-->
      <!--          :options="options"-->
      <!--          :label="'Tags'"-->
      <!--          :filter-query="'tags'"-->
      <!--        ></multiselect>-->
      <!--      </div>-->
      <!--      <div-->
      <!--        class="col-md-6 col-lg-4 col-xl-3"-->
      <!--        :class="{'d-md-none': !isOpened}"-->
      <!--      >-->
      <!--        <multiselect-->
      <!--          :options="options"-->
      <!--          :label="'Hangup cause'"-->
      <!--          :filter-query="'cause'"-->
      <!--        ></multiselect>-->
      <!--      </div>-->
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
  import filterMixin from '../../mixins/filterMixin';

  const msInMin = 60 * 10 ** 3;

  export default {
    name: 'history-filters',
    mixins: [filterMixin],
    components: {
      DtPicker,
      Multiselect,
      InputTimerange,
    },

    data: () => ({
      isOpened: false,
      from: Date.now(),
      to: Date.now(),
      type: [],
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

    watch: {
      // eslint-disable-next-line func-names
      '$route.query.from': function (from) {
        this.getDateTimeFrom(from);
      },
      // eslint-disable-next-line func-names
      '$route.query.to': function (to) {
        this.getDateTimeTo(to);
      },
      // eslint-disable-next-line func-names
      '$route.query.type': function (value) {
        this.getValueFromQuery({
          prop: 'type',
          value,
          separator: '|',
        });
      },
    },

    created() {
      this.getValueFromQuery({
        prop: 'type',
        separator: '|',
      });
    },

    methods: {
      getDateTimeFrom(from = this.$route.query.from) {
        this.from = from || Math.floor(Date.now() / msInMin) * msInMin;
      },

      getDateTimeTo(to = this.$route.query.to) {
        this.to = to || Math.floor(Date.now() / msInMin) * msInMin;
      },

      getValueFromQuery({ prop, value = this.$route.query[prop], separator = ',' }) {
        if (value) {
          this[prop] = value.split(separator)
            .map((item) => ({ value: item }));
        }
      },

      setDateTime({ from, to }) {
        let filterQuery = 'from';
        let filter = from;
        this.filter({
          filter,
          filterQuery,
        });

        filterQuery = 'to';
        filter = to;
        this.filter({
          filter,
          filterQuery,
        });
      },

      setQueryFromValue({ value, filterQuery, separator = ',' }) {
        const filter = value.map((item) => item.value)
          .join(separator);
        this.filter({
          filter,
          filterQuery,
        });
      },
    },
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
