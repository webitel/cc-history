import { mount,shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';

import playerMock from '../../../../../../../../../../../tests/unit/mocks/waveSurferMock';
import registry from '../../../../../../store/registry';
import callWave from '../call-wave.vue';

vi.mock('../../../../../../../../../../app/api/instance.js', () => ({
  default: {
    request: () => Promise.resolve({ data: { items: [{ annotations: [] }] } }),
  },
}));

describe('Opened call wave', () => {
  const callMock = {
    id: 'id',
    annotations: [],
    from: { name: 'A' },
    to: { name: 'B' },
    hold: [],
  };

  const props = {
    call: callMock,
    file: {},
  };

  let store;
  const draft = {
    id: '123',
    note: 'draft',
    startSec: 1,
    endSec: 2,
  };

  const actionMocks = {
    ADD_ANNOTATION: vi.fn(),
    EDIT_ANNOTATION: vi.fn(),
    DELETE_ANNOTATION: vi.fn(),
  };

  const volumeData = {
    volumeLeftGain: 1,
    leftGain: {
      muted: false,
      audio: { gain: { value: 1 } },
    },
  };

  const player = playerMock(vi);
  beforeEach(() => {
    vi.clearAllMocks();
    store = createStore({
      modules: {
        registry: {
          ...registry,
        },
      },
    });
  });

  it('renders a component', () => {
    const wrapper = shallowMount(callWave, {
      global: {
        plugins: [store],
      },
      props,
      computed: {
        call: () => callMock,
        player: () => player,
      },
    });
    expect(wrapper.classes('call-wave-page')).toBe(true);
  });

  it('closes comment form on commentsMode changed to false', async () => {
    const wrapper = mount(callWave, {
      props,

      global: {
        plugins: [store],
        mocks: {
          v$: {
            draft: {
              $touch: vi.fn(),
            },
          },
        },
        stubs: {
          WtTooltip: true,
        },
      },
      data: () => ({ commentsMode: true, isLoading: false }),
      computed: {
        call: () => callMock,
        player: () => player,
      },
    });
    expect(
      wrapper.findComponent({ name: 'call-wave-comment-form' }).isVisible(),
    ).toBe(true);
    await wrapper
      .findAllComponents({ name: 'wt-icon-btn' })
      .filter((btn) => btn.attributes().icon === 'note')
      .at(0)
      .vm.$emit('click');
    expect(
      wrapper.findComponent({ name: 'call-wave-comment-form' }).exists(),
    ).toBe(false);
  });

  it('opens comment form on commentsMode change to true', async () => {
    const wrapper = mount(callWave, {
      global: {
        plugins: [store],
        stubs: {
          WtTooltip: true,
        },
      },
      props,
      data: () => ({
        commentsMode: false,
        isLoading: false,
      }),
      computed: {
        call: () => callMock,
        player: () => player,
      },
    });
    expect(
      wrapper.findComponent({ name: 'opened-call-wave-comment-form' }).exists(),
    ).toBe(false);
    await wrapper
      .findAllComponents({ name: 'wt-icon-btn' })
      .filter((btn) => btn.attributes().icon === 'note')
      .at(0)
      .vm.$emit('click');
    expect(
      wrapper.findComponent({ name: 'call-wave-comment-form' }).exists(),
    ).toBe(true);
  });

  it('emits save event with comment draft object and calls the add annotation action if no id passed', async () => {
    const wrapper = mount(callWave, {
      global: {
        plugins: [store],
        stubs: {
          WtTooltip: true,
        },
      },
      props,
      data: () => ({ commentsMode: true }),
      computed: {
        call: () => callMock,
        player: () => player,
      },
    });
    wrapper.vm.addAnnotation = actionMocks.ADD_ANNOTATION;
    const draftWithNoId = { ...draft };
    delete draftWithNoId.id;
    await wrapper
      .findComponent({ name: 'call-wave-comment-form' })
      .vm.$emit('save', draftWithNoId);
    expect(actionMocks.ADD_ANNOTATION).toHaveBeenCalledWith(
      expect.objectContaining({
        endSec: 2,
        note: 'draft',
        startSec: 1,
        callId: 'id',
      }),
    );
  });

  it('emits save event with comment draft object on save and calls the edit annotation method', async () => {
    const wrapper = mount(callWave, {
      global: {
        plugins: [store],
        stubs: {
          WtTooltip: true,
        },
      },
      props,
      data: () => ({ commentsMode: true }),
      computed: {
        call: () => callMock,
        player: () => player,
      },
    });
    wrapper.vm.updateAnnotation = actionMocks.EDIT_ANNOTATION;
    await wrapper
      .findComponent({ name: 'call-wave-comment-form' })
      .vm.$emit('save', draft);
    expect(
      wrapper.findComponent({ name: 'call-wave-comment-form' }).emitted()
        .save[0][0],
    ).toBe(draft);
    expect(actionMocks.EDIT_ANNOTATION).toHaveBeenCalled();
  });

  it('emits delete event and calls a delete method', async () => {
    const wrapper = mount(callWave, {
      global: {
        plugins: [store],
        stubs: {
          WtTooltip: true,
        },
      },
      props,
      data: () => ({ commentsMode: true, selectedComment: draft }),
      computed: {
        call: () => callMock,
        player: () => player,
      },
    });
    wrapper.vm.deleteAnnotation = actionMocks.DELETE_ANNOTATION;
    await wrapper
      .findComponent({ name: 'call-wave-comment-form' })
      .vm.$emit('delete', draft);
    expect(
      wrapper.findComponent({ name: 'call-wave-comment-form' }).emitted().delete
        .length,
    ).toBe(1);
    expect(actionMocks.DELETE_ANNOTATION).toHaveBeenCalled();
  });

  it('changes playbackRate on button click', async () => {
    const wrapper = mount(callWave, {
      global: {
        plugins: [store],
        stubs: {
          WtTooltip: true,
        },
      },
      props,
      data: () => ({ playbackRate: 1, isPlaying: false }),
      computed: {
        call: () => callMock,
        player: () => player,
      },
    });
    await wrapper
      .findAllComponents({ name: 'wt-button' })
      .filter((btn) => btn.text() === 'x2')
      .at(0)
      .vm.$emit('click');
    expect(wrapper.vm.$data.playbackRate).toBe(2);
    expect(player.setPlaybackRate).toBeCalled();
    expect(player.setPlaybackRate.mock.calls[0][0]).toBe(2);
  });

  it('changes zoom on zoom button click', async () => {
    const zoom = 1;
    const wrapper = mount(callWave, {
      global: {
        plugins: [store],
        stubs: {
          WtTooltip: true,
        },
      },
      props,
      data: () => ({ zoom }),
      computed: {
        call: () => callMock,
        player: () => player,
      },
    });
    await wrapper
      .findAllComponents({ name: 'wt-button' })
      .filter((btn) => btn.html().includes('zoom-in'))
      .at(0)
      .vm.$emit('click');
    expect(player.zoom).toHaveBeenCalled();
    expect(player.zoom.mock.calls[0][0]).toBe(zoom * 2);
  });

  it('"holds" checkbox calls regions-related methods', async () => {
    const wrapper = mount(callWave, {
      global: {
        plugins: [store],
        stubs: {
          WtTooltip: true,
        },
      },
      props,
      data: () => ({
        showHolds: false,
        isLoading: false,
      }),
      computed: {
        call: () => callMock,
        player: () => player,
      },
    });
    await wrapper
      .findAllComponents({ name: 'wt-checkbox' })
      .filter((checkbox) => checkbox.props().label.includes('Hold'))
      .at(0)
      .vm.$emit('change');
    expect(player.clearRegions).toHaveBeenCalled();
  });

  it('"notes" checkbox calls regions-related methods', async () => {
    callMock.annotations.push({ startSec: 0, endSec: 1, note: 'note' });
    const wrapper = mount(callWave, {
      global: {
        plugins: [store],
        stubs: {
          WtTooltip: true,
        },
      },
      props: {
        ...props,
        call: callMock,
      },
      data: () => ({
        showComments: false,
        isLoading: false,
      }),
      computed: {
        player: () => player,
        annotations: () => callMock.annotations,
        commentsSize: () => 10,
      },
    });
    const displayComments = vi.fn();
    wrapper.vm.displayComments = displayComments;
    await wrapper
      .findAllComponents({ name: 'wt-checkbox' })
      .filter((checkbox) => checkbox.props().label.includes('Note'))
      .at(0)
      .vm.$emit('change');
    expect(wrapper.vm.$data.showComments).toBe(true);
    expect(displayComments).toHaveBeenCalled();
    expect(displayComments.mock.calls[0][0]).toEqual(callMock.annotations);
    expect(displayComments.mock.calls[0][1]).toEqual(player);
  });
});
