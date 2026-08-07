import { shallowMount } from '@vue/test-utils';

// `useUserAccessControl` is a `let` populated only at app init (main.ts),
// so it is undefined under the test runner — provide a stub implementation.
const hasDeleteAccess = await vi.hoisted(async () => {
	const { ref } = await import('vue');
	return ref(true);
});
vi.mock('../../../../../app/composables/useUserAccessControl', () => ({
	useUserAccessControl: () => ({
		hasDeleteAccess,
	}),
}));

import HistoryDeleteAction from '../history-delete-action.vue';

// wt-button-select is a globally-registered async component that does not
// resolve under the test runner, so stub it to inspect the `disabled` prop
// and `options` it binds (`:disabled="disableDelete"`, `:options="deleteOptions"`).
const WtButtonSelectStub = {
	name: 'wt-button-select',
	props: [
		'disabled',
		'options',
	],
	template: '<div><slot /></div>',
};

const mountAction = (selected) =>
	shallowMount(HistoryDeleteAction, {
		props: {
			selected,
		},
		global: {
			stubs: {
				'wt-button-select': WtButtonSelectStub,
			},
		},
	});

const findButton = (wrapper) =>
	wrapper.findComponent({
		name: 'wt-button-select',
	});

const findOption = (wrapper, value) =>
	findButton(wrapper)
		.props('options')
		.find((option) => option.value === value);

describe('HistoryDeleteAction', () => {
	beforeEach(() => {
		hasDeleteAccess.value = true;
	});

	it('renders a component', () => {
		const wrapper = mountAction([]);
		expect(wrapper.isVisible()).toBe(true);
	});

	it('delete action is enabled if there`s some selected', () => {
		const wrapper = mountAction([
			{
				files: {
					file_type_audio: [
						{
							id: '1',
						},
					],
				},
			},
		]);
		expect(findButton(wrapper).props('disabled')).toBe(false);
	});

	it('delete action is disabled for no-selected', () => {
		const wrapper = mountAction([]);
		expect(findButton(wrapper).props('disabled')).toBe(true);
	});

	it('delete action is disabled for selected with no files or transcripts', () => {
		const wrapper = mountAction([
			{},
			{},
		]);
		expect(findButton(wrapper).props('disabled')).toBe(true);
	});

	it('disables the audio-recording option when no audio files are selected', () => {
		const wrapper = mountAction([
			{
				files: {
					file_type_video: [
						{
							id: '1',
						},
					],
				},
			},
		]);
		expect(findOption(wrapper, 'audio-recording').disabled).toBe(true);
		expect(findOption(wrapper, 'video-recording').disabled).toBe(false);
	});

	it('enables the screen-recording option regardless of delete access', () => {
		hasDeleteAccess.value = false;
		const wrapper = mountAction([
			{
				files: {
					file_type_screensharing: [
						{
							id: '1',
						},
					],
				},
			},
		]);
		expect(findOption(wrapper, 'screen-recording').disabled).toBe(false);
	});

	it('disables audio/video/transcript options when the user lacks delete access', () => {
		hasDeleteAccess.value = false;
		const wrapper = mountAction([
			{
				files: {
					file_type_audio: [
						{
							id: '1',
						},
					],
					file_type_video: [
						{
							id: '2',
						},
					],
				},
				transcripts: [
					{
						id: '3',
					},
				],
			},
		]);
		expect(findOption(wrapper, 'audio-recording').disabled).toBe(true);
		expect(findOption(wrapper, 'video-recording').disabled).toBe(true);
		expect(findOption(wrapper, 'transcript').disabled).toBe(true);
	});
});
