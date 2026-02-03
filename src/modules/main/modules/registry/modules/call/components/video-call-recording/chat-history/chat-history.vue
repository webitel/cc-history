<template>
  <section class="chat-history">
    <div class="chat-history__header">
      <span class="chat-history__title typo-heading-4">
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
        @[MessageAction.ClickOnImage]="openChatMedia"
      >
        <template #footer>
          <div></div>
        </template>
      </chat-container>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MessagesServiceAPI } from "@webitel/api-services/api";
import { ChatContainer, ChatMessageType, MessageAction } from "@webitel/ui-chats/ui";
import { EngineHistoryCall } from "webitel-sdk";
import { useI18n } from "vue-i18n";
import EmptyChat from "./_internals/assets/empty-chat.svg";
import EmptyChatDark from "./_internals/assets/empty-chat-dark.svg";
import { computed, inject, onMounted, ref } from "vue";
import { normalizeMessages } from "./_internals/scripts/normalizeMessages";

interface Props {
	call: EngineHistoryCall;
}

const props = defineProps<Props>();

const conversationId = computed(() => props.call.conversationId);

const { t } = useI18n();

const darkMode = inject("darkMode");

const isChatLoading = ref(false);
const normalizedMessages = ref<ChatMessageType[]>([]);
const canLoadNextMessages = ref(false);

const lastLoadedMessageId = computed(() => normalizedMessages.value?.[0]?.id);

const loadNextMessages = async () => {
	if (isChatLoading.value) return;
	isChatLoading.value = true;

	const params = {
		chatId: conversationId.value,
		limit: 15, // 15 is enough amount of messages to get scroll on container
	};

	if (lastLoadedMessageId.value) {
		// 'offset.id' because the backend cant handle object
		params["offset.id"] = lastLoadedMessageId.value;
	}

	try {
		const { messages, peers, next } =
			await MessagesServiceAPI.getChatHistory(params);
		canLoadNextMessages.value = next;
		normalizedMessages.value = [
			...normalizeMessages(messages, peers),
			...normalizedMessages.value,
		];
	} finally {
		isChatLoading.value = false;
	}
};

const openChatMedia = ({file}) => {
  window.open(file.url, '_blank');
}

onMounted(async () => {
	if (!conversationId.value) return;
	loadNextMessages();
});
</script>

<style lang="scss" scoped>
@use '@webitel/ui-sdk/src/css/main' as *;

.chat-history__header {
  padding: var(--spacing-xs);
  margin-bottom: var(--spacing-xs);
}

.chat-history__title {
}

.chat-history__content {
  overflow: auto;
  display: flex;
}
</style>