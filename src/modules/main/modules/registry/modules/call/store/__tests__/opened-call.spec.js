import { shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';

import RegistryAPIRepository from '../../../../api/RegistryAPIRepository';
import registry from '../../../../store/registry';
import call from '../call';

const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

vi.mock('../../../../api/RegistryAPIRepository');

const mainCall = { id: '12' };
const legsData = [{ id: '1' }, { id: '2' }];
RegistryAPIRepository.getHistory.mockImplementation(() =>
  Promise.resolve({ items: legsData }),
);

// todo vuex -> pinia
describe.todo('Opened call history store', () => {
  let store;
  beforeEach(() => {
    store = createStore({
      modules: { registry: { ...registry, modules: { call } } },
    });
    const Component = { render() {} };
    shallowMount(Component, {
      global: {
        plugins: [store, router],
      },
    });
  });

  it('sets call to open', async () => {
    RegistryAPIRepository.getHistory.mockImplementationOnce(() =>
      Promise.resolve({ items: [mainCall] }),
    );
    await store.dispatch('registry/call/SET_OPENED_CALL', mainCall);
    expect(RegistryAPIRepository.getHistory).toHaveBeenCalled();
    expect(store.state.registry.call.mainCall).toEqual(mainCall);
    expect(store.state.registry.call.mainCallId).toBe(mainCall.id);
  });

  it('loads main call from API', async () => {
    RegistryAPIRepository.getHistory.mockImplementationOnce(() =>
      Promise.resolve({ items: [mainCall] }),
    );
    await store.dispatch('registry/call/LOAD_MAIN_CALL');
    expect(RegistryAPIRepository.getHistory).toHaveBeenCalled();
    expect(store.state.registry.call.mainCall).toEqual(mainCall);
  });

  it('loads call legs data from API', async () => {
    await store.dispatch('registry/call/LOAD_LEGS_DATA_LIST');
    expect(RegistryAPIRepository.getHistory).toHaveBeenCalled();
    expect(store.state.registry.call.legsData).toEqual(legsData);
  });

  it('correctly resets opened call state', async () => {
    await store.dispatch('registry/call/RESET_OPENED_CALL');
    expect(store.state.registry.call.mainCall).toEqual({});
    expect(store.state.registry.call.mainCallId).toBe(null);
    expect(store.state.registry.call.legsData).toEqual([]);
  });
  it('loads annotations from API', async () => {
    const annotations = [];
    RegistryAPIRepository.getHistory.mockImplementationOnce(() =>
      Promise.resolve({ items: [{ annotations }] }),
    );
    await store.dispatch('registry/call/LOAD_MAIN_CALL_ANNOTATIONS');
    expect(RegistryAPIRepository.getHistory).toHaveBeenCalled();
    expect(store.state.registry.call.mainCallAnnotations).toEqual(annotations);
  });
});
