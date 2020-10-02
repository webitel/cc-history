<template>
  <wt-popup @close="$emit('close')">
    <template slot="header">
      <wt-tabs
        v-model="currentTab"
        :tabs="tabs"
      ></wt-tabs>
    </template>

    <template slot="main">
      <wt-loader v-show="isLoading"/>
      <component v-show="!isLoading" :is="currentTab.value"/>
    </template>
  </wt-popup>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

import CallInfo from './opened-call-tabs/opened-call-info.vue';
import CallLegs from './opened-call-tabs/opened-call-legs.vue';

export default {
  name: 'opened-item-popup',
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
};
</script>

<style lang="scss" scoped>
::v-deep .wt-popup__popup {
  width: calc(100vw - 100px);
  max-height: calc(100vh - 100px);
}
</style>
