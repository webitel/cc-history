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
import CallWave from './opened-call-tabs/opened-call-wave.vue';

export default {
  name: 'opened-item-popup',
  components: {
    CallInfo,
    CallLegs,
    CallWave,
  },

  data: () => ({
    currentTab: {
      value: 'call-info',
    },
  }),

  watch: {
    // The reason to reset current tab is unclear, so we are commenting it out for the moment.
    // In case resetting is needed, please uncomment the following method:

    // mainCall(mainCall) {
    //   if (mainCall) this.resetCurrentTab();
    // },
  },

  computed: {
    ...mapState('registry/opened-call', {
      mainCall: (state) => state.mainCall,
      isLoading: (state) => state.isLoading,
    }),
    ...mapGetters('registry/opened-call', {
    }),

    tabs() {
      const callInfo = {
        text: this.$t('registry.openedCall.callInfo'),
        value: 'call-info',
      };
      const callLegs = {
        text: this.$t('registry.openedCall.callLegs'),
        value: 'call-legs',
      };
      const callWave = {
        text: this.$t('registry.openedCall.callWave'),
        value: 'call-wave',
      };
      const tabs = [callInfo];
      if (this.mainCall.hasChildren) tabs.push(callLegs);
      if (this.mainCall.files) tabs.push(callWave);
      return tabs;
    },
  },
  methods: {

    // The reason to reset current tab is unclear, so we are commenting it out for the moment.
    // In case resetting is needed, please uncomment the following method:

    // resetCurrentTab() {
    //   this.currentTab = { value: 'call-info' };
    // },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .wt-popup__popup {
  width: calc(100vw - 100px);
  max-height: calc(100vh - 100px);
}
</style>
