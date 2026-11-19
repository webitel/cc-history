import { shallowMount } from '@vue/test-utils';
import { CallTranscriptAPI } from '@webitel/api-services/api';

import SttPopup from '../stt-popup.vue';

vi.mock('@webitel/api-services/api', () => ({
	CallTranscriptAPI: {
		get: vi.fn(() => Promise.resolve([])),
		delete: vi.fn(() => Promise.resolve()),
	},
}));

const props = {
	call: {
		id: '1',
		transcripts: [],
	},
};

describe('SttPopup', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(SttPopup, {
			props,
		});
		expect(wrapper.isVisible()).toBe(true);
	});
	it('initializes transcript from call prop', async () => {
		const wrapper = shallowMount(SttPopup, {
			props: {
				call: {
					id: '1',
					transcripts: [
						{
							id: '177',
							name: 'recording.wav',
						},
					],
				},
			},
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.transcript).toEqual({
			id: '177',
			name: 'recording.wav',
		});
	});
	it('closes popup if no transcripts after delete', async () => {
		const wrapper = shallowMount(SttPopup, {
			props: {
				call: {
					id: '1',
					transcripts: [
						{
							id: '177',
							name: 'recording.wav',
						},
					],
				},
			},
		});
		await wrapper.vm.handleDeleteTranscription();
		expect(CallTranscriptAPI.delete).toHaveBeenCalledWith({
			fileId: '177',
		});
		expect(wrapper.emitted().delete).toBeTruthy();
		expect(wrapper.emitted().close).toBeTruthy();
	});
});
