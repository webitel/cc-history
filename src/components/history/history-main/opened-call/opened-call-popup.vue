<template>
  <popup-container @close="$emit('close')">
    <template slot="popup-header">
      <tabs
        v-model="currentTab"
        :tabs="tabs"
      ></tabs>
      <div class="opened-call__actions-wrap">
        <btn
          class="secondary"
          @click.native="$emit('close')"
        >{{$t('reusable.close')}}
        </btn>
        <btn
          class="primary"
          :loading="isCSVLoading"
          @click.native="downloadCSV"
        >{{$t('headerSection.exportCSV')}}
        </btn>
      </div>
    </template>

    <template slot="popup-main">
      <loader v-if="isLoading"/>
      <component v-else :is="currentTab.value"/>
    </template>
  </popup-container>
</template>

<script>
  import { mapGetters, mapState } from 'vuex';
  import CallInfo from './opened-call-tabs/opened-call-info.vue';
  import CallLegs from './opened-call-tabs/opened-call-legs.vue';
  import PopupContainer from '../../../utils/popup-container.vue';
  import Btn from '../../../utils/btn.vue';
  import Tabs from '../../../utils/tabs.vue';
  import Loader from '../../../utils/loader.vue';
  import downloadCSVMixin from '../../../../mixins/downloadCSV/downloadCSVMixin';

  export default {
    name: 'opened-item-popup',
    mixins: [downloadCSVMixin],
    components: {
      CallInfo,
      CallLegs,
      PopupContainer,
      Btn,
      Tabs,
      Loader,
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
        selectedDataItems: 'SELECTED_DATA_ITEMS',
      }),

      selectedItems() {
        const selectedItems = [...this.selectedDataItems];
        if (selectedItems.length
          && selectedItems.indexOf(this.mainCall) === -1) {
          selectedItems.unshift(this.mainCall);
        }
        return selectedItems;
      },

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
  };
</script>

<style lang="scss" scoped>
  $row-highlight-bg-color: #FFF9E6;

  ::v-deep .popup {
    width: calc(100vw - 100px);
    max-height: calc(100vh - 100px);
  }

  .opened-call__actions-wrap {
    // костыль поднимает кнопки свеху на табы
    position: absolute;
    top: 30px;
    right: 20px;
    background: #fff;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    .cc-btn {
      min-width: 100px;
      margin-left: 20px;
    }
  }
</style>
