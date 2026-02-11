import { shallowMount } from '@vue/test-utils';
import CSVExport from '@webitel/ui-sdk/src/modules/CSVExport/CSVExport';

import HistoryExportAction from '../history-export-action.vue';

const dataList = [];

const props = {
	dataList,
	fields: [],
};

describe('HistoryExportCsvAction', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(HistoryExportAction, {
			props,
		});
		expect(wrapper.isVisible()).toBe(true);
	});

	it('creates csv export module instance', () => {
		const wrapper = shallowMount(HistoryExportAction, {
			props,
		});
		expect(wrapper.vm.CSVExport instanceof CSVExport).toBe(true);
	});
});
