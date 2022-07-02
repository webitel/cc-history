import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import registry from '../../../../store/registry';
import openedCall from '../opened-call';
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
    store = new Vuex.Store({ modules: { registry: { ...registry, modules: { 'opened-call': openedCall } } } });
    const Component = { render() {} };
    shallowMount(Component, { localVue, store, router });
  });

  it('sets call to open', async () => {
    RegistryAPIRepository.getHistory.mockImplementationOnce(() => (
      Promise.resolve({ items: [mainCall] })
    ));
    await store.dispatch('registry/opened-call/SET_OPENED_CALL', mainCall);
    expect(RegistryAPIRepository.getHistory).toHaveBeenCalled();
    expect(store.state.registry['opened-call'].mainCall).toEqual(mainCall);
    expect(store.state.registry['opened-call'].mainCallId).toBe(mainCall.id);
  });

  it('loads main call from API', async () => {
    RegistryAPIRepository.getHistory.mockImplementationOnce(() => (
      Promise.resolve({ items: [mainCall] })
    ));
    await store.dispatch('registry/opened-call/LOAD_MAIN_CALL');
    expect(RegistryAPIRepository.getHistory).toHaveBeenCalled();
    expect(store.state.registry['opened-call'].mainCall).toEqual(mainCall);
  });

  it('loads call legs data from API', async () => {
    await store.dispatch('registry/opened-call/LOAD_LEGS_DATA_LIST');
    expect(RegistryAPIRepository.getHistory).toHaveBeenCalled();
    expect(store.state.registry['opened-call'].legsData).toEqual(legsData);
  });

  it('correctly resets opened call state', async () => {
    await store.dispatch('registry/opened-call/RESET_OPENED_CALL');
    expect(store.state.registry['opened-call'].mainCall).toEqual({});
    expect(store.state.registry['opened-call'].mainCallId).toBe(null);
    expect(store.state.registry['opened-call'].legsData).toEqual([]);
  });

  it('correctly computes callId existence', async () => {
    // TRUE VALUES
    store.state.registry['opened-call'].mainCallId = '1';
    expect(store.getters['registry/opened-call/IS_CALL_ID']).toBe(true);
    store.state.registry['opened-call'].mainCallId = 1;
    expect(store.getters['registry/opened-call/IS_CALL_ID']).toBe(true);
    // FALSE VALUES
    store.state.registry['opened-call'].mainCallId = null;
    expect(store.getters['registry/opened-call/IS_CALL_ID']).toBe(false);
    store.state.registry['opened-call'].mainCallId = undefined;
    expect(store.getters['registry/opened-call/IS_CALL_ID']).toBe(false);
    store.state.registry['opened-call'].mainCallId = NaN;
    expect(store.getters['registry/opened-call/IS_CALL_ID']).toBe(false);
  });
});
