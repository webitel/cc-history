<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <wt-headline>
        <template v-slot:title>
          <wt-headline-nav
            :path="path"
          ></wt-headline-nav>
        </template>
        <template v-slot:actions>
          <wt-button
            color="secondary"
            @click="$router.back()"
          >{{ $t('reusable.close') }}
          </wt-button>
        </template>
      </wt-headline>
    </template>

    <template v-slot:main>
      <wt-loader v-if="isLoading" />
      <div v-else class="history-tabs-wrapper">
        <wt-tabs
          v-model="currentTab"
          :tabs="tabs"
        ></wt-tabs>
        <component :is="currentTab.value" />
      </div>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CallInfo from './call-info/call-info.vue';
import CallLegs from './call-legs/call-legs.vue';
import CallVisualization from './call-visualization/call-visualization.vue';

export default {
  name: 'the-call',
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
    ...mapState('registry/call', {
      mainCall: (state) => state.mainCall,
      isLoading: (state) => state.isLoading,
    }),

    tabs() {
      const callInfo = {
        text: this.$t('registry.call.callInfo'),
        value: 'call-info',
      };
      const callLegs = {
        text: this.$t('registry.call.callLegs'),
        value: 'call-legs',
      };
      const callWave = {
        text: this.$t('registry.call.callVisualization'),
        value: 'call-visualization',
      };
      const tabs = [callInfo];
      if (this.mainCall.hasChildren) tabs.push(callLegs);
      if (this.mainCall.files) tabs.push(callWave);
      return tabs;
    },
    callId() {
      return this.$route.fullPath.split('/').pop();
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
  },
  created() {
    this.setMainCall({ id: this.callId });
  },
  destroyed() {
    this.resetMainCall();
  },
};
</script>

<style lang="scss" scoped>
.history-tabs-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  width: 100%;
}
</style>
