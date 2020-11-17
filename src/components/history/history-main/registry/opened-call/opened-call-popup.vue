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

  watch: {
    mainCall(mainCall) {
      if (mainCall) this.resetCurrentTab();
    },
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
      const tabs = [callInfo];
      if (this.mainCall.hasChildren) tabs.push(callLegs);
      return tabs;
    },
  },
  methods: {
    resetCurrentTab() {
      this.currentTab = { value: 'call-info' };
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
