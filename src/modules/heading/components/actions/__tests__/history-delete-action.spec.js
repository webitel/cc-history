import { shallowMount } from '@vue/test-utils';
import HistoryDeleteAction from '../history-delete-action.vue';

const selected = [];
const propsData = { selected };

describe('HistoryDeleteAction', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(HistoryDeleteAction, { propsData });
    expect(wrapper.isVisible()).toBe(true);
  });
});
