<template>
  <section class="chat-history">
    <div class="chat-history__header">
      <span class="chat-history__title">
        {{ t('registry.call.chatHistory') }}
      </span>
    </div>
    <div class="chat-history__content">
      <wt-empty
        v-if="!messagesList?.messages?.length"
        :image="darkMode ? EmptyChatDark : EmptyChat"
        :headline="t('registry.call.noMessages')"
        style="width: auto;"
      />
      <chat-container
        v-else
        :messages="adaptedMessages"
        without-avatars
      >
        <template #footer>
          <div></div>
        </template>
      </chat-container>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MessagesServiceAPI } from '@webitel/api-services/api';
import { WebitelChatMessage, WebitelChatPeer } from '@webitel/api-services/gen';
import { ChatContainer, ChatMessageType } from '@webitel/ui-chats/ui';
import { EngineHistoryCall } from 'webitel-sdk';
import { useI18n } from 'vue-i18n';
import EmptyChat from './_internals/assets/empty-chat.svg'
import EmptyChatDark from './_internals/assets/empty-chat-dark.svg'
import { computed, inject, onMounted, ref } from 'vue';

interface Props {
  call: EngineHistoryCall,
}

const props = defineProps<Props>();

const conversationId = computed(() => props.call.conversationId);
const messagesList = ref<{
  messages?: WebitelChatMessage[];
  peers?: WebitelChatPeer[];
}>({});

const { t } = useI18n();

const darkMode = inject('darkMode');

// Adapter function to transform API messages to ChatMessageType format
const adaptedMessages = computed<ChatMessageType[]>(() => {
  if (!messagesList.value?.messages?.length) return [];

  return messagesList.value.messages.map((message) => ({
    id: parseInt(message.id),
    file: message.file,
    member: {
      ...message.from,
      type: message.from?.type || 'user',
    },
    peer: {
      ...message.sender,
      type: message.sender?.type || 'user',
    },
    chat: message.chat,
    createdAt: new Date(parseInt(message.date)).getTime(),
    channelId: message.chat?.id,
    contact: message.from,
    text: message.text,
  }));
});

onMounted(async () => {
  if (!conversationId.value) return;
  messagesList.value = await MessagesServiceAPI.getChatHistory({
    chatId: conversationId.value,
    size: 100,
  });
})
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

.chat-history__content {
  overflow: auto;
  display: flex;
  margin-block: auto;
}
</style>