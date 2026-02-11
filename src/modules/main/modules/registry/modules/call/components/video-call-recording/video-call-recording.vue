<template>
  <section class="video-call-recording">
    <div 
      ref="contentRef"
      class="video-call-recording__content"
    >
      <video-file 
        ref="videoRef"
        class="video-call-recording__video"
        :files="call.files?.[EngineCallFileType.FileTypeVideo]"
      />
      <chat-history 
        class="video-call-recording__chat"
        :call="call"
      />
    </div>
    <div class="history-tabs-wrapper">
      <wt-tabs
        :current="currentTab"
        :tabs="tabs"
        @change="currentTab = $event"
      />
      <keep-alive exclude="Pdfs">
        <component
          :is="currentTab.component"
          :call="call"
          :namespace="currentTab.namespace"
        />
      </keep-alive>
    </div>
  </section>
</template>

<script setup lang="ts">
import { EngineCallFileType } from '@webitel/api-services/gen/models';
import { computed, onMounted, ref, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';
import ChatHistory from './chat-history/chat-history.vue';
import { useVideoRecordingContentObserver } from './composables/useVideoRecordingContentObserver';
import Pdfs from './pdfs/pdfs.vue';
import Screenshots from './screenshots/screenshots.vue';
import VideoFile from './video-file/video-file.vue';

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

// Set component names for keep-alive
Screenshots.name = 'Screenshots';
Pdfs.name = 'Pdfs';

const tabValues = computed(() => ({
	SCREENSHOTS: {
		text: t('objects.screenshots', 2),
		component: Screenshots,
		value: 'screenshots',
		namespace: `${props.namespace}`,
	},
	PDFS: {
		text: t('registry.call.pdfs', 2),
		component: Pdfs,
		value: 'pdfs',
		namespace: `${props.namespace}`,
	},
}));

const tabs = computed(() => [
	tabValues.value.SCREENSHOTS,
	tabValues.value.PDFS,
]);

const currentTab = ref(tabValues.value.SCREENSHOTS);
</script>

<style lang="scss" scoped>
.video-call-recording {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.video-call-recording__content {
  --content-gap: var(--spacing-sm);

  display: grid;
  gap: var(--content-gap);
  grid-template-rows: auto;

  .video-call-recording__video,
  .video-call-recording__chat {
    display: flex;
    flex-direction: column;
    align-self: baseline;
    height: 100%;
    min-width: 0;
  }

  .video-call-recording__chat {
    overflow: hidden;
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

    .video-call-recording__chat {
      max-height: 470px;
    }
  }
}
</style>