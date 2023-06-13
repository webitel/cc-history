<template>
  <div class="content-wrapper history-registry">
    <wt-loader v-show="isLoading" />
    <wt-dummy
      v-if="isEmptyWorkspace && !isLoading"
      :src="hsDummy"
      :locale="$t('dashboards.empty.workspace')"
      class="history-registry__dummy"
    ></wt-dummy>
    <wt-dummy
      v-if="isEmptyWorkspaceAfterSearch && !isLoading"
      :src="hsDummyAfterSearch"
      :locale="$t('dashboards.empty.description')"
      class="history-registry__dummy"
    ></wt-dummy>
    <div v-if="!isEmptyWorkspace && !isEmptyWorkspaceAfterSearch" class="table-wrapper">
      <wt-table
        v-show="!isLoading"
        ref="wt-table"
        :data="dataList"
        :headers="headers"
        sortable
        @sort="sort"
      >
        <template v-slot:direction="{ item }">
          <table-direction :item="item" />
        </template>
        <template v-slot:from="{ item }">
          <div v-if="item.from">{{ item.from.number }}</div>
        </template>
        <template v-slot:to="{ item }">
          <div v-if="item.to">{{ item.to.number }}</div>
        </template>
        <template v-slot:user="{ item }">
          <div v-if="item.user">{{ item.user.name }}</div>
        </template>
        <template v-slot:gateway="{ item }">
          <div v-if="item.gateway">{{ item.gateway.name }}</div>
        </template>
        <template v-slot:agent="{ item }">
          <div v-if="item.agent">{{ item.agent.name }}</div>
        </template>
        <template v-slot:team="{ item }">
          <div v-if="item.team">{{ item.team.name }}</div>
        </template>
        <template v-slot:queue="{ item }">
          <div v-if="item.queue">{{ item.queue.name }}</div>
        </template>
        <template v-slot:member="{ item }">
          <div v-if="item.member">{{ item.member.name }}</div>
        </template>
        <template v-slot:grantee="{ item }">
          <div v-if="item.grantee">{{ item.grantee.name }}</div>
        </template>
        <template v-slot:ratedBy="{ item }">
          <div v-if="item.ratedBy">{{ item.ratedBy.name }}</div>
        </template>
        <template v-slot:memberId="{ item }">
          <div v-if="item.member">{{ item.member.id }}</div>
        </template>
        <template v-slot:hangupDisposition="{ item }">
          <div v-if="item.hangupDisposition">
            {{ $t(`hangupDisposition.${item.hangupDisposition}`) }}
          </div>
        </template>

        <template v-slot:actions="{ item }">
          <media-action
            v-if="item.files"
            :currently-playing="currentlyPlaying"
            :files="item.files"
            class="table-action"
            @play="play"
            @stop="closePlayer"
          ></media-action>

          <!--          v-if transcript can be added, exists, or already in progress -->
          <stt-action
            v-if="showItemStt(item)"
            :item="item"
            class="table-action"
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
import isEmpty from '@webitel/ui-sdk/src/scripts/isEmpty';
import { mapActions, mapState } from 'vuex';
import historyHeadersMixin from '../mixins/historyHeadersMixin';
import playMediaMixin from '../mixins/media/playMediaMixin';
import FilterPagination from '../modules/filters/components/filter-pagination/filter-pagination.vue';
import SttAction from '../modules/stt/components/registry/table-stt-action.vue';
import TableDirection from './table-templates/table-direction.vue';
import MediaAction from './table-templates/table-media-action.vue';
import HsDummy from '../../../../../app/assets/icons/dummy/hs-dummy.svg';
import HsDummyAfterSearch from '../../../../../app/assets/icons/dummy/hs-dummy-after-search.svg';

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
  data: () => ({
    isEmptyWorkspace: false,
    isEmptyWorkspaceAfterSearch: false,
  }),
  watch: {
    '$route.query': {
      async handler() {
        await this.loadList();
        this.isEmptyWorkspaceAfterSearch = !this.dataList.length ? true : false;
      },
    },
  },

  async mounted() {
    await this.loadList();
    if (!isEmpty(this.$route.query) && !this.dataList.length) return this.isEmptyWorkspaceAfterSearch = true;
    if (!this.dataList.length) this.isEmptyWorkspace = true;
  },
  unmounted() {
    this.isEmptyWorkspaceAfterSearch = false;
    this.isEmptyWorkspace = false;
  },
  computed: {
    ...mapState('registry', {
      dataList: (state) => state.dataList,
      isLoading: (state) => state.isLoading,
      isNext: (state) => state.isNext,
    }),
    hsDummy() {
      return HsDummy;
    },
    hsDummyAfterSearch() {
      return HsDummyAfterSearch;
    },
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
.history-registry__dummy {
  height: 50vh;
}

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
  margin-left: var(--spacing-xs);
  line-height: 0;

  &:first-child {
    margin-left: 0;
  }
}

.media-select {
  position: absolute;
  right: 28px;
}

// make action icons fixed to right
.wt-table ::v-deep .wt-table__tr {
  .wt-table__td__actions {
    position: sticky;
    right: 0;
    background: var(--main-color);
  }

  &:nth-child(2n) {
    .wt-table__td__actions {
      background: var(--table-secondary-color);
    }
  }
}
</style>
