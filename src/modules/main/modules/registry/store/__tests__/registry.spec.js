import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
import registry from '../registry';
import RegistryAPIRepository from '../../api/RegistryAPIRepository';

const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

vi.mock('../../api/RegistryAPIRepository');

const items = [{ id: '1' }, { id: '2' }];
const next = true;
RegistryAPIRepository.getHistory.mockImplementation(() => Promise.resolve({ items, next }));

describe('registry store', () => {
  let store;
  beforeEach(() => {
    store = createStore({ modules: { registry } });
    const Component = { render() {} };
    shallowMount(Component, {
      global: {
        plugins: [store, router],
      },
    });
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
