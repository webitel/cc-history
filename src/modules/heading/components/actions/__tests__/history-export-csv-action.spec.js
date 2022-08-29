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

  it('cleanups fields before exportCSC', async () => {
    const fields = ['id', 'files_job', 'agent', 'transcripts', 'jest'];
    const output = ['id', 'agent', 'jest'];
    const exportCSVMock = jest.fn();
    const wrapper = shallowMount(HistoryExportCsvAction, { propsData: { ...propsData, fields } });
    wrapper.vm.exportCSV = exportCSVMock;
    wrapper.findComponent({ name: 'wt-button' }).vm.$emit('click');
    expect(exportCSVMock.mock.calls[0][0].fields).toEqual(output);
  });
});
