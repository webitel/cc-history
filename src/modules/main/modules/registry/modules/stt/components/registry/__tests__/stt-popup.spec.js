import { shallowMount } from '@vue/test-utils';
import SttPopup from '../stt-popup.vue';
import transcriptPhrasesMixin from '../../../mixins/transcriptPhrasesMixin';

const transcripts = [];
const props = { callId: '1' };

vi.mock('axios', () => {
  return {
    default: {
      request: vi.fn(() => Promise.resolve({ data: { items: [{ transcripts: [] }] }})),
      create: vi.fn().mockReturnThis(),
      interceptors: {
        request: {
          use: vi.fn(), eject: vi.fn(),
        }, response: {
          use: vi.fn(), eject: vi.fn(),
        },
      },
    },
  };
});

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
