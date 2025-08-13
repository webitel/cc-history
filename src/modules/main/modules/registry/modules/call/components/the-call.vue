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
          :current="currentTab"
          :tabs="tabs"
          @change="changeTab"
        />
        <component
          :is="currentTab.value"
          v-if="mainCall"
          :call="mainCall"
          :namespace="namespace"
        />
      </div>
    </template>
  </wt-page-wrapper>
</template>

<script>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { storeToRefs } from 'pinia';
import { mapActions, mapState } from 'vuex';

import CallTabsPathNames from '../../../../../../../app/router/_internals/CallTabsPathNames.enum.js';
import historyRegistryQueriesMixin from '../../../mixins/historyRegistryQueries.mixin.js';
import { useRegistryStore } from '../../../store/new/registry.store.js';
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
  mixins: [historyRegistryQueriesMixin],
  props: {
    viewMode: {
      type: Boolean,
      default: false,
    },
  },
  setup: () => {
    const tableStore = useRegistryStore();

    const {
      fields,
    } = storeToRefs(tableStore);

    const { initialize } = tableStore;

    return {
      fields,

      initialize,
    }
  },
  data: () => ({
    namespace: 'registry/call',
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
      // Use different route names for view mode vs regular mode
      const prefix = this.viewMode ? 'call_view-' : '';

      return {
        INFO: {
          text: this.$t('registry.call.callInfo'),
          value: 'call-info',
          pathName: `${prefix}${CallTabsPathNames.CALL_INFO}`,
        },
        LEGS: {
          text: this.$t('registry.call.callLegs'),
          value: 'call-legs',
          pathName: `${prefix}${CallTabsPathNames.LEGS_A_B}`,
        },
        VISUALIZATION: {
          text: this.$t('registry.call.callVisualization'),
          value: 'call-visualization',
          pathName: `${prefix}${CallTabsPathNames.CALL_VISUALIZATION}`,
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
      return this.$route.params?.pathMatch;
    },
    path() {
      return [
        { name: this.$t('registry.registry') },
        { name: `${this.$t('registry.call.callInfo')} (${this.callId})` },
      ];
    },
    currentTab() {
      return this.tabs.find(({pathName}) => this.$route.name === pathName) || this.tabs[0];
    },
  },
  async created() {
    await this.initialize();
    this.setMainCall({ id: this.callId, fields: this.fields });
  },
  unmounted() {
    this.resetMainCall();
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
    changeTab(tab) {
      this.$router.push({ ...this.$route, name: tab.pathName });
    },
    closeTab() {
      // Need to close the tab if you moved from another application
      // https://webitel.atlassian.net/browse/WTEL-4552

      if(window.history.length === 1) window.close();
      this.$router.push({name: 'history'});
    },
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
