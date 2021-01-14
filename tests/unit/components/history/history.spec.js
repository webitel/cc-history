import { shallowMount } from '@vue/test-utils';
import TheHistory from '../../../../src/components/history/the-history.vue';

describe('The History', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(TheHistory);
    expect(wrapper.classes('the-history')).toBe(true);
  });
});
