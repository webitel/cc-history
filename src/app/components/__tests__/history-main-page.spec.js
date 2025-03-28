import { shallowMount } from '@vue/test-utils';

import HistoryMainPage from '../history-main-page.vue';

describe('HistoryMainPage', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(HistoryMainPage);
    expect(wrapper.isVisible()).toBe(true);
  });
});
