export const MediaChannel = {
  Call: 'call',
  ScreenSharing: 'screensharing',
} as const;

export type MediaChannel = (typeof MediaChannel)[keyof typeof MediaChannel];
