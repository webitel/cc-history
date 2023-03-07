import { shallowMount } from '@vue/test-utils';
import SttPopup from '../stt-popup.vue';
import transcriptPhrasesMixin from '../../../mixins/transcriptPhrasesMixin';

const transcripts = [];
const props = { callId: '1' };

describe('SttPopup', () => {
  beforeEach(() => {
    transcripts.length = 0;
  });

  jest.spyOn(transcriptPhrasesMixin.methods, 'loadCallTranscript').mockImplementation(jest.fn());
  jest.spyOn(transcriptPhrasesMixin.methods, 'deleteTranscription').mockImplementation(jest.fn());

  it('renders a component', () => {
    const wrapper = shallowMount(SttPopup, {
      props,
    });
    expect(wrapper.isVisible()).toBe(true);
  });
  it('fetches call with transcripts', async () => {
    const mock = jest.fn();
    jest.spyOn(SttPopup.methods, 'loadCall')
    .mockImplementationOnce(mock);
    const wrapper = shallowMount(SttPopup, {
      props,
    });
    await wrapper.vm.$nextTick();
    expect(mock).toHaveBeenCalled();
  });
  it('closes popup if no transcripts after delete', async () => {
    const wrapper = shallowMount(SttPopup, {
      props,
    });
    await wrapper.vm.handleDeleteTranscription();
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
