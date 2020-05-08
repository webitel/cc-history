<template>
  <section class="history-section history-main">
    <loader v-if="isLoading"/>
<!--    to add expanded functionality, add "expanded" prop :)-->
    <grid-table
      v-else
      :headers="headers"
      :data="data"
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

      <template slot="actions" slot-scope="{ item }">
        <media-select
          v-if="item.files"
          class="table-action"
          :files="item.files"
          :currently-playing="currentlyPlaying"
          @play="play"
        ></media-select>

        <button
          v-if="item.files"
          class="icon-btn table-action"
          @click.prevent.stop="downloadRowFiles(item.files)"
        >
          <icon>
            <svg class="icon icon-download_md md">
              <use xlink:href="#icon-download_md"></use>
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
      v-show="audioURL"
      :file="audioURL"
      @play="isPlayingNow = true"
      @pause="isPlayingNow = false"
      @close="audioURL = ''"
    ></audio-player>
  </section>
</template>

<script>
  import { CallDirection } from 'webitel-sdk';
  import GridTable from '../../utils/grid-table.vue';
  import FilterFields from './filters/filter-table-fields.vue';
  import FilterPagination from './filters/filter-pagination.vue';
  import AudioPlayer from '../../utils/audio-player.vue';
  import MediaSelect from '../../utils/media-select.vue';
  import Loader from '../../utils/loader.vue';
  import sortFilterMixin from '../../../mixins/filters/sortFilterMixin/sortFilterMixin';
  import loadHistoryMixin from '../../../mixins/loadHistory/loadHistoryMixin';
  import mediaMixin from '../../../mixins/files/mediaMixin';
  import downloadRowFilesMixin from '../../../mixins/files/downloadFiles/downloadRowFilesMixin';

  export default {
    name: 'the-history-main',
    mixins: [
      loadHistoryMixin,
      sortFilterMixin,
      mediaMixin,
      downloadRowFilesMixin,
    ],
    components: {
      GridTable,
      FilterFields,
      FilterPagination,
      AudioPlayer,
      MediaSelect,
      Loader,
    },
    data: () => ({
      CallDirection,
    }),
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
