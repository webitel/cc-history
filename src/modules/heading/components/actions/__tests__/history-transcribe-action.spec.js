import { shallowMount } from '@vue/test-utils';
import { EngineCallFileType } from '@webitel/api-services/gen/models';

import HistoryTranscribeAction from '../history-transcribe-action.vue';

let selected = [];
const props = {
	selected,
};

describe('HistoryTranscribeAction', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(HistoryTranscribeAction, {
			props,
		});
		expect(wrapper.exists()).toBe(true);
	});
	it('transcribe action is enabled when selected calls have audio files', () => {
		selected = [
			{
				files: {
					[EngineCallFileType.FileTypeAudio]: [
						{
							id: 12,
						},
					],
				},
			},
		];
		const wrapper = shallowMount(HistoryTranscribeAction, {
			props: {
				selected,
			},
		});
		const btn = wrapper.findComponent({
			name: 'wt-button',
		});
		expect(btn.vm.disabled).toBe(false);
	});
	it('transcribe action is disabled when nothing is selected', () => {
		selected = [];
		const wrapper = shallowMount(HistoryTranscribeAction, {
			props: {
				selected,
			},
		});
		const btn = wrapper.findComponent({
			name: 'wt-button',
		});
		expect(btn.vm.disabled).toBe(true);
	});
	it('transcribe action is disabled for selected calls without audio files', () => {
		selected = [
			{},
			{},
		];
		const wrapper = shallowMount(HistoryTranscribeAction, {
			props: {
				selected,
			},
		});
		const btn = wrapper.findComponent({
			name: 'wt-button',
		});
		expect(btn.vm.disabled).toBe(true);
	});
});
