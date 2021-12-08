import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import WaveSurferVue from 'wavesurfer.js-vue';
import OpenedCallWave
  from '../../../../../../../../src/components/history/history-main/registry/opened-call/opened-call-wave/opened-call-wave.vue';
import generateMediaURL from '../../../../../../../../src/mixins/media/scripts/generateMediaURL';
import registry from '../../../../../../../../src/store/modules/registry/registry';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(WaveSurferVue);

describe('Opened call wave', () => {
  let store;
  const state = {
    file: (state) => generateMediaURL(state.fileId, true),
    call: (state) => state.mainCall,
  };

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        registry: {
          ...registry,
          state,
        },
      },
    });
  });

  it('renders a component', () => {
    const wrapper = shallowMount(OpenedCallWave, {
      localVue,
      store,
    });
    expect(wrapper.classes('call-wave-page')).toBe(true);
  });
});
