import { shallowMount } from '@vue/test-utils';
import HistoryTranscribeAction from '../history-transcribe-action.vue';

const selected = [];
const propsData = { selected };

describe('HistoryTranscribeAction', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(HistoryTranscribeAction, { propsData });
    expect(wrapper.isVisible()).toBe(true);
  });
});
