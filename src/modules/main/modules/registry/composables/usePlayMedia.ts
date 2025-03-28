import { ref } from 'vue';

import generateMediaURL from '../mixins/media/scripts/generateMediaURL';

export const usePlayMedia = () => {
  const audioURL = ref('');
  const currentlyPlaying = ref('0');
  const isPlayingNow = ref(false);

  const play = (fileId) => {
    if (fileId) {
      currentlyPlaying.value = fileId;
      audioURL.value = generateMediaURL(fileId);
    } else {
      closePlayer();
    }
  };

  const closePlayer = () => {
    audioURL.value = '';
    isPlayingNow.value = false;
    currentlyPlaying.value = '0';
  };

  return {
    audioURL,
    currentlyPlaying,
    isPlayingNow,

    play,
    closePlayer,
  };
};
