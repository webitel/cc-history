import { shallowMount } from '@vue/test-utils';
import CallTranscriptAPI from '../../api/callTranscript.js';
import TranscriptPhrasesMixin from '../transcriptPhrasesMixin';

const Component = {
  mixins: [TranscriptPhrasesMixin],
  render() {},
};

let getterMock;

describe('TranscriptPhrasesMixin', () => {
  beforeEach(() => {
    getterMock = vi.fn();
    vi.spyOn(CallTranscriptAPI, 'get').mockImplementation(getterMock);
  });

  it('renders a component', () => {
    const wrapper = shallowMount(Component);
    expect(wrapper.exists()).toBe(true);
  });

  it('calls getTranscript api if there is a transcript', async () => {
    const wrapper = shallowMount(Component, {
      data: () => ({
        transcript: { id: 'jest' },
      }),
    });
    await wrapper.vm.$nextTick();
    expect(getterMock).toHaveBeenCalledWith({ id: 'jest' });
  });

  it('correctly computes phrases from data', async () => {
    const call = { from: { name: 'jest1' }, to: { name: 'jest2' } };
    const phrases = [
      {
        startSec: 1, endSec: 2, phrase: 'lorem', channel: 0,
      },
      {
        startSec: 2, endSec: 3, phrase: 'ipsum', channel: 1,
      },
    ];
    const data = [
      {
        time: '1 - 2', phrase: 'lorem', channel: 'jest1',
      },
      {
        time: '2 - 3', phrase: 'ipsum', channel: 'jest2',
      },
    ];
    const wrapper = shallowMount(Component, {
      data: () => ({
        call,
        phrases: [],
      }),
    });
    wrapper.setData({ phrases });
    expect(wrapper.vm.data).toEqual(data);
  });

  it('reset phrases if call transcript is removed', async () => {
    const wrapper = shallowMount(Component, {
      data: () => ({
        transcript: { id: 'jest' },
        phrases: [1, 2, 3],
      }),
    });
    wrapper.setData({ transcript: null });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.phrases).toEqual([]);
  });

  it('calls api delete method at deleteTranscription call', async () => {
    const wrapper = shallowMount(Component, {
      data: () => ({
        transcript: { id: 'jest' },
      }),
    });

    const mock = vi.fn();
    vi.spyOn(CallTranscriptAPI, 'delete').mockImplementationOnce(mock);

    wrapper.vm.deleteTranscription();
    expect(mock).toHaveBeenCalledWith({ fileId: 'jest' });
  });
});
