import { onMounted, onBeforeUnmount, ref } from 'vue';

// composable to make chat history block height equal to video block height
export const useVideoRecordingContentObserver = (contentRef: any, videoRef: any) => {
  let ro: ResizeObserver | null = null;

  onMounted(() => {
    if (!videoRef.value || !contentRef.value) return;

    ro = new ResizeObserver(() => {
      // set CSS var on the grid container so CSS can use it
      const h = videoRef.value.$el.offsetHeight;
      contentRef.value.style.setProperty('--video-col-height', `${h}px`);
    });

    ro.observe(videoRef.value.$el);
  });

  onBeforeUnmount(() => {
    if (ro) ro.disconnect();
  });
}
