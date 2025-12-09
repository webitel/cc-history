import { ref } from 'vue';

import { getCallMediaUrl } from '@webitel/api-services/api';
import { EngineCallFileType } from '@webitel/api-services/gen/models';

export const usePlayMedia = () => {
  const audioData = ref({});
  const videoData = ref({});
  const currentlyMediaPlaying = ref('0');
  const isMediaPlayingNow = ref(false);

  const play = (mediaData) => {
    if (mediaData.id) {
      currentlyMediaPlaying.value = mediaData.id;
      if (mediaData.type === EngineCallFileType.FileTypeAudio) {
        videoData.value = {};
        audioData.value = mediaData;
        audioData.value.src = getCallMediaUrl(mediaData.id);
      } else {
        audioData.value = {};
        videoData.value = mediaData;
        videoData.value.src = getCallMediaUrl(mediaData.id);
      }
    } else {
      closePlayer();
    }
  };

  const closePlayer = () => {
    audioData.value = {};
    videoData.value = {};
    isMediaPlayingNow.value = false;
    currentlyMediaPlaying.value = '0';
  };

  return {
    audioData,
    videoData,
    currentlyMediaPlaying,
    isMediaPlayingNow,

    play,
    closePlayer,
  };
};
