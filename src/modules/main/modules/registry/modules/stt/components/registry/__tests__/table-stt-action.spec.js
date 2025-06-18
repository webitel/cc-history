import { mount,shallowMount } from '@vue/test-utils';
import { EngineHistoryFileJobHistoryFileJobState } from 'webitel-sdk';

import TranscriptionState from '../../../enums/TranscriptionState.enum';
import TableSttAction from '../table-stt-action.vue';

let item;
let props;

describe('TableSttAction', () => {
  beforeEach(() => {
    item = {};
    props = { item };
  });

  it('renders a component', () => {
    const wrapper = shallowMount(TableSttAction, { props });
    expect(wrapper.isVisible()).toBe(true);
  });
  it('correctly computed fileJob from item.filesJob', () => {
    const job = {};
    item.filesJob = [job];
    const wrapper = shallowMount(TableSttAction, { props });
    expect(wrapper.vm.fileJob).toStrictEqual(job);
  });
  it('currentState for IDLE fileJob is IDLE', () => {
    item.filesJob = [{ state: EngineHistoryFileJobHistoryFileJobState.Idle }];
    const wrapper = shallowMount(TableSttAction, { props });
    expect(wrapper.vm.currentState.value).toBe(TranscriptionState.IDLE);
  });
  it('currentState for ERROR fileJob is ERROR', () => {
    item.filesJob = [{ state: EngineHistoryFileJobHistoryFileJobState.Error }];
    const wrapper = shallowMount(TableSttAction, { props });
    expect(wrapper.vm.currentState.value).toBe(TranscriptionState.ERROR);
  });
  it('currentState for existing transcripts is DONE', () => {
    item.transcripts = [{}];
    const wrapper = shallowMount(TableSttAction, { props });
    expect(wrapper.vm.currentState.value).toBe(TranscriptionState.DONE);
  });
  it('currentState for no fileJob or transcripts is NONE', () => {
    const wrapper = shallowMount(TableSttAction, { props });
    expect(wrapper.vm.currentState.value).toBe(TranscriptionState.NONE);
  });
  it('activator icon-btn for NONE state triggers handleJobStart method', () => {
    const wrapper = mount(TableSttAction, { props });
    expect(wrapper.vm.currentState.value).toBe(TranscriptionState.NONE);

    /**
     * Don't know why, but I can't catch handleStartJob itself :(
     */
    const mock = vi.fn();
    // vi.spyOn(TableSttAction.methods, 'handleStartJob')
    // .mockImplementationOnce(mock);
    wrapper.vm.currentState.handler = mock;

    wrapper.findComponent({ name: 'wt-icon-btn' }).vm.$emit('click');
    expect(mock).toHaveBeenCalled();
  });
});
