import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import HistoryRegistry from '../history-registry.vue';
import registry from '../../store/registry';
import openedHistoryCall from '../../modules/call/store/call';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
const router = new VueRouter();

describe('History table', () => {
  let store;

  const SET_OPENED_CALL = jest.fn();
  const RESET_OPENED_CALL = jest.fn();
  openedHistoryCall.actions.SET_OPENED_CALL = SET_OPENED_CALL;
  openedHistoryCall.actions.RESET_OPENED_CALL = RESET_OPENED_CALL;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        registry: {
          ...registry,
          modules: {
            'call': { ...openedHistoryCall },
          },
        },
      },
    });
  });
  it('renders a component', () => {
    const wrapper = shallowMount(HistoryRegistry, { localVue, router, store });
    expect(wrapper.classes('history-registry')).toBe(true);
  });
});
