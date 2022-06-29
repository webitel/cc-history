import { createLocalVue, shallowMount } from '@vue/test-utils';
import deepCopy from 'deep-copy';
import Vuex from 'vuex';
import WaveSurferVue from 'wavesurfer.js-vue';
import OpenedCallWave
  from '../../../../../../../../src/components/history/history-main/registry/opened-call/opened-call-visualization/opened-call-visualization.vue';
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

  const volumeData = {
    volumeLeftGain: 1,
    leftGain: {
      muted: false,
      audio: { gain: { value: 1 } },
    },
  };

  const player = playerMock(jest)
  beforeEach(() => {
    jest.clearAllMocks();
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
        player: () => player,
      },
    });
    expect(wrapper.classes('call-wave-page')).toBe(true);
  });

  it('closes comment form on commentsMode changed to false', async () => {
    const wrapper = shallowMount(OpenedCallWave, {
      localVue,
      store,
      data: () => ({ commentsMode: true }),
      computed: {
        call: () => callMock,
        player: () => player,
      },
    });
    expect(wrapper.findComponent({ name: 'opened-call-comment-form' }).isVisible()).toBe(true);
    await wrapper.findAllComponents({ name: 'wt-icon-btn' })
      .filter((btn) => btn.props().icon === 'note').wrappers[0].vm.$emit('click');
    expect(wrapper.findComponent({ name: 'opened-call-comment-form' }).exists()).toBe(false);
  });

  it('opens comment form on commentsMode change to true', async () => {
    const wrapper = shallowMount(OpenedCallWave, {
      localVue,
      store,
      data: () => ({ commentsMode: false }),
      computed: {
        call: () => callMock,
        player: () => player,
      },
    });
    expect(wrapper.findComponent({ name: 'opened-call-comment-form' }).exists()).toBe(false);
    await wrapper.findAllComponents({ name: 'wt-icon-btn' })
      .filter((btn) => btn.props().icon === 'note').wrappers[0].vm.$emit('click');
    expect(wrapper.findComponent({ name: 'opened-call-comment-form' }).isVisible()).toBe(true);
  });

  it('emits save event with comment draft object and calls the add annotation action if no id passed', async () => {
    const wrapper = shallowMount(OpenedCallWave, {
      localVue,
      store,
      data: () => ({ commentsMode: true }),
      computed: {
        call: () => callMock,
        player: () => player,
      },
    });
    wrapper.vm.addAnnotation = actionMocks.ADD_ANNOTATION;
    const draftWithNoId = { ...draft };
    delete draftWithNoId.id;
    await wrapper.findComponent({ name: 'opened-call-comment-form' }).vm.$emit('save', draftWithNoId);
    expect(actionMocks.ADD_ANNOTATION).toHaveBeenCalledWith(expect.objectContaining({
      endSec: 2, note: 'draft', startSec: 1, callId: 'id'
    }))
  });

  it('emits save event with comment draft object on save and calls the edit annotation method', async () => {
    const wrapper = shallowMount(OpenedCallWave, {
      localVue,
      store,
      data: () => ({ commentsMode: true }),
      computed: {
        call: () => callMock,
        player: () => player,
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
        player: () => player,
      },
    });
    wrapper.vm.deleteAnnotation = actionMocks.DELETE_ANNOTATION;
    await wrapper.findComponent({ name: 'opened-call-comment-form' }).vm.$emit('delete', draft);
    expect(wrapper.findComponent({ name: 'opened-call-comment-form' }).emitted().delete.length).toBe(1);
    expect(actionMocks.DELETE_ANNOTATION).toHaveBeenCalled();
  });

  it('changes volume on slider input', async () => {
    const wrapper = shallowMount(OpenedCallWave, {
      localVue,
      store,
      computed: {
        call: () => callMock,
        player: () => player,
      },
      data: () => (deepCopy(volumeData)),
    });
    await wrapper.findComponent({ name: 'wt-slider' }).vm.$emit('input', 2);
    expect(wrapper.vm.$data.leftGain.audio.gain.value).toBe(2);
  });

  it('mutes on slider input 0', async () => {
    const wrapper = shallowMount(OpenedCallWave, {
      localVue,
      store,
      computed: {
        call: () => callMock,
        player: () => player,
      },
      data: () => (deepCopy(volumeData)),
    });
    await wrapper.findComponent({ name: 'wt-slider' }).vm.$emit('input', 0);
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
        player: () => player,
      },
    });
    await wrapper.findAllComponents({ name: 'wt-button' })
      .filter((btn) => btn.text() === 'x2').wrappers[0].vm.$emit('click');
    expect(wrapper.vm.$data.playbackRate).toBe(2);
    expect(player.setPlaybackRate).toBeCalled();
    expect(player.setPlaybackRate.mock.calls[0][0]).toBe(2);
  });

  it('changes zoom on zoom button click', async () => {
    const zoom = 1;
    const wrapper = shallowMount(OpenedCallWave, {
      localVue,
      store,
      data: () => ({ zoom }),
      computed: {
        call: () => callMock,
        player: () => player,
      },
    });
    await wrapper.findAllComponents({ name: 'wt-button' })
      .filter((btn) => btn.html().includes('zoom-in')).wrappers[0].vm.$emit('click');
    expect(player.zoom).toHaveBeenCalled();
    expect(player.zoom.mock.calls[0][0]).toBe(zoom * 2);
  });

  it('"holds" checkbox calls regions-related methods', async () => {
    const wrapper = shallowMount(OpenedCallWave, {
      localVue,
      store,
      data: () => ({ showHolds: false }),
      computed: {
        call: () => callMock,
        player: () => player,
      },
    });
    await wrapper.findAllComponents({ name: 'wt-checkbox' })
      .filter((checkbox) => checkbox.props().label.includes('hold')).wrappers[0].vm.$emit('change');
    expect(player.clearRegions).toHaveBeenCalled();
  });

  it('"notes" checkbox calls regions-related methods', async () => {
    callMock.annotations.push({ startSec: 0, endSec: 1, note: 'note' });
    const wrapper = shallowMount(OpenedCallWave, {
      localVue,
      store,
      data: () => ({ showComments: false }),
      computed: {
        call: () => callMock,
        player: () => player,
      },
    });
    const displayComments = jest.fn();
    wrapper.vm.displayComments = displayComments;
    await wrapper.findAllComponents({ name: 'wt-checkbox' })
      .filter((checkbox) => checkbox.props().label.includes('comment')).wrappers[0].vm.$emit('change');
    expect(wrapper.vm.$data.showComments).toBe(true);
    expect(displayComments).toHaveBeenCalled();
    expect(displayComments.mock.calls[0][0]).toEqual(callMock);
    expect(displayComments.mock.calls[0][1]).toEqual(player);
  });
});
