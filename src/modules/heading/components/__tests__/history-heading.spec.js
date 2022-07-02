import { shallowMount, createLocalVue } from '@vue/test-utils';
import CSVExport from '@webitel/ui-sdk/src/modules/CSVExport/CSVExport';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import HistoryHeading from '../the-history-heading.vue';
import filters from '../../../filters/store/filters';
import registry from '../../../main/modules/registry/store/registry';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter();

describe('History heading section', () => {
  const store = new Vuex.Store({
    modules: { registry, filters },
  });

  it('renders a component', () => {
    const wrapper = shallowMount(HistoryHeading, { localVue, store });
    expect(wrapper.classes('the-history-heading')).toBe(true);
  });

  it('renders search filter', () => {
    const wrapper = shallowMount(HistoryHeading, { localVue, store });
    expect(wrapper.findComponent({ name: 'filter-search' }).isVisible()).toBe(true);
  });

  it('creates csv export module instance', () => {
    const wrapper = shallowMount(HistoryHeading, { localVue, store });
    expect(wrapper.vm.CSVExport instanceof CSVExport).toBe(true);
  });

  it('calls exportCSV mixin method at "export" button click', async () => {
    const exportCSVMock = jest.fn();
    const wrapper = shallowMount(HistoryHeading, { localVue, store, router });
    wrapper.vm.exportCSV = exportCSVMock;
    wrapper.findAllComponents({ name: 'wt-button' }).at(1).vm.$emit('click');
    expect(exportCSVMock).toHaveBeenCalled();
  });
});
