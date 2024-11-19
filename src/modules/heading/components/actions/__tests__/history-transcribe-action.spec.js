import { shallowMount } from '@vue/test-utils';
import HistoryTranscribeAction from '../history-transcribe-action.vue';

let selected = [];
const props = { selected };

describe('HistoryTranscribeAction', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(HistoryTranscribeAction, { props });
    expect(wrapper.isVisible()).toBe(true);
  });
  it('transcribe action is enabled is there`s some selected', () => {
    selected = [{ files: { id: 12 } }];
    const wrapper = shallowMount(HistoryTranscribeAction, { props: { selected } });
    const btn = wrapper.findComponent({ name: 'wt-button' });
    expect(btn.vm.disabled).toBe(false);
  });
  it('transcribe action is disabled for noed', () => {
    selected = [];
    const wrapper = shallowMount(HistoryTranscribeAction, { props: { selected } });
    const btn = wrapper.findComponent({ name: 'wt-button' });
    expect(btn.vm.disabled).toBe(true);
  });
  it('transcribe action is disabled for selected with no files or transcripts', () => {
    selected = [{}, {}];
    const wrapper = shallowMount(HistoryTranscribeAction, { props: { selected } });
    const btn = wrapper.findComponent({ name: 'wt-button' });
    expect(btn.vm.disabled).toBe(true);
  });
});
