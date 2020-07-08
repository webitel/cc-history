<template>
  <popup-container @close="$emit('close')">
    <template slot="popup-header">
      <tabs
        v-model="currentTab"
        :tabs="tabs"
      ></tabs>
      <!--      <btn-->
      <!--        class="primary"-->
      <!--        :loading="isCSVLoading"-->
      <!--        @click.native="downloadCSV"-->
      <!--      >{{$t('headerSection.exportCSV')}}-->
      <!--      </btn>-->
      <btn
        class="secondary"
        @click.native="$emit('close')"
      >{{$t('reusable.close')}}
      </btn>
    </template>

    <template slot="popup-main">
      <component :is="currentTab.value"/>
    </template>
  </popup-container>
</template>

<script>
  import { mapState } from 'vuex';
  import CallLegs from './opened-call-tabs/opened-call-legs.vue';
  import PopupContainer from '../../../utils/popup-container.vue';
  import Btn from '../../../utils/btn.vue';
  import Tabs from '../../../utils/tabs.vue';

  export default {
    name: 'opened-item-popup',
    components: {
      CallLegs,
      PopupContainer,
      Btn,
      Tabs,
    },

    data: () => ({
      currentTab: {
        value: 'call-legs',
      },
    }),

    computed: {
      ...mapState('history/opened-call', {
        itemInstance: (state) => state.itemInstance,
      }),

      tabs() {
        const callInfo = {
          text: this.$t('openedCall.callInfo'),
          value: 'callInfo',
        };
        const callLegs = {
          text: this.$t('openedCall.callLegs'),
          value: 'call-legs',
        };
        const tabs = [callInfo, callLegs];
        return tabs;
      },
    },

    methods: {
    },
  };
</script>

<style lang="scss" scoped>
  $row-highlight-bg-color: #FFF9E6;

  ::v-deep .popup {
    width: calc(100vw - 100px);
    max-height: calc(100vh - 100px);
  }

  .cc-btn {
    min-width: 100px;
    margin-left: auto;
  }
</style>
