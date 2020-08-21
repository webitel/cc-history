<template>
  <section class="opened-call-legs">
    <wt-loader v-show="isLoading"/>
    <div class="table-wrapper" v-show="!isLoading">
      <wt-table
        ref="call-legs-table"
        :headers="headers"
        :data="tableData"
        :grid-actions="false"
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
        <template slot="legMarker" slot-scope="{ item }">
          <wt-icon
            v-if="!item.parentId"
            class="icon__leg-marker"
            icon="leg-a-marker"
            size="sm"
          ></wt-icon>
        </template>
        <template slot="transfers" slot-scope="{ item }">
          <div class="transfers-wrap">
            <div
              class="transfer-icon"
              :class="{'hidden': !item.transferFrom}"
            >
              <wt-icon
                class="table-action"
                icon="transfer-from"
                @mouseenter.native="highlightRow([item.transferFrom])"
                @mouseleave.native="highlightRow([item.transferFrom])"
              ></wt-icon>
              <wt-tooltip>{{ $t('openedCall.transferFrom') }}</wt-tooltip>
            </div>
            <div
              class="transfer-icon"
              :class="{'hidden': !item.transferFrom || !item.transferTo}"
            >
              <wt-icon
                class="table-action"
                icon="transfer-merge"
                @mouseenter.native="highlightRow([item.transferFrom, item.transferTo])"
                @mouseleave.native="highlightRow([item.transferFrom, item.transferTo])"
              ></wt-icon>
              <wt-tooltip>{{ $t('openedCall.transferMerge') }}</wt-tooltip>
            </div>
            <div
              class="transfer-icon"
              :class="{'hidden': !item.transferTo}"
            >
              <wt-icon
                class="table-action"
                icon="transfer-to"
                @mouseenter.native="highlightRow([item.transferTo])"
                @mouseleave.native="highlightRow([item.transferTo])"
              ></wt-icon>
              <wt-tooltip>{{ $t('openedCall.transferTo') }}</wt-tooltip>
            </div>
          </div>
        </template>
      </wt-table>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import TableAgent from '../../_internals/table-templates/table-agent.vue';
import TableDirection from '../../_internals/table-templates/table-direction.vue';
import TableFrom from '../../_internals/table-templates/table-from.vue';
import TableGateway from '../../_internals/table-templates/table-gateway.vue';
import TableMember from '../../_internals/table-templates/table-member.vue';
import TableQueue from '../../_internals/table-templates/table-queue.vue';
import TableTeam from '../../_internals/table-templates/table-team.vue';
import TableTo from '../../_internals/table-templates/table-to.vue';
import TableUser from '../../_internals/table-templates/table-user.vue';
import playMediaMixin from '../../../../../mixins/media/playMediaMixin';
import showMediaMixin from '../../../../../mixins/media/showMediaMixin';
import downloadRowFilesMixin from '../../../../../mixins/downloadFiles/downloadRowFilesMixin';

export default {
  name: 'opened-call-legs',
  components: {
    TableAgent,
    TableDirection,
    TableFrom,
    TableGateway,
    TableMember,
    TableQueue,
    TableTeam,
    TableTo,
    TableUser,
  },
  mixins: [
    playMediaMixin,
    showMediaMixin,
    downloadRowFilesMixin,
  ],

  created() {
    this.loadList();
  },

  computed: {
    ...mapState('history/opened-call', {
      legsData: (state) => state.legsData,
      mainCall: (state) => state.mainCall,
      isLoading: (state) => state.isLegsDataLoading,
    }),
    ...mapGetters('history/opened-call', {
      headers: 'HEADERS',
    }),

    tableData() {
      return [
        this.mainCall,
        ...this.legsData,
      ];
    },
  },

  methods: {
    ...mapActions('history/opened-call', {
      loadList: 'LOAD_LEGS_DATA_LIST',
    }),

    highlightRow(ids) {
      ids.forEach((id) => {
        const table = this.$refs['call-legs-table'];
        const className = `wt-table__tr__${id}`;
        const row = table.$el.querySelector(`.${className}`);
        if (row) {
          if (row.classList.contains('wt-table__tr--highlighted')) {
            row.classList.remove('wt-table__tr--highlighted');
          } else {
            row.classList.add('wt-table__tr--highlighted');
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>

// make 1st row (aka main parent) bold
::v-deep .wt-table__row-wrap:first-child .wt-table__td > div {
  font-family: 'Montserrat Semi', sans-serif;
}

// blinking animation to highlighted row
::v-deep .wt-table__tr--highlighted {
  animation: row-bg-blinking 1s linear infinite;
}

// row animation at transfer icon hover
@keyframes row-bg-blinking {
  0% {
    background: #fff;
  }
  50% {
    background: var(--main-option-hover-color);
  }
  100% {
    background: #fff;
  }
}

// making row relative for leg marker positioning
::v-deep .wt-table__tr {
  position: relative;
}

// "A" leg marker positioning to left top corner of its row
.icon__leg-marker {
  position: absolute;
  left: 0;
  top: 0;
}

// transfer icons container
.transfers-wrap {
  display: flex;
  align-items: center;
}

// transfer icon btn container
.transfer-icon {
  position: relative;

  // separate icons for proper animation
  &:nth-child(2) {
    margin: 0 3px;
  }

  .wt-tooltip {
    position: absolute;
    top: 50%;
    right: calc(100% + 10px);
    white-space: nowrap; // prevent break between words
    transform: translate(0, -50%);
  }

  &:hover .wt-tooltip {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
