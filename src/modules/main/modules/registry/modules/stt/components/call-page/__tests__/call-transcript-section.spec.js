import { shallowMount } from '@vue/test-utils';

import CallTranscript from '../../../api/callTranscript.js';
import CallTranscriptSection from '../call-transcript-section.vue';

let call;
let file;
let props;
let computed;

describe('CallTranscriptSection', () => {
	beforeEach(() => {
		file = {
			id: 1,
		};
		call = {
			files: [
				file,
			],
		};
		props = {
			call,
		};
		computed = {
			...CallTranscriptSection.computed,
			file: () => file,
		};
	});

	it('renders a component', () => {
		const wrapper = shallowMount(CallTranscriptSection, {
			props,
			computed,
		});
		expect(wrapper.isVisible()).toBe(true);
	});

	it('deleteTranscript removes file from call transcripts list', async () => {
		file = {
			id: 'jest',
		};
		call.files = [
			file,
		];
		call.transcripts = [
			file,
		];
		props = {
			call,
		};
		computed.file = () => file;
		CallTranscript.delete = vi.fn();
		const wrapper = shallowMount(CallTranscriptSection, {
			props,
			computed,
		});
		await wrapper.vm.deleteTranscript(file);
		expect(call.transcripts.length).toBe(0);
	});
});
