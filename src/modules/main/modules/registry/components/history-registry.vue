<template>
  <div class="content-wrapper history-registry">
    <wt-loader v-show="isLoading" />
    <div class="table-wrapper">
      <wt-table
        v-show="!isLoading"
        ref="wt-table"
        :data="dataList"
        :headers="headers"
        sortable
        @sort="sort"
      >
        <template slot="direction" slot-scope="{ item }">
          <table-direction :item="item" />
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
        <template slot="grantee" slot-scope="{ item }">
          <div v-if="item.grantee">{{ item.grantee.name }}</div>
        </template>
        <template slot="hangupDisposition" slot-scope="{ item }">
          <div v-if="item.hangupDisposition">
            {{ $t(`hangupDisposition.${item.hangupDisposition}`) }}
          </div>
        </template>

        <template slot="actions" slot-scope="{ item }">
          <media-action
            v-if="item.files"
            :currently-playing="currentlyPlaying"
            :files="item.files"
            @play="play"
            @stop="closePlayer"
            class="table-action"
          ></media-action>

<!--          v-if transcript can be added, exists, or already in progress -->
          <stt-action
            v-if="showItemStt(item)"
            class="table-action"
            :item="item"
            @delete="handleTranscriptDelete({ call: item, transcript: $event })"
          ></stt-action>

          <router-link
            :to="`/${item.id}`"
            class="table-action"
          >
            <wt-icon
              icon="forks"
              icon-prefix="hs"
            ></wt-icon>
          </router-link>
        </template>
      </wt-table>
      <filter-pagination :is-next="isNext" />

      <wt-player
        v-show="audioURL"
        :src="audioURL"
        @close="closePlayer"
        @play="isPlayingNow = true"
      ></wt-player>
    </div>
  </div>
</template>

<script>
import sortFilterMixin from '@webitel/ui-sdk/src/modules/QueryFilters/mixins/sortFilterMixin';
import { mapActions, mapState } from 'vuex';
import historyHeadersMixin from '../mixins/historyHeadersMixin';
import playMediaMixin from '../mixins/media/playMediaMixin';
import FilterPagination from '../modules/filters/components/filter-pagination/filter-pagination.vue';
import TableDirection from './table-templates/table-direction.vue';
import MediaAction from './table-templates/table-media-action.vue';
import SttAction from '../modules/stt/components/registry/table-stt-action.vue';

export default {
  name: 'history-registry',
  mixins: [
    historyHeadersMixin,
    sortFilterMixin,
    playMediaMixin,
  ],
  components: {
    FilterPagination,
    TableDirection,
    MediaAction,
    SttAction,
  },

  watch: {
    '$route.query': {
      handler() {
        this.loadList();
      },
    },
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
    handleTranscriptDelete({ call, transcript }) {
      // should find transcript instead of indexOf cause transcript source is not that call
      call.transcripts.splice(call.transcripts.findIndex(({ id }) => id === transcript.id), 1);
    },
    showItemStt(item) {
      return item.files || item.transcripts?.length || item.filesJob;
    },
  },
};
</script>

<style lang="scss" scoped>
.table-wrapper {
  position: relative;
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
}

.wt-pagination {
  margin-top: 20px;
  margin-left: auto;
}

.table-action {
  line-height: 0;
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
