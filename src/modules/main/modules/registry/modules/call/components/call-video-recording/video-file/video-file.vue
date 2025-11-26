<template>
  <section class="video-file">
    <div class="video-file__header">
      <span class="video-file__title">
        {{ t('registry.call.videoFile') }}
      </span>
      <div class="video-file__actions">
        <wt-icon-btn
          icon="download"
        />
        <wt-icon-btn
          icon="bucket"
        />
      </div>
    </div>
    <wt-select 
      :placeholder="t('vocabulary.file')"
    />
    <div class="video-file__player">
      <wt-empty 
        :image="darkMode ? EmptyVideoDark : EmptyVideo"
        :title="t('registry.call.noVideoFile')"
        style="width: auto;"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import EmptyVideo from './_internals/assets/empty-video.svg'
import EmptyVideoDark from './_internals/assets/empty-video-dark.svg'
import { inject } from 'vue';

const { t } = useI18n();

const darkMode = inject('darkMode');
</script>

<style lang="scss" scoped>
@use '@webitel/ui-sdk/src/css/main' as *;

.video-file__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-xs);
  margin-bottom: var(--spacing-xs);
}

.video-file__title {
  @extend %typo-heading-4;
}

.video-file__actions {
  display: flex;
  gap: var(--spacing-xs);
}

.video-file__player {
  display: flex;
  width: 100%;
  aspect-ratio: var(--p-player-wrapper-sm-aspect-ratio);
}
</style>