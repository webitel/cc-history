import { shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';
import openedHistoryCall from '../../modules/call/store/call';
import registry from '../../store/registry';
import HistoryRegistry from '../history-registry.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'vi',
    },
  ],
});

describe('History table', () => {
  let store;

  const SET_OPENED_CALL = vi.fn();
  const RESET_OPENED_CALL = vi.fn();
  openedHistoryCall.actions.SET_OPENED_CALL = SET_OPENED_CALL;
  openedHistoryCall.actions.RESET_OPENED_CALL = RESET_OPENED_CALL;

  beforeEach(() => {
    store = createStore({
      modules: {
        registry: {
          ...registry,
          modules: {
            call: { ...openedHistoryCall },
          },
        },
      },
    });
  });
  it('renders a component', () => {
    const wrapper = shallowMount(HistoryRegistry, {
      global: {
        plugins: [store, router],
      },
    });
    expect(wrapper.classes('history-registry')).toBe(true);
  });
});
