import { getCallMediaUrl } from '@webitel/api-services/api';
import {
	EngineCallFileType,
	EngineCallFile,
} from '@webitel/api-services/gen/models';
import { ref } from 'vue';
import type {
	AudioSrc,
	VideoSrc,
	AudioMimeType,
	VideoMimeType,
} from 'vidstack';

export const usePlayMedia = () => {
	const audioData = ref<
		EngineCallFile & {
			src: AudioSrc;
		}
	>();
	const videoData = ref<
		EngineCallFile & {
			src: VideoSrc;
		}
	>();

	const currentlyMediaPlaying = ref('0');
	const isMediaPlayingNow = ref(false);

	const play = (
		mediaFile: EngineCallFile & {
			text?: string;
		},
	) => {
		if (mediaFile.id) {
			currentlyMediaPlaying.value = mediaFile.id;
			if (mediaFile.type === EngineCallFileType.FileTypeAudio) {
				resetVideo();
				playAudio(mediaFile);
			} else {
				resetAudio();
				playVideo(mediaFile);
			}
		} else {
			closePlayer();
		}
	};

	function playAudio(mediaFile: EngineCallFile) {
		audioData.value = {
			...mediaFile,
			src: {
				src: getCallMediaUrl(mediaFile.id),
				type: handleVidstackUnsupportedAudioTypes(
					mediaFile.mimeType,
				) as AudioMimeType,
			},
		};
	}

	function playVideo(
		mediaFile: EngineCallFile & {
			text?: string;
		},
	) {
		videoData.value = {
			...mediaFile,
			src: {
				...mediaFile,
				src: getCallMediaUrl(mediaFile.id),
				type: mediaFile.mimeType as VideoMimeType,
			},
		};
	}

	function closePlayer() {
		resetAudio();
		resetVideo();
		isMediaPlayingNow.value = false;
		currentlyMediaPlaying.value = '0';
	}

	function resetAudio() {
		audioData.value = null;
	}

	function resetVideo() {
		videoData.value = null;
	}

	function handleVidstackUnsupportedAudioTypes(
		mimeType: string,
	): AudioMimeType {
		const unsupportedTypes = [
			'audio/wav',
		];
		return unsupportedTypes.includes(mimeType)
			? 'audio/mp3'
			: (mimeType as AudioMimeType);
	}

	return {
		audioData,
		videoData,
		currentlyMediaPlaying,
		isMediaPlayingNow,

		play,
		closePlayer,
	};
};
