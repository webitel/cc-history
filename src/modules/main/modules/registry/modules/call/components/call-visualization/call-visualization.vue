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
import { WtObject } from '@webitel/ui-sdk/enums';

import { useUserAccessControl } from '../../../../../../../../app/composables/useUserAccessControl';
import CallTranscript from '../../../stt/components/call-page/call-transcript-section.vue';
import CallAuditSection from '../../modules/call-audit/components/call-audit-section.vue';
import ScreenRecordings from './screen-recordings/screen-recordings.vue';
import CallWave from './wave/call-wave.vue';

export default {
  name: 'CallVisualization',
  components: {
    CallWave,
    CallTranscript,
    CallEvaluation: CallAuditSection,
    CallScreenRecordings: ScreenRecordings,
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
  setup() {
    const {
      hasReadAccess,
    } = useUserAccessControl(WtObject.AuditRating);

    return {
      hasEvaluationReadAccess: hasReadAccess,
    };
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
        SCREEN_RECORDINGS: {
          text: this.$t('registry.call.screenRecordings'),
          value: 'call-screen-recordings',
          namespace: this.namespace,
        }
      };
    },
    tabs() {
      return (this.call.allowEvaluation && this.hasEvaluationReadAccess)
        ? [this.tabValues.TRANSCRIPT, this.tabValues.EVALUATION, this.tabValues.SCREEN_RECORDINGS]
        : [this.tabValues.TRANSCRIPT, this.tabValues.SCREEN_RECORDINGS];
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
