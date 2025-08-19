export const MediaType = {
  Unknown: 'unknown',
  Video: 'video',
  Audio: 'audio',
} as const;

export type MediaType = (typeof MediaType)[keyof typeof MediaType];
