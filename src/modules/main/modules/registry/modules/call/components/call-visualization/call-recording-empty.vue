<template>
  <wt-empty
    :image="image"
    :text="text"
  />
</template>

<script setup lang="ts">
import { computed, inject, type Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import CallRecordingWasDeleted from './assets/call-recording-was-deleted.svg';
import CallRecordingWasDeletedDark from './assets/call-recording-was-deleted-dark.svg';
import NoCallRecording from './assets/no-call-recording.svg';
import NoCallRecordingDark from './assets/no-call-recording-dark.svg';

const props = withDefaults(
	defineProps<{
		isDeleted?: boolean;
	}>(),
	{
		isDeleted: false,
	},
);

const { t } = useI18n();
const darkMode = inject<Ref<boolean>>('darkMode', ref(false));

const image = computed(() => {
	if (props.isDeleted) {
		return darkMode.value
			? CallRecordingWasDeletedDark
			: CallRecordingWasDeleted;
	}
	return darkMode.value ? NoCallRecordingDark : NoCallRecording;
});

const text = computed(() =>
	props.isDeleted
		? t('registry.call.wave.recordingDeleted')
		: t('registry.call.wave.noAudio'),
);
</script>
