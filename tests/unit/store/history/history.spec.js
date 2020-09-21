import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import history from '../../../../src/store/modules/history/history';
import HistoryAPIRepository from '../../../../src/api/history/HistoryAPIRepository';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter();

jest.mock('../../../../src/api/history/HistoryAPIRepository');

const items = [{ id: '1' }, { id: '2' }];
const next = true;
HistoryAPIRepository.getHistory.mockImplementation(() => Promise.resolve({ items, next }));

describe('History store', () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({ modules: { history } });
    const Component = { render() {} };
    shallowMount(Component, { localVue, store, router });
  });
  it('correctly filters selected data items', async () => {
    items[0]._isSelected = true;
    store.state.history.dataList = items;
    expect(store.getters['history/SELECTED_DATA_ITEMS']).toEqual([items[0]]);
  });
  it('loads data from API', async () => {
    await store.dispatch('history/LOAD_DATA_LIST');
    expect(HistoryAPIRepository.getHistory).toHaveBeenCalled();
    expect(store.state.history.dataList).toEqual(items);
    expect(store.state.history.isNext).toEqual(next);
  });
  it('sets passed headers to state', async () => {
    const headers = [{ value: 'h1' }, { value: 'h2' }];
    await store.dispatch('history/SET_HEADERS', headers);
    expect(store.state.history.headers).toEqual(headers);
  });
});
