import { shallowMount } from '@vue/test-utils';
import SttPopup from '../stt-popup.vue';
import transcriptPhrasesMixin from '../../../mixins/transcriptPhrasesMixin';
import axiosMock from '@webitel/ui-sdk/src/tests/mocks/axiosMock.js';

const transcripts = [];
const props = { callId: '1' };

vi.doMock('../../src/app/api/instance', axiosMock());

describe('SttPopup', () => {
  beforeEach(() => {
    transcripts.length = 0;
  });

  vi.spyOn(transcriptPhrasesMixin.methods, 'loadCallTranscript').mockImplementation(vi.fn());
  vi.spyOn(transcriptPhrasesMixin.methods, 'deleteTranscription').mockImplementation(vi.fn());

  it('renders a component', () => {
    const wrapper = shallowMount(SttPopup, {
      props,
    });
    expect(wrapper.isVisible()).toBe(true);
  });
  it('fetches call with transcripts', async () => {
    const mock = vi.fn();
    vi.spyOn(SttPopup.methods, 'loadCall')
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
