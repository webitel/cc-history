<template>
  <section class="opened-call-legs">
    <loader v-if="isLoading"/>
    <grid-table
      v-else
      ref="call-legs-table"
      :headers="headers"
      :data="tableData"
      :grid-actions="false"
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
      <template slot="legMarker" slot-scope="{ item }">
        <icon
          v-if="!item.parentId"
          class="icon icon__leg-marker sm"
        >
          <svg class="icon sm">
            <use xlink:href="#icon-leg-a_sm"></use>
          </svg>
        </icon>
      </template>
      <template slot="transfers" slot-scope="{ item }">
        <div class="transfers-wrap">
          <div
            class="transfer-icon"
            :class="{'hidden': !item.transferFrom}"
          >
            <icon-btn
              class="table-action"
              :icon="'transfer-from'"
              @mouseenter.native="highlightRow([item.transferFrom])"
              @mouseleave.native="highlightRow([item.transferFrom])"
            ></icon-btn>
            <tooltip>{{$t('openedCall.transferFrom')}}</tooltip>
          </div>
          <div
            class="transfer-icon"
            :class="{'hidden': !item.transferFrom || !item.transferTo}"
          >
            <icon-btn
              class="table-action"
              :icon="'transfer-merge'"
              @mouseenter.native="highlightRow([item.transferFrom, item.transferTo])"
              @mouseleave.native="highlightRow([item.transferFrom, item.transferTo])"
            ></icon-btn>
            <tooltip>{{$t('openedCall.transferMerge')}}</tooltip>
          </div>
          <div
            class="transfer-icon"
            :class="{'hidden': !item.transferTo}"
          >
            <icon-btn
              class="table-action"
              :icon="'transfer-to'"
              @mouseenter.native="highlightRow([item.transferTo])"
              @mouseleave.native="highlightRow([item.transferTo])"
            ></icon-btn>
            <tooltip>{{$t('openedCall.transferTo')}}</tooltip>
          </div>
        </div>
      </template>
    </grid-table>
  </section>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex';
  import GridTable from '../../../../utils/grid-table.vue';
  import Tooltip from '../../../../utils/tooltip.vue';
  import Loader from '../../../../utils/loader.vue';
  import GridAgent from '../../grid-templates/grid-agent.vue';
  import GridDirection from '../../grid-templates/grid-direction.vue';
  import GridFrom from '../../grid-templates/grid-from.vue';
  import GridGateway from '../../grid-templates/grid-gateway.vue';
  import GridMember from '../../grid-templates/grid-member.vue';
  import GridQueue from '../../grid-templates/grid-queue.vue';
  import GridTeam from '../../grid-templates/grid-team.vue';
  import GridTo from '../../grid-templates/grid-to.vue';
  import GridUser from '../../grid-templates/grid-user.vue';
  import playMediaMixin from '../../../../../mixins/media/playMediaMixin';
  import showMediaMixin from '../../../../../mixins/media/showMediaMixin';
  import downloadRowFilesMixin from '../../../../../mixins/downloadFiles/downloadRowFilesMixin';

  export default {
    name: 'opened-call-legs',
    components: {
      GridTable,
      Tooltip,
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
    },
    mixins: [
      playMediaMixin,
      showMediaMixin,
      downloadRowFilesMixin,
    ],

    created() {
      this.loadDataList();
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
        loadDataList: 'LOAD_LEGS_DATA_LIST',
      }),

      highlightRow(ids) {
        ids.forEach((id) => {
          const table = this.$refs['call-legs-table'];
          const className = `grid__tr__${id}`;
          const row = table.$el.querySelector(`.${className}`);
          if (row) {
            if (row.classList.contains('grid__tr--highlighted')) {
              row.classList.remove('grid__tr--highlighted');
            } else {
              row.classList.add('grid__tr--highlighted');
            }
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  $row-highlight-bg-color: #FFF9E6;

  // make 1st row (aka main parent) bold
  ::v-deep .grid__row-wrap:first-child .grid__td > div {
    font-family: 'Montserrat Semi', sans-serif;
  }

  // blinking animation to highlighted row
  ::v-deep .grid__tr--highlighted {
    animation: row-bg-blinking 1s linear infinite;
  }

  // row animation at transfer icon hover
  @keyframes row-bg-blinking {
    0% {
      background: #fff;
    }
    50% {
      background: $row-highlight-bg-color;
    }
    100% {
      background: #fff;
    }
  }


  // making row relative for leg marker positioning
  ::v-deep .grid__tr {
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

    .tooltip {
      top: 50%;
      right: calc(100% + 10px);
      white-space: nowrap; // prevent break between words
      transform: translate(0, -50%);
    }

    &:hover .tooltip {
      opacity: 1;
      pointer-events: auto;
    }
  }
</style>
