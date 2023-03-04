import { shallowMount } from '@vue/test-utils';
import { HistoryFileJobHistoryFileJobState } from 'webitel-sdk';
import CallNoTranscriptSection from '../call-no-transcript-section.vue';
import CallTranscriptAPI from '../../../api/CallTranscriptAPI';

let call;
let file;
let props;

describe('CallNoTranscriptSection', () => {
  beforeEach(() => {
    file = { id: 1 };
    call = { files: [file] };
    props = { file, call };
  });

  it('renders a component', () => {
    const wrapper = shallowMount(CallNoTranscriptSection, {
      props,
    });
    expect(wrapper.isVisible()).toBe(true);
  });
  it('falsy fileJob computed, if call has no filesJob', () => {
    const wrapper = shallowMount(CallNoTranscriptSection, {
      props,
    });
    expect(wrapper.vm.fileJob).toBeFalsy();
  });
  it('correctly computes fileJob from call.filesJob', () => {
    const fileJob = { fileId: 'jst' };
    call.filesJob = [fileJob];
    file.id = 'jst';
    const wrapper = shallowMount(CallNoTranscriptSection, {
      props,
    });
    expect(wrapper.vm.fileJob).toBe(fileJob);
  });
  it('"transcribe" btn click calls "create" api method with call id', () => {
    const callId = 'jest';
    call.id = callId;

    const wrapper = shallowMount(CallNoTranscriptSection, {
      props,
    });
    const mock = jest.fn();
    jest.spyOn(CallTranscriptAPI, 'create')
    .mockImplementationOnce(mock);

    const btn = wrapper.findComponent({ name: 'wt-button' });
    expect(btn.text().includes('transcribe')).toBe(true);

    btn.vm.$emit('click');
    expect(mock).toHaveBeenCalledWith({ callId });
  });

  it('error state retry calls "create" api method', () => {
    const callId = 'jest';
    call.id = callId;

    file.id = 1;
    call.filesJob = [{ fileId: 1, state: HistoryFileJobHistoryFileJobState.Error }];

    const wrapper = shallowMount(CallNoTranscriptSection, {
      props,
    });

    const mock = jest.fn();
    jest.spyOn(CallTranscriptAPI, 'create')
    .mockImplementationOnce(mock);

    const btn = wrapper.findComponent({ name: 'wt-button' });
    expect(btn.text().includes('retry')).toBe(true);

    btn.vm.$emit('click');
    expect(mock).toHaveBeenCalledWith({ callId });
  });
});
