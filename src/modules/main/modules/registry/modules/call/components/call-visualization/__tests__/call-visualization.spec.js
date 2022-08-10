import { shallowMount } from '@vue/test-utils';
import CallVisualization from '../call-visualization.vue';

let call;
let propsData;

describe('CallVisualization', () => {
  beforeEach(() => {
    call = { files: [{}] };
    propsData = { call };
  });

  it('renders a component', () => {
    const wrapper = shallowMount(CallVisualization, { propsData });
    expect(wrapper.isVisible()).toBe(true);
  });
  it('initially sets currentFile to first file from item.files', () => {
    const file = { id: 'jest' };
    call.files = [file];
    const wrapper = shallowMount(CallVisualization, { propsData });
    expect(wrapper.vm.currentFile).toBe(file);
  });
  it('deleteTranscript removes file from call transcripts list', () => {
    const file = { id: 'jest' };
    call.transcripts = [file];
    const wrapper = shallowMount(CallVisualization, { propsData });
    wrapper.vm.deleteTranscript(file);
    expect(call.transcripts.length).toBe(0);
  });
});
