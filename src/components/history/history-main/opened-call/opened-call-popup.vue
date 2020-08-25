<template>
  <wt-popup @close="$emit('close')">
    <template slot="header">
      <wt-tabs
        v-model="currentTab"
        :tabs="tabs"
      ></wt-tabs>
      <div class="opened-call__actions-wrap">
        <wt-button
          color="primary"
          :loading="isCSVLoading"
          @click="downloadCSV"
        >{{$t('headerSection.exportCSV')}}
        </wt-button>
      </div>
    </template>

    <template slot="main">
      <wt-loader v-show="isLoading"/>
      <component v-show="!isLoading" :is="currentTab.value"/>
    </template>
  </wt-popup>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
  import CallInfo from './opened-call-tabs/opened-call-info.vue';
  import CallLegs from './opened-call-tabs/opened-call-legs.vue';
  import downloadCSVMixin from '../../../../mixins/downloadCSV/downloadCSVMixin';

  export default {
    name: 'opened-item-popup',
    mixins: [downloadCSVMixin],
    components: {
      CallInfo,
      CallLegs,
    },

    data: () => ({
      currentTab: {
        value: 'call-info',
      },
    }),

    computed: {
      ...mapState('history/opened-call', {
        mainCall: (state) => state.mainCall,
        isLoading: (state) => state.isLoading,
      }),
      ...mapGetters('history/opened-call', {
        dataFields: 'DATA_FIELDS',
        selectedItems: 'SELECTED_DATA_ITEMS',
      }),

      tabs() {
        const callInfo = {
          text: this.$t('openedCall.callInfo'),
          value: 'call-info',
        };
        const callLegs = {
          text: this.$t('openedCall.callLegs'),
          value: 'call-legs',
        };
        const tabs = [callInfo];
        if (this.mainCall.hasChildren) tabs.push(callLegs);
        return tabs;
      },
    },
    methods: {
      ...mapActions('history/opened-call', {
        fetchDownloadList: 'FETCH_DOWNLOAD_LIST', // files and csv download
      }),
    },
  };
</script>

<style lang="scss" scoped>
  ::v-deep .wt-popup__popup {
    width: calc(100vw - 100px);
    max-height: calc(100vh - 100px);
  }

  .opened-call__actions-wrap {
    // костыль поднимает кнопки свеху на табы
    position: absolute;
    top: 10px;
    right: 30px;
    background: var(--main-primary-color);

    display: flex;
    align-items: center;
    justify-content: flex-end;

    .wt-button {
      margin-left: 20px;
    }
  }
</style>
