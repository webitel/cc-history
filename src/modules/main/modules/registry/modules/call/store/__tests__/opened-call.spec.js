import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import registry from '../../../../store/registry';
import call from '../call';
import RegistryAPIRepository from '../../../../api/RegistryAPIRepository';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter();

jest.mock('../../../../api/RegistryAPIRepository');

const mainCall = { id: '12' };
const legsData = [{ id: '1' }, { id: '2' }];
RegistryAPIRepository.getHistory.mockImplementation(() => Promise.resolve({ items: legsData }));

describe('Opened call history store', () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({ modules: { registry: { ...registry, modules: { call } } } });
    const Component = { render() {} };
    shallowMount(Component, { localVue, store, router });
  });

  it('sets call to open', async () => {
    RegistryAPIRepository.getHistory.mockImplementationOnce(() => (
      Promise.resolve({ items: [mainCall] })
    ));
    await store.dispatch('registry/call/SET_OPENED_CALL', mainCall);
    expect(RegistryAPIRepository.getHistory).toHaveBeenCalled();
    expect(store.state.registry.call.mainCall).toEqual(mainCall);
    expect(store.state.registry.call.mainCallId).toBe(mainCall.id);
  });

  it('loads main call from API', async () => {
    RegistryAPIRepository.getHistory.mockImplementationOnce(() => (
      Promise.resolve({ items: [mainCall] })
    ));
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
    RegistryAPIRepository.getHistory.mockImplementationOnce(() => (
      Promise.resolve({ items: [{ annotations }] })
    ));
    await store.dispatch('registry/call/LOAD_MAIN_CALL_ANNOTATIONS');
    expect(RegistryAPIRepository.getHistory).toHaveBeenCalled();
    expect(store.state.registry.call.mainCallAnnotations).toEqual(annotations);
  });
});
