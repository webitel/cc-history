<template>
  <section class="history-section history-main">
    <loader v-if="isLoading"/>
    <grid-table
      v-else
      :headers="headers"
      :data="data"
      expanded
      @sort="sort"
    >
      <template slot="actions-header">
        <filter-fields
          v-model="headers"
        />
      </template>

      <template slot="direction" slot-scope="{ item }">
        <div v-if="item.direction === CallDirection.Inbound">
          <icon class="icon-wrap__inbound">
            <svg class="icon icon-inbound_md md">
              <use xlink:href="#icon-inbound_md"></use>
            </svg>
          </icon>
        </div>
        <div v-else-if="item.direction === CallDirection.Outbound">
          <icon class="icon-wrap__outbound">
            <svg class="icon icon-outbound_md md">
              <use xlink:href="#icon-outbound_md"></use>
            </svg>
          </icon>
        </div>
      </template>
      <template slot="user" slot-scope="{ item }">
        <div v-if="item.user">
          {{item.user.name}}
        </div>
      </template>
      <template slot="gateway" slot-scope="{ item }">
        <div v-if="item.gateway">
          {{item.gateway.name}}
        </div>
      </template>
      <template slot="agent" slot-scope="{ item }">
        <div v-if="item.agent">
          {{item.agent.name}}
        </div>
      </template>
      <template slot="team" slot-scope="{ item }">
        <div v-if="item.team">
          {{item.team.name}}
        </div>
      </template>
      <template slot="queue" slot-scope="{ item }">
        <div v-if="item.queue">
          {{item.queue.name}}
        </div>
      </template>

      <template slot="actions">
        <button class="icon-btn table-action" @click.prevent.stop="download">
          <icon>
            <svg class="icon icon-download_md md">
              <use xlink:href="#icon-download_md"></use>
            </svg>
          </icon>
        </button>
        <button class="icon-btn table-action" @click.prevent.stop="play">
          <icon>
            <svg class="icon icon-play_md md">
              <use xlink:href="#icon-play_md"></use>
            </svg>
          </icon>
        </button>
      </template>

      <template slot="row-expansion" slot-scope="{ item }">
        <div class="expansion__content-wrap">
          <h1 class="expansion__heading">Call info</h1>
          {{item}}
        </div>
        <div class="expansion__comments">
          <h1 class="expansion__heading">Operator comment</h1>
          <article class="agent-comment">
            <div class="agent-comment__pic">
              <img src="../../../assets/default-avatar.svg" alt="agent pic">
            </div>
            <div class="agent-comment__comment">
              <h2 class="agent-comment__comment__heading">Agent name</h2>
              <p class="agent-comment__comment__text">Рынок финансовых услуг интересен всем
                федеральным игрокам. Но возможности мобильных
                платежей с использованием операторского счета ограничивает конкуренция с
                традиционным и мобильным банкингом, говорит Анкилов.</p>
            </div>
          </article>
        </div>
      </template>

      <template slot="pagination">
        <filter-pagination/>
      </template>

    </grid-table>
    <audio-player
      v-if="false"
      v-show="isShowPlayer"
      :file="audioLink"
      @play="currentlyPlaying = true"
      @pause="currentlyPlaying = false"
      @close="isShowPlayer = false"
    ></audio-player>
  </section>
</template>

