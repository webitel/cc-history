import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import dashboards from '../../../../src/store/modules/dashboards/dashboards';
import DashboardsAPIRepository from '../../../../src/api/history/dashboards/DashboardAPIRepository';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter();

jest.mock('../../../../src/api/history/dashboards/DashboardAPIRepository');

const items = [{ id: '1' }, { id: '2' }];
const next = true;
DashboardsAPIRepository.getDashboardsData
  .mockImplementation(() => Promise.resolve({ items, next }));

describe('Dashboards store', () => {
  let store;
  beforeEach(() => {
    store = new Vuex.Store({ modules: { dashboards } });
    const Component = { render() {} };
    shallowMount(Component, { localVue, store, router });
  });
  // it('correctly filters selected data items', async () => {
  //   items[0]._isSelected = true;
  //   store.state.dashboards.dataList = items;
  //   expect(store.getters['dashboards/SELECTED_DATA_ITEMS']).toEqual([items[0]]);
  // });
});
