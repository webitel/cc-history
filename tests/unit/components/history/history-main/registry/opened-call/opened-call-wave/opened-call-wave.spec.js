import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import WaveSurferVue from 'wavesurfer.js-vue';
import OpenedCallWave
  from '../../../../../../../../src/components/history/history-main/registry/opened-call/opened-call-wave/opened-call-wave.vue';
import registry from '../../../../../../../../src/store/modules/registry/registry';
import playerMock from '../../../../../../mocks/waveSurferMock';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(WaveSurferVue);

describe('Opened call wave', () => {
  const callMock = {
    id: 'id',
    annotations: [],
    from: { name: 'A' },
    to: { name: 'B' },
    hold: [],
  };

  let store;
  const draft = {
    id: '123',
    note: 'draft',
    startSec: 1,
    endSec: 2,
  };

  const actionMocks = {
    ADD_ANNOTATION: jest.fn(),
    EDIT_ANNOTATION: jest.fn(),
    DELETE_ANNOTATION: jest.fn(),
  };

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        registry: {
          ...registry,
        },
      },
    });
  });

  it('renders a component', () => {
    const wrapper = shallowMount(OpenedCallWave, {
      localVue,
      store,
      computed: {
        call: () => callMock,
        player: () => playerMock,
      },
    });
    expect(wrapper.classes('call-wave-page')).toBe(true);
  });

  it('opens and closes the form on comment button click', async () => {
    const wrapper = shallowMount(OpenedCallWave, {
      localVue,
      store,
      data: () => ({ commentsMode: true }),
      computed: {
        call: () => callMock,
        player: () => playerMock,
      },
    });
    expect(wrapper.findComponent({ name: 'opened-call-comment-form' }).isVisible()).toBe(true);
    await wrapper.findAllComponents({ name: 'wt-icon-btn' })
      .filter((btn) => btn.props().icon === 'note').wrappers[0].vm.$emit('click');

    expect(wrapper.findComponent({ name: 'opened-call-comment-form' }).exists()).toBe(false);
  });

  it('emits save event with comment draft object and calls the add annotation action if no id passed', async () => {
    const wrapper = shallowMount(OpenedCallWave, {
      localVue,
      store,
      data: () => ({ commentsMode: true }),
      computed: {
        call: () => callMock,
        player: () => playerMock,
      },
    });
    wrapper.vm.addAnnotation = actionMocks.ADD_ANNOTATION;
    const draftWithNoId = { ...draft };
    delete draftWithNoId.id;
    await wrapper.findComponent({ name: 'opened-call-comment-form' }).vm.$emit('save', draftWithNoId);
    expect(wrapper.findComponent({ name: 'opened-call-comment-form' }).emitted().save[0][0]).toBe(draftWithNoId);
    expect(actionMocks.ADD_ANNOTATION).toHaveBeenCalled();
  });

  it('emits save event with comment draft object on save and calls the edit annotation method', async () => {
    const wrapper = shallowMount(OpenedCallWave, {
      localVue,
      store,
      data: () => ({ commentsMode: true }),
      computed: {
        call: () => callMock,
        player: () => playerMock,
      },
    });
    wrapper.vm.updateAnnotation = actionMocks.EDIT_ANNOTATION;
    await wrapper.findComponent({ name: 'opened-call-comment-form' }).vm.$emit('save', draft);
    expect(wrapper.findComponent({ name: 'opened-call-comment-form' }).emitted().save[0][0]).toBe(draft);
    expect(actionMocks.EDIT_ANNOTATION).toHaveBeenCalled();
  });

  it('emits delete event and calls a delete method', async () => {
    const wrapper = shallowMount(OpenedCallWave, {
      localVue,
      store,
      data: () => ({ commentsMode: true, selectedComment: draft }),
      computed: {
        call: () => callMock,
        player: () => playerMock,
      },
    });
    wrapper.vm.deleteAnnotation = actionMocks.DELETE_ANNOTATION;
    await wrapper.findComponent({ name: 'opened-call-comment-form' }).vm.$emit('delete', draft);
    expect(wrapper.findComponent({ name: 'opened-call-comment-form' }).emitted().delete.length).toBe(1);
    expect(actionMocks.DELETE_ANNOTATION).toHaveBeenCalled();
  });

  it('changes volume and mutes / unmutes on slider input', async () => {
    const wrapper = shallowMount(OpenedCallWave, {
      localVue,
      store,
      computed: {
        call: () => callMock,
        player: () => playerMock,
      },
      data: () => ({
        volumeLeftGain: 1,
        leftGain: {
          muted: false,
          audio: { gain: { value: 1 } },
        },
      }),
    });
    const slider = wrapper.findComponent({ name: 'wt-slider' }).vm;
    await slider.$emit('input', 2);
    expect(wrapper.vm.$data.leftGain.audio.gain.value).toBe(2);
    await slider.$emit('input', 0);
    expect(wrapper.vm.$data.leftGain.audio.gain.value).toBe(0);
    expect(wrapper.vm.$data.leftGain.muted).toBe(true);
  });

  it('changes playbackRate on button click', async () => {
    const wrapper = shallowMount(OpenedCallWave, {
      localVue,
      store,
      data: () => ({ playbackRate: 1, isPlaying: false }),
      computed: {
        call: () => callMock,
        player: () => playerMock,
      },
    });
    await wrapper.findAllComponents({ name: 'wt-button' })
      .filter((btn) => btn.text() === 'x2').wrappers[0].vm.$emit('click');
    expect(wrapper.vm.$data.playbackRate).toBe(2);
    expect(playerMock.setPlaybackRate).toBeCalled();
    expect(playerMock.setPlaybackRate.mock.calls[0][0]).toBe(2);
  });

  it('changes zoom on zoom button click', async () => {
    const zoom = 1;
    const wrapper = shallowMount(OpenedCallWave, {
      localVue,
      store,
      data: () => ({ zoom }),
      computed: {
        call: () => callMock,
        player: () => playerMock,
      },
    });
    await wrapper.findAllComponents({ name: 'wt-button' })
      .filter((btn) => btn.html().includes('zoom-in')).wrappers[0].vm.$emit('click');
    expect(playerMock.zoom).toHaveBeenCalled();
    expect(playerMock.zoom.mock.calls[0][0]).toBe(zoom * 2);
  });

  it('holds checkbox calls regions related methods', async () => {
    const wrapper = shallowMount(OpenedCallWave, {
      localVue,
      store,
      data: () => ({ showHolds: false }),
      computed: {
        call: () => callMock,
        player: () => playerMock,
      },
    });
    await wrapper.findAllComponents({ name: 'wt-checkbox' })
      .filter((checkbox) => checkbox.props().label.includes('hold')).wrappers[0].vm.$emit('change');
    expect(playerMock.clearRegions).toHaveBeenCalled();
  });

  it('notes checkbox calls regions related methods', async () => {
    callMock.annotations.push({ startSec: 0, endSec: 1, note: 'note' });
    const wrapper = shallowMount(OpenedCallWave, {
      localVue,
      store,
      data: () => ({ showComments: false }),
      computed: {
        call: () => callMock,
        player: () => playerMock,
      },
    });
    const displayComments = jest.fn();
    wrapper.vm.displayComments = displayComments;
    await wrapper.findAllComponents({ name: 'wt-checkbox' })
      .filter((checkbox) => checkbox.props().label.includes('comment')).wrappers[0].vm.$emit('change');
    expect(wrapper.vm.$data.showComments).toBe(true);
    expect(displayComments).toHaveBeenCalled();
    expect(displayComments.mock.calls[0][0]).toEqual(callMock);
    expect(displayComments.mock.calls[0][1]).toEqual(playerMock);
  });
});
