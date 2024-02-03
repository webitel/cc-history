import { shallowMount, mount } from '@vue/test-utils';
import { HistoryFileJobHistoryFileJobState } from 'webitel-sdk';
import CallNoTranscriptSection from '../call-no-transcript-section.vue';
import CallTranscriptAPI from '../../../api/CallTranscriptAPI';

let call;
let file;
let props;
let computed;

describe('CallNoTranscriptSection', () => {
  beforeEach(() => {
    file = { id: 1 };
    call = { files: [file] };
    props = { call };
    computed = {
      ...CallNoTranscriptSection.computed,
      file: () => file,
    };
  });

  it('renders a component', () => {
    const wrapper = shallowMount(CallNoTranscriptSection, {
      props,
      computed,
    });
    expect(wrapper.isVisible()).toBe(true);
  });
  it('falsy fileJob computed, if call has no filesJob', () => {
    const wrapper = shallowMount(CallNoTranscriptSection, {
      props,
      computed,
    });
    expect(wrapper.vm.fileJob).toBeFalsy();
  });
  it('correctly computes fileJob from call.filesJob', () => {
    const fileJob = { fileId: 'jst' };
    call.filesJob = [fileJob];
    file.id = 'jst';
    const wrapper = shallowMount(CallNoTranscriptSection, {
      props,
      computed,
    });
    expect(wrapper.vm.fileJob).toStrictEqual(fileJob);
  });
  it('"transcribe" btn click calls "create" api method with call id', () => {
    const callId = 'jest';
    call.id = callId;

    vi.spyOn(CallNoTranscriptSection.methods, 'refreshCall')
    .mockImplementationOnce(() => {});

    const wrapper = mount(CallNoTranscriptSection, {
      props,
      computed,
    });
    const mock = vi.fn();
    vi.spyOn(CallTranscriptAPI, 'create')
    .mockImplementationOnce(mock);

    const btn = wrapper.findComponent({ name: 'wt-button' });
    expect(btn.text().includes('Transcribe')).toBe(true);

    btn.vm.$emit('click');
    expect(mock).toHaveBeenCalledWith({ callId });
  });

  it('error state retry calls "create" api method', () => {
    const callId = 'jest';
    call.id = callId;

    file.id = 1;
    call.filesJob = [{ fileId: 1, state: HistoryFileJobHistoryFileJobState.Error }];

    vi.spyOn(CallNoTranscriptSection.methods, 'refreshCall')
    .mockImplementationOnce(() => {});

    const wrapper = mount(CallNoTranscriptSection, {
      props,
      computed,
    });

    const mock = vi.fn();
    vi.spyOn(CallTranscriptAPI, 'create')
    .mockImplementationOnce(mock);

    const btn = wrapper.findComponent({ name: 'wt-button' });
    expect(btn.text().includes('Retry')).toBe(true);

    btn.vm.$emit('click');
    expect(mock).toHaveBeenCalledWith({ callId });
  });
});
