import { getCallMediaUrl } from '@webitel/api-services/api';
import {
	type EngineCallFile,
	EngineCallFileType,
} from '@webitel/api-services/gen/models';
import type {
	AudioMimeType,
	AudioSrc,
	VideoMimeType,
	VideoSrc,
} from 'vidstack';
import { ref } from 'vue';

export const usePlayMedia = () => {
	const audioData = ref<
		EngineCallFile & {
			src: AudioSrc;
		}
	>();
	const videoData = ref<
		EngineCallFile & {
			src: VideoSrc;
			text?: string;
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
				type: mediaFile.mimeType as AudioMimeType,
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
			text: mediaFile.text,
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

	return {
		audioData,
		videoData,
		currentlyMediaPlaying,
		isMediaPlayingNow,

		play,
		closePlayer,
	};
};
