import { shallowMount } from '@vue/test-utils';
import store from '../../../../app/store';
import HistoryFilters from '../the-history-filters.vue';

describe('History filters section', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(HistoryFilters, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.classes('history-filters-section')).toBe(true);
  });

  it('expands filters panel', async () => {
    const wrapper = shallowMount(HistoryFilters, {
      global: {
        plugins: [store],
      },
    });
    wrapper.vm.expandFilters();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.history-filters--opened').exists()).toBe(true);
  });

  it('renders webitel-ui filters', () => {
    const wrapper = shallowMount(HistoryFilters, {
      global: {
        plugins: [store],
      },
    });
    const abstractEnumFilters = wrapper.findAllComponents({ name: 'abstract-enum-filter' });
    const abstractApiFilters = wrapper.findAllComponents({ name: 'abstract-api-filter' });
    expect(abstractEnumFilters.length)
    .toEqual(wrapper.vm.selectFilters.filter(({ type }) => type ===
      'enum').length);
    expect(abstractApiFilters.length)
    .toEqual(wrapper.vm.selectFilters.filter(({ type }) => type ===
      'api').length);
  });
});
