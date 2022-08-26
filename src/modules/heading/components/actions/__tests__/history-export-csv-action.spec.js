import { shallowMount } from '@vue/test-utils';
import CSVExport from '@webitel/ui-sdk/src/modules/CSVExport/CSVExport';
import HistoryExportCsvAction from '../history-export-csv-action.vue';

const dataList = [];

const propsData = { dataList, fields: [] };

describe('HistoryExportCsvAction', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(HistoryExportCsvAction, { propsData });
    expect(wrapper.isVisible()).toBe(true);
  });

  it('creates csv export module instance', () => {
    const wrapper = shallowMount(HistoryExportCsvAction, { propsData });
    expect(wrapper.vm.CSVExport instanceof CSVExport).toBe(true);
  });

  it('calls exportCSV mixin method at "export" button click', async () => {
    const exportCSVMock = jest.fn();
    const wrapper = shallowMount(HistoryExportCsvAction, { propsData });
    wrapper.vm.exportCSV = exportCSVMock;
    wrapper.findComponent({ name: 'wt-button' }).vm.$emit('click');
    expect(exportCSVMock).toHaveBeenCalled();
  });
});
