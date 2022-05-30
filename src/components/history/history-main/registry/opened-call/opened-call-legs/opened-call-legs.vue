<template>
  <section class="opened-call-legs">
    <wt-loader v-show="isLoading" />
    <div v-show="!isLoading" class="table-wrapper">
      <wt-table
        ref="call-legs-table"
        :data="tableData"
        :grid-actions="false"
        :headers="headers"
        :selectable="false"
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
        <template slot="hangupDisposition" slot-scope="{ item }">
          <div v-if="item.hangupDisposition">
            {{ $t(`hangupDisposition.${item.hangupDisposition}`) }}
          </div>
        </template>
        <template slot="legMarker" slot-scope="{ item }">
          <wt-icon
            v-if="!item.parentId"
            class="icon__leg-marker"
            icon="leg-a-marker"
            icon-prefix="hs"
            size="sm"
          ></wt-icon>
        </template>
        <template slot="transfers" slot-scope="{ item }">
          <div class="transfers-wrap">
            <wt-tooltip
              :class="{'hidden': !item.transferFrom}"
              class="transfer-icon"
            >
              <template v-slot:activator>
                <wt-icon
                  class="table-action"
                  icon="transfer-from"
                  icon-prefix="hs"
                  @mouseenter.native="highlightRow([item.transferFrom])"
                  @mouseleave.native="highlightRow([item.transferFrom])"
                ></wt-icon>
              </template>
              {{ $t('registry.openedCall.transferFrom') }}
            </wt-tooltip>

            <wt-tooltip
              :class="{'hidden': !item.transferFrom || !item.transferTo}"
              class="transfer-icon"
            >
              <template v-slot:activator>
                <wt-icon
                  class="table-action"
                  icon="transfer-merge"
                  icon-prefix="hs"
                  @mouseenter.native="highlightRow([item.transferFrom, item.transferTo])"
                  @mouseleave.native="highlightRow([item.transferFrom, item.transferTo])"
                ></wt-icon>
              </template>
              {{ $t('registry.openedCall.transferMerge') }}
            </wt-tooltip>

            <wt-tooltip
              :class="{'hidden': !item.transferTo}"
              class="transfer-icon"
            >
              <template v-slot:activator>
                <wt-icon
                  class="table-action"
                  icon="transfer-to"
                  icon-prefix="hs"
                  @mouseenter.native="highlightRow([item.transferTo])"
                  @mouseleave.native="highlightRow([item.transferTo])"
                ></wt-icon>
              </template>
              {{ $t('registry.openedCall.transferTo') }}
            </wt-tooltip>
          </div>
        </template>
      </wt-table>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import TableDirection from '../../_internals/table-templates/table-direction.vue';

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
  font-weight: 600;
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
    background: var(--accent-secondary-color);
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
  top: 0;
  left: 0;
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
}
</style>
