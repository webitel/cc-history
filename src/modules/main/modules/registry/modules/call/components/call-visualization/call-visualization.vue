<template>
  <section class="call-visualization">
    <call-recording-empty v-if="!hasAudio" />
    <call-wave
      v-else
      v-model:selected-file="selectedRecordingFile"
      :call="call"
      @update:annotations="updateAnnotations"
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
        :file="selectedRecordingFile"
        @refresh="refreshCall"
        @deleted="removeTranscript"
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
import type {
	CallTranscriptItem,
	CallWaveFile,
	WaveAnnotation,
} from '@webitel/ui-sdk/modules/CallVisualization';
import {
	CallRecordingEmpty,
	CallTranscript,
	CallWave,
} from '@webitel/ui-sdk/modules/CallVisualization';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { useUserAccessControl } from '../../../../../../../../app/composables/useUserAccessControl';
import { useScreenRecordingsAccess } from '../../../../composables/useScreenRecordingsAccess';
import CallEvaluation from '../../modules/call-audit/components/call-audit-section.vue';
import type {
	CallVisualizationProps,
	VisualizationTab,
} from '../../types/callVisualization';
import CallScreenRecordings from './screen-recordings/screen-recordings.vue';

const props = withDefaults(defineProps<CallVisualizationProps>(), {
	namespace: '',
});

const store = useStore();

const selectedRecordingFile = computed({
	get: (): CallWaveFile =>
		getNamespacedState(store.state, props.namespace).selectedRecordingFile,
	set: (file: CallWaveFile) =>
		store.dispatch(`${props.namespace}/SET_RECORDING_FILE`, file),
});

function updateAnnotations(annotations: WaveAnnotation[]) {
	store.commit(`${props.namespace}/SET_ANNOTATIONS`, annotations);
}

function refreshCall() {
	return store.dispatch(`${props.namespace}/LOAD_MAIN_CALL`);
}

function removeTranscript(transcript: CallTranscriptItem) {
	store.commit(`${props.namespace}/SET_MAIN_CALL`, {
		...props.call,
		transcripts: (props.call.transcripts || []).filter(
			({ id }) => id !== transcript.id,
		),
	});
}

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

<style scoped>
.call-visualization {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}
</style>
