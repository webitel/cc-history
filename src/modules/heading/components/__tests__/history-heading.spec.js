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
    expect(wrapper.findComponent({ name: 'history-search' }).isVisible()).toBe(true);
  });
});
