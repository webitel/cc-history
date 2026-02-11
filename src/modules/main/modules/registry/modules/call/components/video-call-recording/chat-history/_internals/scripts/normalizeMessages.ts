import { getMediaUrl } from '@webitel/api-services/api';
import { WebitelChatMessage, WebitelChatPeer } from '@webitel/api-services/gen';

// Normalize function to transform API messages to ChatMessageType format
export const normalizeMessages = (
	messages: WebitelChatMessage[],
	peers: WebitelChatPeer[],
) => {
	if (!messages?.length) return [];

	return messages
		.map((message) => ({
			id: parseInt(message.id),
			file: message.file && {
				...message.file,
				mime: message.file.type,
				url: getMediaUrl(message.file.id),
			},
			member: {
				...message.from,
				self:
					peers[+message.from?.id - 1].type === 'user' ||
					peers[+message.from?.id - 1].type === 'bot',
				type: peers[+message.from?.id - 1].type,
			},
			chat: message.chat,
			createdAt: new Date(parseInt(message.date)).getTime(),
			channelId: message.chat?.id,
			text: message.text,
		}))
		.reverse();
};
