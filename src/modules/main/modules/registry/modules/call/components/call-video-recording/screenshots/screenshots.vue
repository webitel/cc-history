<template>
  <section class="table-page">
    <header class="table-title">
      <h3 class="table-title__title">
        {{ t('objects.screenshots', 2) }}
      </h3>
      <wt-action-bar
        :include="[IconAction.DOWNLOAD_PDF, IconAction.DOWNLOAD,IconAction.REFRESH, IconAction.DELETE]"
      >
      </wt-action-bar>
    </header>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { IconAction } from '@webitel/ui-sdk/enums';

const { t } = useI18n();
</script>

<style scoped lang="scss">
@use '@webitel/styleguide/typography' as *;

.table-title {
  padding-inline: var(--spacing-xs);
}

.table-title__title {
  @extend %typo-heading-4;
}
</style>