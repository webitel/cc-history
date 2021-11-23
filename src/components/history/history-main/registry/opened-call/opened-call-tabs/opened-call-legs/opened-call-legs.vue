<template>
  <section class="opened-call-legs">
    <wt-loader v-show="isLoading"/>
    <div class="table-wrapper" v-show="!isLoading">
      <wt-table
        ref="call-legs-table"
        :headers="headers"
        :data="tableData"
        :selectable="false"
        :grid-actions="false"
      >
        <template slot="direction" slot-scope="{ item }">
          <table-direction :item="item"/>
        </template>
        <template slot="from" slot-scope="{ item }">
          <div v-if="item.from">{{item.from.number}}</div>
        </template>
        <template slot="to" slot-scope="{ item }">
          <div v-if="item.to">{{item.to.number}}</div>
        </template>
        <template slot="user" slot-scope="{ item }">
          <div v-if="item.user">{{item.user.name}}</div>
        </template>
        <template slot="gateway" slot-scope="{ item }">
          <div v-if="item.gateway">{{item.gateway.name}}</div>
        </template>
        <template slot="agent" slot-scope="{ item }">
          <div v-if="item.agent">{{item.agent.name}}</div>
        </template>
        <template slot="team" slot-scope="{ item }">
          <div v-if="item.team">{{item.team.name}}</div>
        </template>
        <template slot="queue" slot-scope="{ item }">
          <div v-if="item.queue">{{item.queue.name}}</div>
        </template>
        <template slot="member" slot-scope="{ item }">
          <div v-if="item.member">{{item.member.name}}</div>
        </template>
        <template slot="legMarker" slot-scope="{ item }">
          <wt-icon
            v-if="!item.parentId"
            class="icon__leg-marker"
            icon-prefix="hs"
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
                icon-prefix="hs"
                @mouseenter.native="highlightRow([item.transferFrom])"
                @mouseleave.native="highlightRow([item.transferFrom])"
              ></wt-icon>
              <wt-tooltip>{{ $t('registry.openedCall.transferFrom') }}</wt-tooltip>
            </div>
            <div
              class="transfer-icon"
              :class="{'hidden': !item.transferFrom || !item.transferTo}"
            >
              <wt-icon
                class="table-action"
                icon="transfer-merge"
                icon-prefix="hs"
                @mouseenter.native="highlightRow([item.transferFrom, item.transferTo])"
                @mouseleave.native="highlightRow([item.transferFrom, item.transferTo])"
              ></wt-icon>
              <wt-tooltip>{{ $t('registry.openedCall.transferMerge') }}</wt-tooltip>
            </div>
            <div
              class="transfer-icon"
              :class="{'hidden': !item.transferTo}"
            >
              <wt-icon
                class="table-action"
                icon="transfer-to"
                icon-prefix="hs"
                @mouseenter.native="highlightRow([item.transferTo])"
                @mouseleave.native="highlightRow([item.transferTo])"
              ></wt-icon>
              <wt-tooltip>{{ $t('registry.openedCall.transferTo') }}</wt-tooltip>
            </div>
          </div>
        </template>
      </wt-table>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import TableDirection from '../../../_internals/table-templates/table-direction.vue';

export default {
  name: 'opened-call-legs',
  components: {
    TableDirection,
  },

  created() {
    this.loadList();
  },

  computed: {
    ...mapState('registry/opened-call', {
      legsData: (state) => state.legsData,
      mainCall: (state) => state.mainCall,
      isLoading: (state) => state.isLegsDataLoading,
    }),
    ...mapGetters('registry/opened-call', {
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
    ...mapActions('registry/opened-call', {
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
