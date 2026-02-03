<template>
  <section class="call-visualization">
    <wt-empty 
      v-if="!call.files[EngineCallFileType.FileTypeAudio]"
      :image="darkMode ? NoCallRecordingsDark : NoCallRecordings"
      :title="t('registry.call.wave.noAudio')"
    />
    <call-wave
      v-else
      :call="call"
    />
    <div class="history-tabs-wrapper">
      <wt-tabs
        :current="currentTab"
        :tabs="tabs"
        @change="currentTab = $event"
      />
      <component
        :is="currentTab.component"
        :call="call"
        :namespace="currentTab.namespace"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, inject } from 'vue';
import { useI18n } from 'vue-i18n';
import { WtObject } from '@webitel/ui-sdk/enums';
import { EngineCallFileType } from '@webitel/api-services/gen/models';

import { useUserAccessControl } from '../../../../../../../../app/composables/useUserAccessControl';
import CallTranscript from '../../../stt/components/call-page/call-transcript-section.vue';
import CallEvaluation from '../../modules/call-audit/components/call-audit-section.vue';
import CallScreenRecordings from './screen-recordings/screen-recordings.vue';
import CallWave from './wave/call-wave.vue';
import { useUserinfoStore } from '../../../../../../../userinfo/store/userinfoStore';
import { SpecialGlobalAction } from '@webitel/ui-sdk/src/modules/Userinfo/v2/enums/index';
import NoCallRecordings from './assets/no-call-recordings.svg';
import NoCallRecordingsDark from './assets/no-call-recordings-dark.svg';

interface Props {
  call: any;
  namespace?: string;
}

const props = withDefaults(defineProps<Props>(), {
  namespace: '',
});

const userinfoStore = useUserinfoStore();

const isControlAgentScreenAllow = computed(() => userinfoStore.hasSpecialGlobalActionAccess(SpecialGlobalAction.ControlAgentScreen))

const { t } = useI18n();

const darkMode = inject('darkMode');

const {
  hasReadAccess: hasEvaluationReadAccess,
} = useUserAccessControl(WtObject.AuditRating);

const tabValues = computed(() => ({
  TRANSCRIPT: {
    text: t('registry.stt.transcription'),
    component: CallTranscript,
    value: 'call-transcript',
    namespace: props.namespace,
  },
  EVALUATION: {
    text: t('registry.call.evaluation.evaluation'),
    component: CallEvaluation,
    value: 'call-evaluation',
    namespace: `${props.namespace}/evaluation`,
  },
  SCREEN_RECORDINGS: {
    text: t('objects.screenRecordings', 2),
    component: CallScreenRecordings,
    value: 'call-screen-recordings',
    namespace: props.namespace,
  },
}));

const tabs = computed(() => {
  const tabs = [tabValues.value.TRANSCRIPT];
  if (props.call.allowEvaluation && hasEvaluationReadAccess.value) tabs.push(tabValues.value.EVALUATION);
  if (isControlAgentScreenAllow.value) tabs.push(tabValues.value.SCREEN_RECORDINGS);
  return tabs;
});

const currentTab = ref(tabValues.value.TRANSCRIPT);
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
