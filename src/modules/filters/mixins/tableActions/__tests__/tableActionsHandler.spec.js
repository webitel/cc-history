import { shallowMount } from '@vue/test-utils';
import router from '../../../../../app/router';
import tableActionsHandlerMixin from '../tableActionsHandlerMixin';

jest.mock('../../../../main/modules/registry/api/RegistryAPIRepository');

describe('Table actions handler', () => {
  const loadData = jest.fn();
  const resetFilters = jest.fn();
  let wrapper;
  beforeEach(() => {
    const Component = {
      render() {},
      mixins: [tableActionsHandlerMixin],
      methods: { loadData, resetFilters },
    };
    wrapper = shallowMount(Component, {
      global: { plugins: [router] },
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
    expect(resetFilters).toHaveBeenCalled();
  });

  it('settings (expand filters) action', () => {
    wrapper.vm.tableActionsHandler('settings');
    expect(wrapper.vm.isOpened).toBe(true);
  });
});
