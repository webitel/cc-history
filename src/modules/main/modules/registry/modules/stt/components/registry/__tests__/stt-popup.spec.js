import { shallowMount } from '@vue/test-utils';
import SttPopup from '../stt-popup.vue';
import transcriptPhrasesMixin from '../../../mixins/transcriptPhrasesMixin';

const transcripts = [];
const propsData = { call: { transcripts } };

describe('SttPopup', () => {
  beforeEach(() => {
    transcripts.length = 0;
  });

  jest.spyOn(transcriptPhrasesMixin.methods, 'loadCallTranscript').mockImplementation(jest.fn());
  jest.spyOn(transcriptPhrasesMixin.methods, 'deleteTranscription').mockImplementation(jest.fn());

  it('renders a component', () => {
    const wrapper = shallowMount(SttPopup, {
      propsData,
    });
    expect(wrapper.isVisible()).toBe(true);
  });
  it('initializes with first passed transcript', () => {
    const transcript = { id: 1 };
    transcripts.push(transcript);
    const wrapper = shallowMount(SttPopup, {
      propsData,
    });
    expect(wrapper.vm.transcript).toBe(transcript);
  });
  it('closes popup if no transcripts after delete', async () => {
    const wrapper = shallowMount(SttPopup, {
      propsData,
    });
    await wrapper.vm.handleDeleteTranscription();
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
