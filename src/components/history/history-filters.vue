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
      <!--      [ARRAY] type multi select-->
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{
          'd-md-none': !isOpened,
          'd-lg-block': !isOpened,
        }"
      >
        <multiselect
          v-model="type"
          :options="TypeOptions"
          :label="'Type'"
          :track-by="'value'"
          :api-mode="false"
          @closed="setQueryArray({ value: type, filterQuery: 'type', queriedProp: 'value' })"
        ></multiselect>
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
        <multiselect
          v-model="direction"
          :options="DirectionOptions"
          :label="'Direction'"
          :track-by="'value'"
          :api-mode="false"
          @closed="setQueryArray({
            value: direction,
            filterQuery: 'direction',
            queriedProp: 'value',
          })"
        ></multiselect>
      </div>
      <!--     [ARRAY] [API FETCH] user multi select-->
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{
                'd-md-none': !isOpened,
              }"
      >
        <multiselect
          v-model="user"
          :fetch-method="fetchUsers"
          :label="'User'"
          @closed="setQueryArray({ value: user, filterQuery: 'user' })"
        ></multiselect>
      </div>
      <!--      [ARRAY] [API FETCH] gateway multi select-->
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-md-none': !isOpened}"
      >
        <multiselect
          v-model="gateway"
          :fetch-method="fetchGateways"
          :label="'Gateway'"
          @closed="setQueryArray({ value: gateway, filterQuery: 'gateway' })"
        ></multiselect>
      </div>
      <!--      [ARRAY] [API FETCH] agent multi select-->
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-md-none': !isOpened}"
      >
        <multiselect
          v-model="agent"
          :fetch-method="fetchAgents"
          :label="'Agent'"
          @closed="setQueryArray({ value: agent, filterQuery: 'agent' })"
        ></multiselect>
      </div>
      <!--     [ARRAY]  [API FETCH] team multi select-->
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-md-none': !isOpened}"
      >
        <multiselect
          v-model="team"
          :fetch-method="fetchTeams"
          :label="'Team'"
          @closed="setQueryArray({ value: team, filterQuery: 'team' })"
        ></multiselect>
      </div>
      <!--    [ARRAY]   [API FETCH] queue multi select-->
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-md-none': !isOpened}"
      >
        <multiselect
          v-model="queue"
          :fetch-method="fetchQueues"
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
      <!--     [ARRAY]  tags multi select-->
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-md-none': !isOpened}"
      >
        <multiselect
          v-model="tags"
          :options="[]"
          :label="'Tags'"
          :api-mode="false"
          @closed="setQueryArray({ value: tags, filterQuery: 'tags', queriedProp: 'value' })"
        ></multiselect>
      </div>
      <!--     [ARRAY]  hangup cause multi select-->
      <div
        class="col-md-6 col-lg-4 col-xl-3"
        :class="{'d-md-none': !isOpened}"
      >
        <multiselect
          v-model="cause"
          :options="HangupCauseOptions"
          :label="'Hangup cause'"
          :api-mode="false"
          @closed="setQueryArray({ value: cause, filterQuery: 'cause', queriedProp: 'id' })"
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
  import urlQueryControllerMixin from '../../mixins/urlQueryControllerMixin';

  import TypeOptions from '../../api/filter-getters/TypeOptions.enum';
  import DirectionOptions from '../../api/filter-getters/DirectionOptions.enum';
  import HangupCauseOptions from '../../api/filter-getters/HangupCauseOption.enum';
  import { fetchUsers, getSelectedUsers } from '../../api/filter-getters/userFilter';
  import { fetchGateways, getSelectedGateways } from '../../api/filter-getters/gatewayFilter';
  import { fetchAgents, getSelectedAgents } from '../../api/filter-getters/agentFilter';
  import { fetchTeams, getSelectedTeams } from '../../api/filter-getters/teamFilter';
  import { fetchQueues, getSelectedQueues } from '../../api/filter-getters/queueFilter';

  const msInMin = 60 * 10 ** 3;

  export default {
    name: 'history-filters',
    mixins: [urlQueryControllerMixin],
    components: {
      DtPicker,
      Multiselect,
      InputTimerange,
    },

    data: () => ({
      isOpened: false,
      from: Math.floor(Date.now() / msInMin) * msInMin,
      to: Math.floor(Date.now() / msInMin) * msInMin,
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
      TypeOptions,
      DirectionOptions,
      HangupCauseOptions,
    }),

    created() {
      this.restoreFilters();
    },

    methods: {
      restoreFilters() {
        this.restoreFrom();
        this.restoreTo();
        this.restoreType();
        this.restoreDirection();
        this.restoreUser();
        this.restoreGateway();
        this.restoreAgent();
        this.restoreTeam();
        this.restoreQueue();
        this.restoreDurationFrom();
        this.restoreDurationTo();
        this.restoreTags();
        this.restoreHangupCause();
      },

      restoreFrom() {
        const queryValue = this.$route.query.from;
        const defaultValue = Math.floor(Date.now() / msInMin) * msInMin;
        this.from = +queryValue || defaultValue;
      },

      restoreTo() {
        const queryValue = this.$route.query.to;
        const defaultValue = Math.floor(Date.now() / msInMin) * msInMin;
        this.to = +queryValue || defaultValue;
      },

      restoreType() {
        const valueArray = this.parseQueryArray({ filterQuery: 'type' });
        if (valueArray) {
          this.type = this.TypeOptions
            .filter((item) => valueArray.some((value) => value === item.value));
        }
      },

      restoreDirection() {
        const valueArray = this.parseQueryArray({ filterQuery: 'direction' });
        if (valueArray) {
          this.direction = this.DirectionOptions
            .filter((item) => valueArray.some((value) => value === item.value));
        }
      },

      async restoreUser() {
        const idList = this.parseQueryArray({ filterQuery: 'user' });
        if (idList) {
          this.user = await getSelectedUsers(idList);
        }
      },

      async restoreGateway() {
        const idList = this.parseQueryArray({ filterQuery: 'gateway' });
        if (idList) {
          this.gateway = await getSelectedGateways(idList);
        }
      },

      async restoreAgent() {
        const idList = this.parseQueryArray({ filterQuery: 'agent' });
        if (idList) {
          this.agent = await getSelectedAgents(idList);
        }
      },

      async restoreTeam() {
        const idList = this.parseQueryArray({ filterQuery: 'team' });
        if (idList) {
          this.team = await getSelectedTeams(idList);
        }
      },

      async restoreQueue() {
        const idList = this.parseQueryArray({ filterQuery: 'queue' });
        if (idList) {
          this.queue = await getSelectedQueues(idList);
        }
      },

      restoreDurationFrom() {
        const queryValue = this.$route.query.duration_from;
        this.duration.from = +queryValue || 0;
      },

      restoreDurationTo() {
        const queryValue = this.$route.query.duration_to;
        this.duration.to = +queryValue || null;
      },

      restoreTags() {
      },

      restoreHangupCause() {
        const valueArray = this.parseQueryArray({ filterQuery: 'cause' });
        if (valueArray) {
          this.cause = this.HangupCauseOptions
            .filter((item) => valueArray.some((value) => +value === item.id));
        }
      },

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
        this.setQueryValue({
          filterQuery: 'duration_from',
          value: duration.from,
        });

        this.setQueryValue({
          filterQuery: 'duration_to',
          value: duration.to,
        });
      },

      fetchUsers,
      fetchGateways,
      fetchAgents,
      fetchTeams,
      fetchQueues,
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
