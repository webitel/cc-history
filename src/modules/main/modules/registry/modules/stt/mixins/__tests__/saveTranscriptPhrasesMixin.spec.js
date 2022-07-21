import { shallowMount } from '@vue/test-utils';
import saveAs from 'file-saver';
import SaveTranscriptPhrasesMixin from '../saveTranscriptPhrasesMixin';

const Component = {
  mixins: [SaveTranscriptPhrasesMixin],
  render() {},
};

jest.mock('file-saver');

describe('SaveTranscriptPhrasesMixin', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(Component);
    expect(wrapper.exists()).toBe(true);
  });
  it('calls saveAs at downloadTxt method', () => {
    const wrapper = shallowMount(Component, {
      data: () => ({
        transcript: { id: 'jest' },
      }),
    });
    wrapper.vm.downloadTxt([]);
    expect(saveAs).toHaveBeenCalled();
  });
});
