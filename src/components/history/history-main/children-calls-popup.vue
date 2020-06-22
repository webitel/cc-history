<template>
  <popup-container @close="$emit('close')">
    <template slot="popup-main">
      <div class="popup-grid-wrap">
        <loader v-if="isLoading"/>
        <grid-table
          v-else
          ref="grid-table"
          :headers="headers"
          :data="data"
          expanded
          :selectable="false"
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
          </template>

          <template slot="row-expansion" slot-scope="{ item }">
            <div class="expansion__content-wrap">
              <expansion-call-info :item="item"></expansion-call-info>
            </div>
          </template>
        </grid-table>
      </div>
    </template>

    <template slot="popup-footer">
      <btn
        class="secondary"
        @click.native="$emit('close')"
      >{{$t('reusable.close')}}
      </btn>
    </template>
  </popup-container>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import GridTable from '../../utils/grid-table.vue';
  import PopupContainer from '../../utils/popup-container.vue';
  import Btn from '../../utils/btn.vue';
  import ExpansionCallInfo from './grid-templates/expansion-call-info.vue';
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
  import playMediaMixin from '../../../mixins/media/playMediaMixin';
  import showMediaMixin from '../../../mixins/media/showMediaMixin';
  import downloadRowFilesMixin from '../../../mixins/downloadFiles/downloadRowFilesMixin';

  export default {
    name: 'history-table-popup',
    components: {
      GridTable,
      PopupContainer,
      Btn,
      ExpansionCallInfo,
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
    mixins: [
      playMediaMixin,
      showMediaMixin,
      downloadRowFilesMixin,
    ],

    created() {
      this.loadDataList();
    },

    computed: {
      ...mapState('history/children-calls', {
        data: (state) => state.data,
        headers: (state) => state.headers,
        isLoading: (state) => state.isLoading,
      }),
    },

    methods: {
      ...mapActions('history/children-calls', {
        loadDataList: 'LOAD_DATA_LIST',
      }),
    },
  };
</script>

<style lang="scss" scoped>
  .popup-grid-wrap {
    width: 80vw;
  }

  .cc-btn {
    min-width: 100px;
    margin: auto;
  }
</style>
