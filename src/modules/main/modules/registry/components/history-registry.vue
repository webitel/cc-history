<template>
  <div class="content-wrapper history-registry">
    <wt-loader v-show="isLoading"/>
    <div class="table-wrapper">
      <wt-table
        v-show="!isLoading"
        ref="wt-table"
        :headers="headers"
        :data="dataList"
        sortable
        @sort="sort"
      >
        <template slot="direction" slot-scope="{ item }">
          <table-direction :item="item"/>
        </template>
        <template slot="from" slot-scope="{ item }">
          <div v-if="item.from">{{ item.from.number }}</div>
        </template>
        <template slot="to" slot-scope="{ item }">
          <div v-if="item.to">{{ item.to.number }}</div>
        </template>
        <template slot="user" slot-scope="{ item }">
          <div v-if="item.user">{{ item.user.name }}</div>
        </template>
        <template slot="gateway" slot-scope="{ item }">
          <div v-if="item.gateway">{{ item.gateway.name }}</div>
        </template>
        <template slot="agent" slot-scope="{ item }">
          <div v-if="item.agent">{{ item.agent.name }}</div>
        </template>
        <template slot="team" slot-scope="{ item }">
          <div v-if="item.team">{{ item.team.name }}</div>
        </template>
        <template slot="queue" slot-scope="{ item }">
          <div v-if="item.queue">{{ item.queue.name }}</div>
        </template>
        <template slot="member" slot-scope="{ item }">
          <div v-if="item.member">{{ item.member.name }}</div>
        </template>
        <template slot="hangupDisposition" slot-scope="{ item }">
          <div v-if="item.hangupDisposition">
            {{ $t(`hangupDisposition.${item.hangupDisposition}`) }}
          </div>
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
            icon="download-record"
            icon-prefix="hs"
            @click="exportFiles(item.files)"
          ></wt-icon-btn>

          <router-link
            :to="`/${item.id}`"
            class="table-action"
          >
            <wt-icon
              icon-prefix="hs"
              icon="forks"
            ></wt-icon>
          </router-link>
        </template>
      </wt-table>
      <filter-pagination :is-next="isNext"/>

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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import exportFilesMixin from '@webitel/ui-sdk/src/modules/FilesExport/mixins/exportFilesMixin';
import sortFilterMixin from '@webitel/ui-sdk/src/modules/QueryFilters/mixins/sortFilterMixin';
import FilterPagination from '../modules/filters/components/filter-pagination/filter-pagination.vue';
import TableDirection from './table-templates/table-direction.vue';
import MediaAction from './table-templates/table-media-action.vue';
import historyHeadersMixin from '../mixins/historyHeadersMixin';
import showMediaMixin from '../mixins/media/showMediaMixin';

export default {
  name: 'history-registry',
  mixins: [
    historyHeadersMixin,
    sortFilterMixin,
    showMediaMixin,
    exportFilesMixin,
  ],
  components: {
    FilterPagination,
    TableDirection,
    MediaAction,
  },

  watch: {
    '$route.query': {
      handler() {
        this.loadList();
      },
    },
  },

  created() {
    this.initFilesExport({ filename: 'history-records' });
  },

  mounted() {
    this.loadList();
  },

  computed: {
    ...mapState('registry', {
      dataList: (state) => state.dataList,
      isLoading: (state) => state.isLoading,
      isNext: (state) => state.isNext,
    }),
  },

  methods: {
    ...mapActions('filters', {
      setFilterValue: 'SET_FILTER',
    }),
    ...mapActions('registry', {
      loadList: 'LOAD_DATA_LIST',
    }),
  },
};
</script>

<style lang="scss" scoped>
.table-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 100%;
  width: 100%;
  box-sizing: border-box;
}

.wt-pagination {
  margin-top: 20px;
  margin-left: auto;
}

.table-action {
  margin-left: var(--spacing-xs);

  &:first-child {
    margin-left: 0;
  }
}

.media-select {
  position: absolute;
  right: 28px;
}
</style>
