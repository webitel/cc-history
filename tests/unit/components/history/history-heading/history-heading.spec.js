import { shallowMount, createLocalVue } from '@vue/test-utils';
import CSVExport from '@webitel/ui-sdk/src/modules/CSVExport/CSVExport';
import Vuex from 'vuex';
import HistoryHeading from '../../../../../src/components/history/history-heading/the-history-heading.vue';
import history from '../../../../../src/store/modules/history/history';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('History heading section', () => {
  const store = new Vuex.Store({
    modules: { history },
  });

  it('renders a component', () => {
    const wrapper = shallowMount(HistoryHeading, { localVue, store });
    expect(wrapper.classes('the-history-heading')).toBe(true);
  });

  it('creates csv export module instance', () => {
    const wrapper = shallowMount(HistoryHeading, { localVue, store });
    expect(wrapper.vm.CSVExport instanceof CSVExport).toBe(true);
  });

  it('calls exportCSV mixin method at "export" button click', async () => {
    const exportCSVMock = jest.fn();
    const wrapper = shallowMount(HistoryHeading, { localVue, store });
    wrapper.vm.exportCSV = exportCSVMock;
    wrapper.findAllComponents({ name: 'wt-button' }).at(1).vm.$emit('click');
    await wrapper.vm.$nextTick();
    expect(exportCSVMock).toHaveBeenCalled();
  });
});