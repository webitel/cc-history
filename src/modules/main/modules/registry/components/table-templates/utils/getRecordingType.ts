import { MediaType } from '../types/mediaAction.ts';

export const getRecordingType = (mimeType: string): MediaType => {
  if (mimeType.startsWith('audio/')) {
    return MediaType.Audio;
  } else if (mimeType.startsWith('video/')) {
    return MediaType.Video;
  }
  return MediaType.Unknown;
};
