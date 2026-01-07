<template>
  <section class="chat-history">
    <div class="chat-history__header">
      <span class="chat-history__title">
        {{ t('registry.call.chatHistory') }}
      </span>
    </div>
    <div class="chat-history__content">
      <wt-empty
        v-if="!normalizedMessages.length"
        :image="darkMode ? EmptyChatDark : EmptyChat"
        :headline="t('registry.call.noMessages')"
        style="width: auto;"
      />
      <chat-container
        v-else
        :messages="normalizedMessages"
        :is-next-messages-loading="isChatLoading"
        :can-load-next-messages="canLoadNextMessages"
        without-avatars
        @load-next-messages="loadNextMessages"
      >
        <template #footer>
          <div></div>
        </template>
      </chat-container>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MessagesServiceAPI, getMediaUrl } from '@webitel/api-services/api';
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

const { t } = useI18n();

const darkMode = inject('darkMode');

const isChatLoading = ref(false);
const normalizedMessages = ref<ChatMessageType[]>([])
const canLoadNextMessages = ref(false);

// Normalize function to transform API messages to ChatMessageType format
const normalizeMessages = (messages: WebitelChatMessage[], peers: WebitelChatPeer[]) => {
  if (!messages?.length) return [];

  return messages.map((message) => ({
    id: parseInt(message.id),
    file: message.file && {
      ...message.file,
      mime: message.file.type,
      url: getMediaUrl(message.file.id),
    },
    member: {
      ...message.from,
      self: peers[+message.from?.id - 1].type === 'user' || peers[+message.from?.id - 1].type === 'bot',
      type: peers[+message.from?.id - 1].type,
    },
    chat: message.chat,
    createdAt: new Date(parseInt(message.date)).getTime(),
    channelId: message.chat?.id,
    text: message.text,
  })).reverse();
}

const lastLoadedMessageId = computed(() => normalizedMessages.value?.[0]?.id);

const loadNextMessages = async () => {
  if (isChatLoading.value) return;
  isChatLoading.value = true;

  const params = {
    chatId: conversationId.value,
    limit: 15  // 15 is enough amount of messages to get scroll on container 
  };

  if (lastLoadedMessageId.value) {
    // 'offset.id' because the backend cant handle object
    params['offset.id'] = lastLoadedMessageId.value;
  }

  try {
    const { messages, peers, next } = await MessagesServiceAPI.getChatHistory(params);
    canLoadNextMessages.value = next;
    normalizedMessages.value = [...normalizeMessages(messages, peers), ...normalizedMessages.value];
  } finally {
    isChatLoading.value = false;
  }
}

onMounted(async () => {
  if (!conversationId.value) return;
  loadNextMessages()
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
}
</style>