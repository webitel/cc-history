import { shallowMount } from '@vue/test-utils';
import CallTranscriptSection from '../call-transcript-section.vue';

let call;
let file;
let props;

describe('CallTranscriptSection', () => {
  beforeEach(() => {
    file = { id: 1 };
    call = { files: [file] };
    props = { file, call };
  });

  it('renders a component', () => {
    const wrapper = shallowMount(CallTranscriptSection, { props });
    expect(wrapper.isVisible()).toBe(true);
  });
});
