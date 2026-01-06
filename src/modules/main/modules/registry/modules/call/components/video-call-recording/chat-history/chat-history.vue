<template>
  <section class="chat-history">
    <div class="chat-history__header">
      <span class="chat-history__title">
        {{ t('registry.call.chatHistory') }}
      </span>
    </div>
    <div class="chat-history__content">
      <wt-empty
        v-if="!adaptedMessages.length"
        :image="darkMode ? EmptyChatDark : EmptyChat"
        :headline="t('registry.call.noMessages')"
        style="width: auto;"
      />
      <chat-container
        v-else
        :messages="adaptedMessages"
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
const adaptedMessages = ref<ChatMessageType[]>([])
const canLoadNextMessages = ref(false);

// Adapter function to transform API messages to ChatMessageType format
const adaptateMessages = (messages: WebitelChatMessage[], peers: WebitelChatPeer[]) => {
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
      self: peers[+message.from?.id - 1].type === 'user',
      type: peers[+message.from?.id - 1].type,
    },
    chat: message.chat,
    createdAt: new Date(parseInt(message.date)).getTime(),
    channelId: message.chat?.id,
    text: message.text,
  })).reverse();
}

const lastLoadedMessageId = computed(() => adaptedMessages.value?.[0]?.id);

const loadNextMessages = async () => {
  if (isChatLoading.value) return;
  isChatLoading.value = true;

  const params = {
    chatId: conversationId.value,
    limit: 15
  };

  if (lastLoadedMessageId.value) {
    params['offset.id'] = lastLoadedMessageId.value;
  }

  try {
    const { messages, peers, next } = await MessagesServiceAPI.getChatHistory(params);
    canLoadNextMessages.value = next;
    adaptedMessages.value = [...adaptateMessages(messages, peers), ...adaptedMessages.value];
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