<script>
  import { CallDirection } from 'webitel-sdk';
  import GridTable from '../../utils/grid-table.vue';
  import FilterFields from './filters/filter-table-fields.vue';
  import FilterPagination from './filters/filter-pagination.vue';
  import AudioPlayer from '../../utils/audio-player.vue';
  import Loader from '../../utils/loader.vue';
  import { getHistory } from '../../../api/history/history';
  import sortFilterMixin from '../../../mixins/filters/sortFilterMixin/sortFilterMixin';
  import { kebabToCamel } from '../../../api/utils/caseConverters';

  export default {
    name: 'the-history-main',
    mixins: [sortFilterMixin],
    components: {
      GridTable,
      FilterFields,
      FilterPagination,
      AudioPlayer,
      Loader,
    },
    data: () => ({
      headers: [
        {
          text: 'Date',
          value: 'date',
          show: true,
          sort: null,
          width: 'minmax(120px, 1fr)',
        },
        {
          text: 'Time',
          value: 'time',
          show: true,
          sort: null,
          width: 'minmax(120px, 1fr)',
        },
        {
          text: 'Direction',
          value: 'direction',
          show: true,
          sort: null,
          width: 'minmax(120px, 1fr)',
        },
        {
          text: 'User',
          value: 'user',
          show: true,
          sort: null,
          width: 'minmax(120px, 1fr)',
        },
        {
          text: 'Destination',
          value: 'destination',
          show: true,
          sort: null,
          width: 'minmax(120px, 1fr)',
        },
        {
          text: 'Gateway',
          value: 'gateway',
          show: true,
          sort: null,
          width: 'minmax(120px, 1fr)',
        },
        {
          text: 'Agent',
          value: 'agent',
          show: true,
          sort: null,
          width: 'minmax(120px, 1fr)',
        },
        {
          text: 'Team',
          value: 'team',
          show: true,
          sort: null,
          width: 'minmax(120px, 1fr)',
        },
        {
          text: 'Queue',
          value: 'queue',
          show: true,
          sort: null,
          width: 'minmax(120px, 1fr)',
        },
        {
          text: 'Duration',
          value: 'duration',
          show: true,
          sort: null,
          width: 'minmax(120px, 1fr)',
        },
        {
          text: 'Tags',
          value: 'tags',
          show: false,
          sort: null,
          width: 'minmax(120px, 1fr)',
        },
        {
          text: 'Hangup cause',
          value: 'cause',
          show: true,
          sort: null,
          width: 'minmax(120px, 1fr)',
        },
      ],
      data: null,
      audioLink: '',
      isShowPlayer: true,
      currentlyPlaying: false,
      isLoading: false,
      CallDirection,
    }),

    watch: {
      // eslint-disable-next-line func-names
      '$route.query': {
        handler() {
          this.loadDataList();
        },
        immediate: true,
      },
    },

    methods: {
      play() {
      },

      download() {
      },

      async loadDataList() {
        this.isLoading = true;
        const { query } = this.$route;
        const filledQueries = Object.keys(query)
          .filter((key) => query[key]);
        const res = {};
        filledQueries.forEach((key) => {
          let value = `${query[key]}`;
          if (key === 'sort' || key === 'fields') {
            if (value.includes('date')) {
              value = value.replace('date', 'created_at');
            } else if (value.includes('time')) {
              value = value.replace('time', 'created_at');
            }
          }
          if (value.includes('|')) value = value.split('|');
          res[kebabToCamel(key)] = value;
        });
        this.data = await getHistory(res);
        this.isLoading = false;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .history-main {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    padding: calcRem(20px) calcRem(30px);
  }

  .icon-wrap {
    /*margin: auto;*/

    &__inbound {
      .icon {
        fill: $inbound-icon-color;
        stroke: $inbound-icon-color;
      }
    }

    &__outbound {
      .icon {
        fill: $outbound-icon-color;
        stroke: $outbound-icon-color;
      }
    }
  }

  .table-action {
    margin-left: calcRem(20px);

    &:first-child {
      margin-left: 0;
    }
  }

  .expansion__call-info,
  .expansion__comments {
    flex: 0 0 50%;
  }

  .expansion__comments {
    margin-left: calcRem(60px);
  }

  .expansion__heading {
    @extend .typo-heading-sm;
    margin-bottom: calcRem(30px);
  }

  .agent-comment {
    display: flex;

    &__pic {
      width: calcRem(60px);
      height: calcRem(60px);
      flex: 0 0 calcRem(60px);
      margin-right: calcRem(20px);
    }

    &__comment {
      &__heading {
        @extend .typo-heading-sm;
        margin-bottom: calcRem(10px);
      }

      &__text {
        @extend .typo-body-md;
      }
    }
  }
</style>
