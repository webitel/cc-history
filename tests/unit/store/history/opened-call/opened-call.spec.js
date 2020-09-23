import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import history from '../../../../../src/store/modules/history/history';
import openedCall from '../../../../../src/store/modules/history/opened-call/opened-call';
import HistoryAPIRepository from '../../../../../src/api/history/HistoryAPIRepository';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter();

jest.mock('../../../../../src/api/history/HistoryAPIRepository');

const mainCall = { id: '12' };
const legsData = [{ id: '1' }, { id: '2' }];
HistoryAPIRepository.getHistory.mockImplementation(() => Promise.resolve({ items: legsData }));

describe('Opened call history store', () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({ modules: { history: { ...history, modules: { 'opened-call': openedCall } } } });
    const Component = { render() {} };
    shallowMount(Component, { localVue, store, router });
  });

  it('sets call to open', async () => {
    HistoryAPIRepository.getHistory.mockImplementationOnce(() => (
      Promise.resolve({ items: [mainCall] })
    ));
    await store.dispatch('history/opened-call/SET_OPENED_CALL', mainCall);
    expect(HistoryAPIRepository.getHistory).toHaveBeenCalled();
    expect(store.state.history['opened-call'].mainCall).toEqual(mainCall);
    expect(store.state.history['opened-call'].mainCallId).toBe(mainCall.id);
  });

  it('loads main call from API', async () => {
    HistoryAPIRepository.getHistory.mockImplementationOnce(() => (
      Promise.resolve({ items: [mainCall] })
    ));
    await store.dispatch('history/opened-call/LOAD_MAIN_CALL');
    expect(HistoryAPIRepository.getHistory).toHaveBeenCalled();
    expect(store.state.history['opened-call'].mainCall).toEqual(mainCall);
  });

  it('loads call legs data from API', async () => {
    await store.dispatch('history/opened-call/LOAD_LEGS_DATA_LIST');
    expect(HistoryAPIRepository.getHistory).toHaveBeenCalled();
    expect(store.state.history['opened-call'].legsData).toEqual(legsData);
  });

  it('correctly resets opened call state', async () => {
    await store.dispatch('history/opened-call/RESET_OPENED_CALL');
    expect(store.state.history['opened-call'].mainCall).toEqual({});
    expect(store.state.history['opened-call'].mainCallId).toBe(null);
    expect(store.state.history['opened-call'].legsData).toEqual([]);
  });

  it('correctly computes callId existence', async () => {
    // TRUE VALUES
    store.state.history['opened-call'].mainCallId = '1';
    expect(store.getters['history/opened-call/IS_CALL_ID']).toBe(true);
    store.state.history['opened-call'].mainCallId = 1;
    expect(store.getters['history/opened-call/IS_CALL_ID']).toBe(true);
    // FALSE VALUES
    store.state.history['opened-call'].mainCallId = {};
    expect(store.getters['history/opened-call/IS_CALL_ID']).toBe(false);
    store.state.history['opened-call'].mainCallId = null;
    expect(store.getters['history/opened-call/IS_CALL_ID']).toBe(false);
    store.state.history['opened-call'].mainCallId = undefined;
    expect(store.getters['history/opened-call/IS_CALL_ID']).toBe(false);
    store.state.history['opened-call'].mainCallId = NaN;
    expect(store.getters['history/opened-call/IS_CALL_ID']).toBe(false);
  });
});
