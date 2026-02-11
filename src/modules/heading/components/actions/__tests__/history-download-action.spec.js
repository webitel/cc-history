import { shallowMount } from '@vue/test-utils';

import HistoryDownloadAction from '../history-download-action.vue';

const dataList = [];
const selected = [];
const props = {
	selected,
	dataList,
};

describe('HistoryDownloadAction', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(HistoryDownloadAction, {
			props,
		});
		expect(wrapper.isVisible()).toBe(true);
	});
});
