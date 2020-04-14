<template>
  <section class="history-section history-filters">
    <form class="history-filters__filters">
      <!--      dt picker-->
      <div class="col-md-12 col-lg-8 col-xl-6">
        <dt-picker
          :value="{
            from,
            to,
          }"
          @input="setDateTime"
        ></dt-picker>
      </div>
      <!--      type multi select-->
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
          @closed="setQueryArray({ value: type, filterQuery: 'type' })"
        ></multiselect>
      </div>
      <!--      direction multi select-->
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{
                'd-md-none': !isOpened,
                'd-lg-none': !isOpened,
                'd-xl-block': !isOpened
              }"
      >
        <multiselect
          v-model="direction"
          :options="options"
          :label="'Direction'"
          @closed="setQueryArray({ value: direction, filterQuery: 'direction' })"
        ></multiselect>
      </div>
      <!--      user multi select-->
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{
                'd-md-none': !isOpened,
              }"
      >
        <multiselect
          v-model="user"
          :options="options"
          :label="'User'"
          @closed="setQueryArray({ value: user, filterQuery: 'user' })"
        ></multiselect>
      </div>
      <!--      destination multi select-->
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-md-none': !isOpened}"
      >
        <multiselect
          v-model="destination"
          :options="options"
          :label="'Destination'"
          @closed="setQueryArray({ value: destination, filterQuery: 'destination' })"
        ></multiselect>
      </div>
      <!--      gateway multi select-->
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-md-none': !isOpened}"
      >
        <multiselect
          v-model="gateway"
          :options="options"
          :label="'Gateway'"
          @closed="setQueryArray({ value: gateway, filterQuery: 'gateway' })"
        ></multiselect>
      </div>
      <!--      agent multi select-->
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-md-none': !isOpened}"
      >
        <multiselect
          v-model="agent"
          :options="options"
          :label="'Agent'"
          @closed="setQueryArray({ value: agent, filterQuery: 'agent' })"
        ></multiselect>
      </div>
      <!--      team multi select-->
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-md-none': !isOpened}"
      >
        <multiselect
          v-model="team"
          :options="options"
          :label="'Team'"
          @closed="setQueryArray({ value: team, filterQuery: 'team' })"
        ></multiselect>
      </div>
      <!--      queue multi select-->
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-md-none': !isOpened}"
      >
        <multiselect
          v-model="queue"
          :options="options"
          :label="'Queue'"
          @closed="setQueryArray({ value: queue, filterQuery: 'queue' })"
        ></multiselect>
      </div>
      <!--      duration inputs -->
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-md-none': !isOpened}"
      >
        <input-timerange
          v-model="duration"
          :label="'Duration'"
          @change="setDuration"
        ></input-timerange>
      </div>
      <!--      tags multi select-->
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-md-none': !isOpened}"
      >
        <multiselect
          v-model="tags"
          :options="options"
          :label="'Tags'"
          @closed="setQueryArray({ value: tags, filterQuery: 'tags' })"
        ></multiselect>
      </div>
      <!--      hangup cause multi select-->
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-md-none': !isOpened}"
      >
        <multiselect
          v-model="cause"
          :options="options"
          :label="'Hangup cause'"
          @closed="setQueryArray({ value: cause, filterQuery: 'cause' })"
        ></multiselect>
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
      direction: [],
      user: [],
      destination: [],
      gateway: [],
      agent: [],
      team: [],
      queue: [],
      tags: [],
      cause: [],
      duration: {
        from: '0',
        to: '60',
      },
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
    }),

    watch: {
      // eslint-disable-next-line func-names
      '$route.query.from': {
        handler(from) {
          const value = from || Math.floor(Date.now() / msInMin) * msInMin;
          this.getQueryValue({
            prop: 'from',
            value,
          });
        },
        immediate: true,
      },
      // eslint-disable-next-line func-names
      '$route.query.to': {
        handler(to) {
          const value = to || Math.floor(Date.now() / msInMin) * msInMin;
          this.getQueryValue({
            prop: 'to',
            value,
          });
        },
        immediate: true,
      },
      // eslint-disable-next-line func-names
      '$route.query.type': {
        handler(value) {
          this.getQueryArray({
            prop: 'type',
            value,
            separator: '|',
          });
        },
        immediate: true,
      },
      // eslint-disable-next-line func-names
      '$route.query.direction': {
        handler(value) {
          this.getQueryArray({
            prop: 'direction',
            value,
            separator: '|',
          });
        },
        immediate: true,
      },
      // eslint-disable-next-line func-names
      '$route.query.user': {
        handler(value) {
          this.getQueryArray({
            prop: 'user',
            value,
            separator: '|',
          });
        },
        immediate: true,
      },
      // eslint-disable-next-line func-names
      '$route.query.destination': {
        handler(value) {
          this.getQueryArray({
            prop: 'destination',
            value,
            separator: '|',
          });
        },
        immediate: true,
      },
      // eslint-disable-next-line func-names
      '$route.query.gateway': {
        handler(value) {
          this.getQueryArray({
            prop: 'gateway',
            value,
            separator: '|',
          });
        },
        immediate: true,
      },
      // eslint-disable-next-line func-names
      '$route.query.agent': {
        handler(value) {
          this.getQueryArray({
            prop: 'agent',
            value,
            separator: '|',
          });
        },
        immediate: true,
      },
      // eslint-disable-next-line func-names
      '$route.query.team': {
        handler(value) {
          this.getQueryArray({
            prop: 'team',
            value,
            separator: '|',
          });
        },
        immediate: true,
      },
      // eslint-disable-next-line func-names
      '$route.query.queue': {
        handler(value) {
          this.getQueryArray({
            prop: 'queue',
            value,
            separator: '|',
          });
        },
        immediate: true,
      },
      // eslint-disable-next-line func-names
      '$route.query.duration_from': {
        handler(value) {
          const duration = {
            ...this.duration,
            from: value || '0',
          };
          this.getQueryValue({
            prop: 'duration',
            value: duration,
          });
        },
        immediate: true,
      },
      // eslint-disable-next-line func-names
      '$route.query.duration_to': {
        handler(value) {
          const duration = {
            ...this.duration,
            to: value || '0',
          };
          this.getQueryValue({
            prop: 'duration',
            value: duration,
          });
        },
        immediate: true,
      },
      // eslint-disable-next-line func-names
      '$route.query.tags': {
        handler(value) {
          this.getQueryArray({
            prop: 'tags',
            value,
            separator: '|',
          });
        },
        immediate: true,
      },
      // eslint-disable-next-line func-names
      '$route.query.cause': {
        handler(value) {
          this.getQueryArray({
            prop: 'cause',
            value,
            separator: '|',
          });
        },
        immediate: true,
      },
    },

    methods: {
      setDateTime({ from, to }) {
        this.setQueryValue({
          filterQuery: 'from',
          value: from,
        });
        this.setQueryValue({
          filterQuery: 'to',
          value: to,
        });
      },

      setDuration(duration) {
        const queryDurationFrom = this.$route.query.duration_from;
        if (queryDurationFrom !== duration.from) {
          this.setQueryValue({
            filterQuery: 'duration_from',
            value: duration.from,
          });
        }

        const queryDurationTo = this.$route.query.duration_to;
        if (queryDurationTo !== duration.to) {
          this.setQueryValue({
            filterQuery: 'duration_to',
            value: duration.to,
          });
        }
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
