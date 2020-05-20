<template>
  <section class="history-section history-main">
    <loader v-if="isLoading"/>
    <grid-table
      v-else
      ref="grid-table"
      :headers="headers"
      :data="data"
      expanded
      @sort="sort"
    >
      <template slot="actions-header">
        <filter-fields v-model="headers"/>
      </template>

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

      <template slot="pagination">
        <filter-pagination :is-next="isNext"/>
      </template>

    </grid-table>
    <audio-player
      v-show="audioURL"
      :file="audioURL"
      @play="isPlayingNow = true"
      @close="closePlayer"
    ></audio-player>

    <media-select
      ref="media-select"
      v-show="isMediaSelectOpened"
      :files="mediaFiles"
      :currently-playing="currentlyPlaying"
      @play="play"
      @close="closeMedia"
    >
    </media-select>
  </section>
</template>

<script>
  import GridTable from '../../utils/grid-table.vue';
  import ExpansionCallInfo from './grid-templates/expansion-call-info.vue';
  import FilterFields from './filters/filter-table-fields.vue';
  import FilterPagination from './filters/filter-pagination.vue';
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
  import sortFilterMixin from '../../../mixins/filters/sortFilterMixin/sortFilterMixin';
  import loadHistoryMixin from '../../../mixins/loadHistory/loadHistoryMixin';
  import downloadRowFilesMixin from '../../../mixins/files/downloadFiles/downloadRowFilesMixin';
  import playMediaMixin from '../../../mixins/files/mediaMixins/playMediaMixin';
  import showMediaMixin from '../../../mixins/files/mediaMixins/showMediaMixin';

  export default {
    name: 'the-history-main',
    mixins: [
      loadHistoryMixin,
      sortFilterMixin,
      playMediaMixin,
      showMediaMixin,
      downloadRowFilesMixin,
    ],
    components: {
      GridTable,
      ExpansionCallInfo,
      FilterFields,
      FilterPagination,
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
  };
</script>

<style lang="scss" scoped>
  .history-main {
    position: relative;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    padding: calcRem(20px) calcRem(30px);
  }

  .table-action {
    margin-left: calcRem(20px);

    &:first-child {
      margin-left: 0;
    }
  }

  .expansion-call-info,
  .expansion__comments {
    flex: 0 0 50%;
  }

  .expansion__comments {
    margin-left: calcRem(60px);
  }

  .agent-comment {
    display: flex;

    &__pic {
      width: calcRem(60px);
      height: calcRem(60px);
      flex: 0 0 calcRem(60px);
      margin-right: calcRem(20px);
    }

    &__comment {
      &__heading {
        @extend .typo-heading-sm;
        margin-bottom: calcRem(10px);
      }

      &__text {
        @extend .typo-body-md;
      }
    }
  }

  .media-select {
    position: absolute;
    right: 28px;
  }
</style>
