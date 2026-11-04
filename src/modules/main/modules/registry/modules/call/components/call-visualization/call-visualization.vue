<template>
  <section class="call-visualization">
    <call-recording-empty v-if="!hasAudio" />
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

<script
  setup
  lang="ts"
>
import { EngineCallFileType } from '@webitel/api-services/gen/models';
import { WtObject } from '@webitel/ui-sdk/enums';
import { type Component, computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUserAccessControl } from '../../../../../../../../app/composables/useUserAccessControl';
import { useScreenRecordingsAccess } from '../../../../composables/useScreenRecordingsAccess';
import CallTranscript from '../../../stt/components/call-page/call-transcript-section.vue';
import CallEvaluation from '../../modules/call-audit/components/call-audit-section.vue';
import CallRecordingEmpty from './call-recording-empty.vue';
import CallScreenRecordings from './screen-recordings/screen-recordings.vue';
import type { CallWaveCallRecord } from './wave/call-wave.types';
import CallWave from './wave/call-wave.vue';

interface VisualizationTab {
	text: string;
	component: Component;
	value: string;
	namespace: string;
}

interface Props {
	call: CallWaveCallRecord & {
		allowEvaluation?: boolean;
	};
	namespace?: string;
}

const props = withDefaults(defineProps<Props>(), {
	namespace: '',
});

const { hasReadAccess: hasScreenRecordingsReadAccess } =
	useScreenRecordingsAccess();

const { t } = useI18n();

const hasAudio = computed(
	() => !!props.call.files?.[EngineCallFileType.FileTypeAudio]?.length,
);

const { hasReadAccess: hasEvaluationReadAccess } = useUserAccessControl(
	WtObject.AuditRating,
);

const tabValues = computed(
	(): Record<string, VisualizationTab> => ({
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
	}),
);

const tabs = computed((): VisualizationTab[] => {
	const tabList: VisualizationTab[] = [
		tabValues.value.TRANSCRIPT,
	];
	if (props.call.allowEvaluation && hasEvaluationReadAccess.value)
		tabList.push(tabValues.value.EVALUATION);
	if (hasScreenRecordingsReadAccess.value)
		tabList.push(tabValues.value.SCREEN_RECORDINGS);
	return tabList;
});

const currentTab = ref<VisualizationTab>(tabValues.value.TRANSCRIPT);
</script>

<style
  lang="scss"
  scoped
>
.call-visualization {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}
</style>
