<template>
  <section class="chat-history">
    <div class="chat-history__header">
      <span class="chat-history__title">
        {{ t('registry.call.chatHistory') }}
      </span>
    </div>
    <div class="char-history__content">
      <wt-empty 
        :image="darkMode ? EmptyChatDark : EmptyChat"
        :headline="t('registry.call.noMessages')"
        style="width: auto;"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import EmptyChat from './_internals/assets/empty-chat.svg'
import EmptyChatDark from './_internals/assets/empty-chat-dark.svg'
import { inject } from 'vue';

const { t } = useI18n();

const darkMode = inject('darkMode');
</script>

<style lang="scss" scoped>
@use '@webitel/ui-sdk/src/css/main' as *;

.chat-history__header {
  padding: var(--spacing-xs);
  margin-bottom: var(--spacing-xs);
}

.chat-history__title {
  @extend %typo-heading-4;
}

.char-history__content {
  display: flex;
  margin-block: auto;
}
</style>