import { shallowMount } from '@vue/test-utils';

import transcriptPhrasesMixin from '../../../mixins/transcriptPhrasesMixin';
import SttPopup from '../stt-popup.vue';

const props = {
	call: {
		id: '1',
		transcripts: [],
	},
};

describe('SttPopup', () => {
	vi.spyOn(
		transcriptPhrasesMixin.methods,
		'loadCallTranscript',
	).mockImplementation(vi.fn());
	vi.spyOn(
		transcriptPhrasesMixin.methods,
		'deleteTranscription',
	).mockImplementation(vi.fn());

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
			props,
		});
		await wrapper.vm.handleDeleteTranscription();
		expect(wrapper.emitted().close).toBeTruthy();
	});
});
