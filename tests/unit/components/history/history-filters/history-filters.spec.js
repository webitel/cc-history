import { shallowMount } from '@vue/test-utils';
import HistoryFilters from '../../../../../src/components/history/history-filters/the-history-filters.vue';

describe('History filters section', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(HistoryFilters);
    expect(wrapper.classes('history-filters-section')).toBe(true);
  });

  it('expands filters panel', async () => {
    const wrapper = shallowMount(HistoryFilters);
    wrapper.vm.expandFilters();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.history-filters--opened').exists()).toBe(true);
  });
});
