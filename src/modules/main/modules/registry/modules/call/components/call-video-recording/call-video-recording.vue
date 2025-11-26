<template>
  <section class="call-video-recording">
    <div 
      ref="contentRef"
      class="call-video-recording__content"
    >
      <video-file 
        ref="videoRef"
        class="call-video-recording__video"
      />
      <chat-history class="call-video-recording__chat"/>
    </div>
    <div class="history-tabs-wrapper">
      <wt-tabs
        v-model="currentTab"
        :tabs="tabs"
      />
      <component
        :is="currentTab.component"
        :call="call"
        :namespace="currentTab.namespace"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import VideoFile from './video-file/video-file.vue';
import Screenshots from './screenshots/screenshots.vue';
import Pdfs from './pdfs/pdfs.vue';
import ChatHistory from './chat-history/chat-history.vue';
import { useVideoRecordingContentObserver } from './composables/useVideoRecordingContentObserver';

interface Props {
  call: any;
  namespace?: string;
}

const props = withDefaults(defineProps<Props>(), {
  namespace: '',
});

const { t } = useI18n();

const contentRef = useTemplateRef('contentRef');
const videoRef = useTemplateRef('videoRef');

useVideoRecordingContentObserver(contentRef, videoRef);

const tabValues = computed(() => ({
  SCREENSHOTS: {
    text: t('objects.screenshots', 2),
    component: Screenshots,
    value: 'screenshots',
    namespace: `${props.namespace}/screenshots`,
  },
  PDFS: {
    text: t('registry.call.pdfs', 2),
    component: Pdfs,
    value: 'pdfs',
    namespace: `${props.namespace}/pdfs`,
  },
}));

const tabs = computed (() => [
  tabValues.value.SCREENSHOTS,
  tabValues.value.PDFS
])

const currentTab = ref(tabValues.value.SCREENSHOTS);
</script>

<style lang="scss" scoped>
.call-video-recording {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.call-video-recording__content {
  --content-gap: var(--spacing-sm);

  display: grid;
  gap: var(--content-gap);
  grid-template-rows: auto;

  .call-video-recording__video,
  .call-video-recording__chat {
    display: flex;
    flex-direction: column;
    align-self: baseline;
    height: 100%;
  }

  .call-video-recording__chat {
    max-height: var(--video-col-height);
  }

  // width >= 1920: video 1/3, chat 1/3, empty 1/3
  @media (min-width: 1920px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  // width >= 1264 && < 1920: video 1/3, chat 2/3
  @media (min-width: 1264px) and (max-width: 1919px) {
    grid-template-columns: 1fr 2fr;
  }

  // width >= 960 && < 1264: video 1/2, chat 1/2
  @media (min-width: 960px) and (max-width: 1263px) {
    grid-template-columns: 1fr 1fr;
  }

  // width < 960: column layout, both full width
  @media (max-width: 959px) {
    grid-template-columns: 1fr;

    .call-video-recording__chat {
      max-height: 470px;
    }
  }
}
</style>