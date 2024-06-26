<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-headline>
        <template #title>
          <wt-headline-nav
            :path="path"
          />
        </template>
        <template #actions>
          <wt-button
            color="secondary"
            @click="closeTab"
          >
            {{ $t('reusable.close') }}
          </wt-button>
        </template>
      </wt-headline>
    </template>

    <template #main>
      <wt-loader v-if="isLoading" />
      <div
        v-else
        class="history-tabs-wrapper"
      >
        <wt-tabs
          v-model="currentTab"
          :tabs="tabs"
        />
        <component
          :is="currentTab.value"
          :call="mainCall"
          :namespace="namespace"
        />
      </div>
    </template>
  </wt-page-wrapper>
</template>

<script>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';
import CallInfo from './call-info/call-info.vue';
import CallLegs from './call-legs/call-legs.vue';
import CallVisualization from './call-visualization/call-visualization.vue';

export default {
  name: 'TheCall',
  components: {
    CallInfo,
    CallLegs,
    CallVisualization,
  },

  data: () => ({
    namespace: 'registry/call',
    currentTab: {
      value: 'call-info',
    },
  }),
  computed: {
    ...mapState({
      mainCall(state) {
        return getNamespacedState(state, this.namespace).mainCall;
      },
      isLoading(state) {
        return getNamespacedState(state, this.namespace).isLoading;
      },
    }),
    tabValues() {
      return {
        INFO: {
          text: this.$t('registry.call.callInfo'),
          value: 'call-info',
        },
        LEGS: {
          text: this.$t('registry.call.callLegs'),
          value: 'call-legs',
        },
        VISUALIZATION: {
          text: this.$t('registry.call.callVisualization'),
          value: 'call-visualization',
        },
      };
    },
    tabs() {
      const tabs = [this.tabValues.INFO];
      if (this.mainCall.hasChildren) tabs.push(this.tabValues.LEGS);
      if (this.mainCall.files?.length || this.mainCall.transcripts?.length
        || this.mainCall.filesJob?.length) tabs.push(this.tabValues.VISUALIZATION);
      return tabs;
    },
    callId() {
      return this.$route.path.split('/').pop();
    },
    path() {
      return [
        { name: this.$t('registry.registry') },
        { name: `${this.$t('registry.call.callInfo')} (${this.callId})` },
      ];
    },
  },
  methods: {
    ...mapActions({
      setMainCall(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_OPENED_CALL`, payload);
      },
      resetMainCall(dispatch, payload) {
        return dispatch(`${this.namespace}/RESET_OPENED_CALL`, payload);
      },
    }),
    setInitialTab() {
      let tab;
      switch (this.$route.hash) {
        case '#transcript':
          tab = this.tabValues.VISUALIZATION;
          break;
        default:
          tab = this.tabValues.INFO;
      }
      this.currentTab = tab;
    },
    closeTab() {
      // Need to close the tab if you moved from another application
      // https://webitel.atlassian.net/browse/WTEL-4552

      if(window.history.length === 1) window.close();
      this.$router.back();
    },
  },
  created() {
    this.setMainCall({ id: this.callId });
    this.setInitialTab();
  },
  unmounted() {
    this.resetMainCall();
  },
};
</script>

<style lang="scss" scoped>

.history-tabs-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: var(--spacing-sm);
}

</style>
