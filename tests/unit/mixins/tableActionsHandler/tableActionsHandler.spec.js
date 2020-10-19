import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import tableActionsHandlerMixin from '../../../../src/mixins/tableActions/tableActionsHandlerMixin';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter();

jest.mock('../../../../src/api/history/registry/RegistryAPIRepository');

describe('Table actions handler', () => {
  const loadData = jest.fn();
  let wrapper;
  beforeEach(() => {
    const Component = {
      render() {},
      mixins: [tableActionsHandlerMixin],
      methods: { loadData },
    };
    wrapper = shallowMount(Component, {
      localVue,
      router,
    });
  });

  it('Refresh action', async () => {
    await wrapper.vm.tableActionsHandler('refresh');
    expect(loadData).toHaveBeenCalled();
  });

  it('Column select action', () => {
    wrapper.vm.tableActionsHandler('columnSelect');
    expect(wrapper.vm.isFilterFieldsOpened).toBe(true);
  });

  it('Filter reset action', async () => {
    await wrapper.vm.$router.replace({ path: '/', query: { jest: 'jest' } });
    wrapper.vm.tableActionsHandler('filterReset');
    expect(wrapper.vm.$route.query).toEqual({});
  });

  it('settings (expand filters) action', () => {
    wrapper.vm.tableActionsHandler('settings');
    expect(wrapper.vm.isOpened).toBe(true);
  });
});
