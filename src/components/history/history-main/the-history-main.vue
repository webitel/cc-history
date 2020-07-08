<template>
  <section class="history-section history-main">
    <loader v-if="isLoading"/>
    <grid-table
      v-else
      ref="grid-table"
      :headers="headers"
      :data="data"
      sortable
      @sort="sort"
    >
      <template slot="direction" slot-scope="{ item }">
        <grid-direction :item="item"/>
      </template>
      <template slot="from" slot-scope="{ item }">
        <grid-from :item="item"/>
      </template>
      <template slot="to" slot-scope="{ item }">
        <grid-to :item="item"/>
      </template>
      <template slot="user" slot-scope="{ item }">
        <grid-user :item="item"/>
      </template>
      <template slot="gateway" slot-scope="{ item }">
        <grid-gateway :item="item"/>
      </template>
      <template slot="agent" slot-scope="{ item }">
        <grid-agent :item="item"/>
      </template>
      <template slot="team" slot-scope="{ item }">
        <grid-team :item="item"/>
      </template>
      <template slot="queue" slot-scope="{ item }">
        <grid-queue :item="item"/>
      </template>
      <template slot="member" slot-scope="{ item }">
        <grid-member :item="item"/>
      </template>

      <template slot="actions" slot-scope="{ item, index }">
        <media-action
          v-if="item.files"
          class="table-action"
          :class="{'active': openedMediaIndex === index}"
          :is-any-files-playing="isAnyFilesPlaying(item.files)"
          @click.native.stop="openMedia(index, $event)"
        ></media-action>

        <download-action
          v-if="item.files"
          class="table-action"
          @click.native.stop="downloadRowFiles(item.files)"
        ></download-action>

        <icon-btn
          class="table-action"
          :icon="'forks'"
          @click.native.stop="openItem(item)"
        ></icon-btn>
      </template>

      <template slot="pagination">
        <filter-pagination :is-next="isNext"/>
      </template>

    </grid-table>

    <opened-call-popup
      v-if="isOpenedCallPopup"
      @close="closeCallPopup"
    ></opened-call-popup>

    <audio-player
      v-show="audioURL"
      :file="audioURL"
      @play="isPlayingNow = true"
      @close="closePlayer"
    ></audio-player>

    <media-select
      ref="media-select"
      v-show="isMediaSelectOpened"
      :files="mediaFiles"
      :currently-playing="currentlyPlaying"
      @play="play"
      @close="closeMedia"
    >
    </media-select>
  </section>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';
  import OpenedCallPopup from './opened-call/opened-call-popup.vue';
  import GridTable from '../../utils/grid-table.vue';
  import FilterPagination from '../../filters/filter-pagination.vue';
  import Loader from '../../utils/loader.vue';
  import GridAgent from './grid-templates/grid-agent.vue';
  import GridDirection from './grid-templates/grid-direction.vue';
  import GridFrom from './grid-templates/grid-from.vue';
  import GridGateway from './grid-templates/grid-gateway.vue';
  import GridMember from './grid-templates/grid-member.vue';
  import GridQueue from './grid-templates/grid-queue.vue';
  import GridTeam from './grid-templates/grid-team.vue';
  import GridTo from './grid-templates/grid-to.vue';
  import GridUser from './grid-templates/grid-user.vue';
  import MediaAction from './grid-templates/grid-media-action.vue';
  import DownloadAction from './grid-templates/grid-download-action.vue';
  import sortFilterMixin from '../../../mixins/filters/sortFilterMixin/sortFilterMixin';
  import downloadRowFilesMixin from '../../../mixins/downloadFiles/downloadRowFilesMixin';
  import playMediaMixin from '../../../mixins/media/playMediaMixin';
  import showMediaMixin from '../../../mixins/media/showMediaMixin';

  export default {
    name: 'the-history-main',
    mixins: [
      sortFilterMixin,
      playMediaMixin,
      showMediaMixin,
      downloadRowFilesMixin,
    ],
    components: {
      OpenedCallPopup,
      GridTable,
      FilterPagination,
      Loader,
      GridAgent,
      GridDirection,
      GridFrom,
      GridGateway,
      GridMember,
      GridQueue,
      GridTeam,
      GridTo,
      GridUser,
      MediaAction,
      DownloadAction,
    },

    watch: {
      '$route.query': {
        async handler() {
          await this.loadDataList();
        },
        immediate: true,
      },
    },

    computed: {
      ...mapState('history', {
        data: (state) => state.data,
        headersValue: (state) => state.headers,
        isNext: (state) => state.isNext,
        isLoading: (state) => state.isLoading,
      }),
      ...mapGetters('history/opened-call', {
        isOpenedCallPopup: 'IS_CALL_ID',
      }),

      headers: {
        get() {
          return this.headersValue;
        },
        set(value) {
          this.setHeaders(value);
        },
      },
    },

    methods: {
      ...mapActions('history', {
        setHeaders: 'SET_HEADERS',
        loadDataList: 'LOAD_DATA_LIST',
      }),
      ...mapActions('history/opened-call', {
        setOpenedItem: 'SET_OPENED_CALL',
        resetOpenedItem: 'RESET_OPENED_CALL',
      }),

      openItem(item) {
        this.setOpenedItem(item);
      },

      closeCallPopup() {
        this.resetOpenedItem();
      },
    },
  };
</script>

<style lang="scss" scoped>
  .history-main {
    position: relative;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    padding: 20px 30px;
  }

  .table-action {
    margin-left: (20px);

    &:first-child {
      margin-left: 0;
    }
  }

  .expansion-call-info,
  .expansion__comments {
    flex: 0 0 50%;
  }

  .expansion__comments {
    margin-left: (60px);
  }

  .agent-comment {
    display: flex;

    &__pic {
      width: (60px);
      height: (60px);
      flex: 0 0 60px;
      margin-right: (20px);
    }

    &__comment {
      &__heading {
        @extend .typo-heading-sm;
        margin-bottom: (10px);
      }

      &__text {
        @extend .typo-body-md;
      }
    }
  }

  .media-select {
    position: absolute;
    right: 28px;
  }
</style>
