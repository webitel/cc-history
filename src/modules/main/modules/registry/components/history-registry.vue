<template>
  <div class="content-wrapper history-registry">
    <stt-popup
      v-if="sttPopupCallId"
      :call-id="sttPopupCallId"
      @delete="handleTranscriptDelete({ callId: sttPopupCallId, transcript: $event })"
      @close="sttPopupCallId = null"
    />
    <wt-loader v-show="isLoading" />
    <wt-dummy
      v-if="dummyValue && !isLoading"
      :src="dummyValue.src"
      :text="dummyValue.text"
      class="history-registry__dummy"
    />
    <div
      v-else
      class="table-wrapper"
    >
      <wt-table
        v-show="!isLoading"
        ref="wt-table"
        :data="dataList"
        :headers="headers"
        sortable
        @sort="sort"
      >
        <template #direction="{ item }">
          <table-direction :item="item" />
        </template>
        <template #from="{ item }">
          <div v-if="item.from">
            {{ item.from.number }}
          </div>
        </template>
        <template #to="{ item }">
          <div v-if="item.to">
            {{ item.to.number }}
          </div>
        </template>
        <template #user="{ item }">
          <div v-if="item.user">
            {{ item.user.name }}
          </div>
        </template>
        <template #gateway="{ item }">
          <div v-if="item.gateway">
            {{ item.gateway.name }}
          </div>
        </template>
        <template #agent="{ item }">
          <div v-if="item.agent">
            {{ item.agent.name }}
          </div>
        </template>
        <template #team="{ item }">
          <div v-if="item.team">
            {{ item.team.name }}
          </div>
        </template>
        <template #queue="{ item }">
          <div v-if="item.queue">
            {{ item.queue.name }}
          </div>
        </template>
        <template #member="{ item }">
          <div v-if="item.member">
            {{ item.member.name }}
          </div>
        </template>
        <template #grantee="{ item }">
          <div v-if="item.grantee">
            {{ item.grantee.name }}
          </div>
        </template>
        <template #ratedBy="{ item }">
          <div v-if="item.ratedBy">
            {{ item.ratedBy.name }}
          </div>
        </template>
        <template #memberId="{ item }">
          <div v-if="item.member">
            {{ item.member.id }}
          </div>
        </template>
        <template #contact="{ item }">
          <div v-if="item.contact">
            {{ item.contact.name }}
          </div>
        </template>
        <template #hangupDisposition="{ item }">
          <div v-if="item.hangupDisposition">
            {{ $t(`hangupDisposition.${item.hangupDisposition}`) }}
          </div>
        </template>
        <template
          v-for="header in variableHeaders"
          #[header.field]="{ item }"
        >
          {{ get(item, header.field) }}
        </template>

        <template #actions="{ item }">
          <media-action
            v-if="item.files"
            :currently-playing="currentlyPlaying"
            :files="item.files"
            class="table-action"
            @play="play"
            @stop="closePlayer"
          />

          <!--          v-if transcript can be added, exists, or already in progress -->
          <stt-action
            v-if="showItemStt(item)"
            :item="item"
            class="table-action"
            @open="sttPopupCallId = item.id"
          />

          <router-link
            :to="`/${item.id}`"
            class="table-action"
          >
            <wt-icon-btn
              icon="forks"
              icon-prefix="hs"
            />
          </router-link>
        </template>
      </wt-table>
      <filter-pagination :is-next="isNext" />

      <wt-player
        v-show="audioURL"
        :src="audioURL"
        @close="closePlayer"
        @play="isPlayingNow = true"
      />
    </div>
  </div>
</template>

<script>
import sortFilterMixin from '@webitel/ui-sdk/src/modules/QueryFilters/mixins/sortFilterMixin';
import { mapActions, mapGetters, mapState } from 'vuex';
import get from 'lodash/get';
import historyHeadersMixin from '../mixins/historyHeadersMixin';
import playMediaMixin from '../mixins/media/playMediaMixin';
import FilterPagination from '../modules/filters/components/filter-pagination/filter-pagination.vue';
import SttAction from '../modules/stt/components/registry/table-stt-action.vue';
import TableDirection from './table-templates/table-direction.vue';
import MediaAction from './table-templates/table-media-action.vue';
import DummyLight from '../../../../../app/assets/dummy/hs-dummy-light.svg';
import DummyDark from '../../../../../app/assets/dummy/hs-dummy-dark.svg';
import DummyAfterSearchLight from '../../../../../app/assets/dummy/hs-dummy-after-search-light.svg';
import DummyAfterSearchDark from '../../../../../app/assets/dummy/hs-dummy-after-search-dark.svg';
import SttPopup from '../modules/stt/components/registry/stt-popup.vue';

export default {
  name: 'HistoryRegistry',
  components: {
    FilterPagination,
    TableDirection,
    MediaAction,
    SttAction,
    SttPopup,
  },
  mixins: [
    historyHeadersMixin,
    sortFilterMixin,
    playMediaMixin,
  ],
  data: () => ({
    sttPopupCallId: null,
  }),
  computed: {
    variableHeaders() {
      return this.headers.filter((header) => header.value.includes('variables.'));
    },
    ...mapState('registry', {
      dataList: (state) => state.dataList,
      isLoading: (state) => state.isLoading,
      isNext: (state) => state.isNext,
    }),
    ...mapGetters('appearance', {
      darkMode: 'DARK_MODE',
    }),
    dummyValue() {
      if (!this.dataList.length) {
        if (Object.values(this.$route.query).some((query) => query.length)) {
          return {
            src: this.darkMode ? DummyAfterSearchDark : DummyAfterSearchLight,
            text: this.$t('dashboards.empty.resultSearch'),
          };
        }
        return {
          src: this.darkMode ? DummyDark : DummyLight,
          text: this.$t('dashboards.empty.workspace'),
        };
      }
      return '';
    },
  },

  methods: {
    get, // lodash get
    ...mapActions('filters', {
      setFilterValue: 'SET_FILTER',
    }),
    ...mapActions('registry', {
      loadList: 'LOAD_DATA_LIST',
      setHeaders: 'SET_HEADERS',
    }),
    handleTranscriptDelete({ callId, transcript }) {
      const call = this.dataList.find(({ id }) => id === callId);
      // should find transcript instead of indexOf cause transcript source is not that call
      call.transcripts.splice(call.transcripts.findIndex(({ id }) => id === transcript.id), 1);
    },
    showItemStt(item) {
      return item.files || item.transcripts?.length || item.filesJob;
    },
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
    this.setHeaders(this.headers);
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
    background: var(--content-wrapper-color);
  }

  &:nth-child(2n) {
    .wt-table__td__actions {
      background: var(--wt-table-zebra-color);
    }
  }
}
</style>
