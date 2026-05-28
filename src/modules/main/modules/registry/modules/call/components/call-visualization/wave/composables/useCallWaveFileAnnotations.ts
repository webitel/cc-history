import { EngineCallFileType } from '@webitel/api-services/gen/models';
import { computed, type ComputedRef } from 'vue';

import type { WaveAnnotation } from '../call-wave.types';

interface AudioFileOption {
	id?: string;
	[key: string]: unknown;
}

interface UseCallWaveFileAnnotationsOptions {
	file: ComputedRef<
		| {
				id?: string;
		  }
		| null
		| undefined
	>;
	fileOptions: ComputedRef<
		Record<string, AudioFileOption[]> | null | undefined
	>;
	allAnnotations: ComputedRef<WaveAnnotation[]>;
}

export function useCallWaveFileAnnotations({
	file,
	fileOptions,
	allAnnotations,
}: UseCallWaveFileAnnotationsOptions) {
	const audioFiles = computed<AudioFileOption[]>(
		() => fileOptions.value?.[EngineCallFileType.FileTypeAudio] || [],
	);

	const firstAudioFileId = computed(() => audioFiles.value?.[0]?.id);
	const currentFileId = computed(() => file.value?.id);

	const annotations = computed<WaveAnnotation[]>(() => {
		if (!allAnnotations.value?.length) {
			return [];
		}
		const selectedFileId = currentFileId.value;
		if (!selectedFileId) {
			return [];
		}
		return allAnnotations.value.filter((annotation) => {
			if (annotation.fileId) {
				return annotation.fileId === selectedFileId;
			}
			return selectedFileId === firstAudioFileId.value;
		});
	});

	const commentsSize = computed(() => annotations.value.length);

	return {
		audioFiles,
		currentFileId,
		annotations,
		commentsSize,
	};
}
