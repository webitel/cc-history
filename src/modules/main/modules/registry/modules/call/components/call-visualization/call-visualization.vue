<template>
  <section class="call-visualization">
    <call-wave
      v-if="call.files"
      :call="call"
    />
    <div class="history-tabs-wrapper">
      <wt-tabs
        v-model="currentTab"
        :tabs="tabs"
      />
      <component
        :is="currentTab.value"
        :call="call"
        :namespace="currentTab.namespace"
      />
    </div>
  </section>
</template>

<script>
import CallTranscript from '../../../stt/components/call-page/call-transcript-section.vue';
import CallEvaluation from '../../modules/evaluation/components/call-evaluation-section.vue';
import CallWave from './wave/call-wave.vue';

export default {
  name: 'CallVisualization',
  components: {
    CallWave,
    CallTranscript,
    CallEvaluation,
  },
  props: {
    call: {
      type: Object,
      required: true,
    },
    namespace: {
      type: String,
    },
  },
  data: () => ({
    currentTab: {},
  }),
  computed: {
    tabValues() {
      return {
        TRANSCRIPT: {
          text: this.$t('registry.stt.transcription'),
          value: 'call-transcript',
          namespace: this.namespace,
        },
        EVALUATION: {
          text: this.$t('registry.call.evaluation.evaluation'),
          value: 'call-evaluation',
          namespace: `${this.namespace}/evaluation`,
        },
      };
    },
    tabs() {
      return this.call.allowEvaluation
        ? [this.tabValues.TRANSCRIPT, this.tabValues.EVALUATION]
        : [this.tabValues.TRANSCRIPT];
    },
  },
  created() {
    this.currentTab = this.tabValues.TRANSCRIPT;
  },
};
</script>

<style lang="scss" scoped>

.call-visualization {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);

  .call-visualization__filepicker {
    width: 460px;
  }
}

</style>
