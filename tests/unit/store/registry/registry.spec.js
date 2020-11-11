import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import registry from '../../../../src/store/modules/registry/registry';
import RegistryAPIRepository from '../../../../src/api/history/registry/RegistryAPIRepository';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter();

jest.mock('../../../../src/api/history/registry/RegistryAPIRepository');

const items = [{ id: '1' }, { id: '2' }];
const next = true;
RegistryAPIRepository.getHistory.mockImplementation(() => Promise.resolve({ items, next }));

describe('registry store', () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({ modules: { registry } });
    const Component = { render() {} };
    shallowMount(Component, { localVue, store, router });
  });
  it('correctly filters selected data items', async () => {
    items[0]._isSelected = true;
    store.state.registry.dataList = items;
    expect(store.getters['registry/SELECTED_DATA_ITEMS']).toEqual([items[0]]);
  });
  it('loads data from API', async () => {
    await store.dispatch('registry/LOAD_DATA_LIST');
    expect(RegistryAPIRepository.getHistory).toHaveBeenCalled();
    expect(store.state.registry.dataList).toEqual(items);
    expect(store.state.registry.isNext).toEqual(next);
  });
  it('sets passed headers to state', async () => {
    const headers = [{ value: 'h1' }, { value: 'h2' }];
    await store.dispatch('registry/SET_HEADERS', headers);
    expect(store.state.registry.headers).toEqual(headers);
  });
});
