import { shallowMount } from '@vue/test-utils';
import CallTranscriptSection from '../call-transcript-section.vue';
import CallTranscriptAPI from '../../../api/CallTranscriptAPI';

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

  it('deleteTranscript removes file from call transcripts list', async () => {
    file = { id: 'jest' };
    call.files = [file];
    call.transcripts = [file];
    props = { file, call };
    CallTranscriptAPI.delete = jest.fn();
    const wrapper = shallowMount(CallTranscriptSection, { props });
    await wrapper.vm.deleteTranscript(file);
    expect(call.transcripts.length).toBe(0);
  });
});
