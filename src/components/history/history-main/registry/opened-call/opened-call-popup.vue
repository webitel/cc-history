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
import { mapState } from 'vuex';

import CallInfo from './opened-call-tabs/opened-call-info/opened-call-info.vue';
import CallLegs from './opened-call-tabs/opened-call-legs/opened-call-legs.vue';
import CallWave from './opened-call-tabs/opened-call-wave/opened-call-wave.vue';

/* TODO TEST: тут я хз шо тестити - не тестив би нічого. Хіба дивитись, де code coverage
*  прям свариться-свариться - і то хз */
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
    'mainCall.id': function (value) {
      if (value) {
        this.resetCurrentTab();
      }
    },
  },

  computed: {
    ...mapState('registry/opened-call', {
      mainCall: (state) => state.mainCall,
      isLoading: (state) => state.isLoading,
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
