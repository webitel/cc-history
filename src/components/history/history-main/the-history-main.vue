<template>
  <section class="history-section history-main">
    <wt-loader v-show="isLoading"/>
    <div class="table-wrapper" v-show="!isLoading">
      <wt-table
        ref="wt-table"
        :headers="headers"
        :data="data"
        sortable
        @sort="sort"
      >
        <template slot="direction" slot-scope="{ item }">
          <table-direction :item="item"/>
        </template>
        <template slot="from" slot-scope="{ item }">
          <table-from :item="item"/>
        </template>
        <template slot="to" slot-scope="{ item }">
          <table-to :item="item"/>
        </template>
        <template slot="user" slot-scope="{ item }">
          <table-user :item="item"/>
        </template>
        <template slot="gateway" slot-scope="{ item }">
          <table-gateway :item="item"/>
        </template>
        <template slot="agent" slot-scope="{ item }">
          <table-agent :item="item"/>
        </template>
        <template slot="team" slot-scope="{ item }">
          <table-team :item="item"/>
        </template>
        <template slot="queue" slot-scope="{ item }">
          <table-queue :item="item"/>
        </template>
        <template slot="member" slot-scope="{ item }">
          <table-member :item="item"/>
        </template>

        <template slot="actions" slot-scope="{ item, index }">
          <media-action
            v-if="item.files"
            class="table-action"
            :class="{'active': openedMediaIndex === index}"
            :is-any-files-playing="isAnyFilesPlaying(item.files)"
            @click.native.stop="openMedia(index, $event)"
          ></media-action>

          <wt-icon-btn
            v-if="item.files"
            class="table-action"
            icon="download"
            @click="downloadRowFiles(item.files)"
          ></wt-icon-btn>

          <wt-icon-btn
            class="table-action"
            icon="forks"
            @click="openItem(item)"
          ></wt-icon-btn>
        </template>
      </wt-table>

      <filter-pagination :is-next="isNext"/>

      <opened-call-popup
        v-if="isOpenedCallPopup"
        @close="closeCallPopup"
      ></opened-call-popup>

      <wt-player
        v-show="audioURL"
        :src="audioURL"
        @play="isPlayingNow = true"
        @close="closePlayer"
      ></wt-player>

      <media-select
        ref="media-select"
        v-show="isMediaSelectOpened"
        :files="mediaFiles"
        :currently-playing="currentlyPlaying"
        @play="play"
        @close="closeMedia"
      ></media-select>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import OpenedCallPopup from './opened-call/opened-call-popup.vue';
import FilterPagination from '../../../shared/filters/components/filter-pagination.vue';
import TableAgent from './_internals/table-templates/table-agent.vue';
import TableDirection from './_internals/table-templates/table-direction.vue';
import TableFrom from './_internals/table-templates/table-from.vue';
import TableGateway from './_internals/table-templates/table-gateway.vue';
import TableMember from './_internals/table-templates/table-member.vue';
import TableQueue from './_internals/table-templates/table-queue.vue';
import TableTeam from './_internals/table-templates/table-team.vue';
import TableTo from './_internals/table-templates/table-to.vue';
import TableUser from './_internals/table-templates/table-user.vue';
import MediaAction from './_internals/table-templates/table-media-action.vue';
import sortFilterMixin from '../../../shared/filters/mixins/sortFilterMixin';
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
    FilterPagination,
    TableAgent,
    TableDirection,
    TableFrom,
    TableGateway,
    TableMember,
    TableQueue,
    TableTeam,
    TableTo,
    TableUser,
    MediaAction,
  },

  watch: {
    '$route.query': {
      async handler() {
        await this.loadList();
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
        return this.headersValue.map((header) => ({
          ...header,
          text: this.$t(`fields.${header.value}`),
        }));
      },
      set(value) {
        this.setHeaders(value);
      },
    },
  },

  methods: {
    ...mapActions('history', {
      setHeaders: 'SET_HEADERS',
      loadList: 'LOAD_DATA_LIST',
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
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.table-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 100%;
  width: 100%;
  box-sizing: border-box;

  .wt-pagination {
    margin-top: 20px;
    margin-left: auto;
  }
}

.table-action {
  margin-left: 20px;

  &:first-child {
    margin-left: 0;
  }
}

.media-select {
  position: absolute;
  right: 28px;
}
</style>
