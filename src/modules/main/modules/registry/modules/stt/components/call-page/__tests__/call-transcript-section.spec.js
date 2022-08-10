import { shallowMount } from '@vue/test-utils';
import CallTranscriptSection from '../call-transcript-section.vue';

let call;
let file;
let propsData;

describe('CallTranscriptSection', () => {
  beforeEach(() => {
    file = { id: 1 };
    call = { files: [file] };
    propsData = { file, call };
  });

  it('renders a component', () => {
    const wrapper = shallowMount(CallTranscriptSection, { propsData });
    expect(wrapper.isVisible()).toBe(true);
  });
});
