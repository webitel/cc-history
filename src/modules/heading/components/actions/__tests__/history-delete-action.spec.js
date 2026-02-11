import { shallowMount } from '@vue/test-utils';

import HistoryDeleteAction from '../history-delete-action.vue';

let selected = [];
const props = {
	selected,
};

describe('HistoryDeleteAction', () => {
	beforeEach(() => {
		selected = [];
	});
	it('renders a component', () => {
		const wrapper = shallowMount(HistoryDeleteAction, {
			props,
		});
		expect(wrapper.isVisible()).toBe(true);
	});
	it('delete action is enabled is there`s some selected', () => {
		selected = [
			{
				files: {},
			},
		];
		const wrapper = shallowMount(HistoryDeleteAction, {
			props: {
				selected,
			},
		});
		const btn = wrapper.findComponent({
			name: 'wt-button-select',
		});
		expect(btn.vm.disabled).toBe(false);
	});
	it('delete action is disabled for no-selected', () => {
		selected = [];
		const wrapper = shallowMount(HistoryDeleteAction, {
			props: {
				selected,
			},
		});
		const btn = wrapper.findComponent({
			name: 'wt-button-select',
		});
		expect(btn.vm.disabled).toBe(true);
	});
	it('delete action is disabled for selected with no files or transcripts', () => {
		selected = [
			{},
			{},
		];
		const wrapper = shallowMount(HistoryDeleteAction, {
			props: {
				selected,
			},
		});
		const btn = wrapper.findComponent({
			name: 'wt-button-select',
		});
		expect(btn.vm.disabled).toBe(true);
	});
});
