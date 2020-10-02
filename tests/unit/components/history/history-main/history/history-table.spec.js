import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import HistoryTable from '../../../../../../src/components/history/history-main/history/history-table.vue';
import history from '../../../../../../src/store/modules/history/history';
import openedHistoryCall from '../../../../../../src/store/modules/history/opened-call/opened-call';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
const router = new VueRouter();

describe('History table', () => {
  let store;

  const SET_OPENED_CALL = jest.fn();
  const RESET_OPENED_CALL = jest.fn();
  openedHistoryCall.actions.SET_OPENED_CALL = SET_OPENED_CALL;
  openedHistoryCall.actions.RESET_OPENED_CALL = RESET_OPENED_CALL;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        history: {
          ...history,
          modules: {
            'opened-call': { ...openedHistoryCall },
          },
        },
      },
    });
  });
  it('renders a component', () => {
    const wrapper = shallowMount(HistoryTable, { localVue, router, store });
    expect(wrapper.classes('history-table')).toBe(true);
  });

  it('sets opened call to open', () => {
    const wrapper = shallowMount(HistoryTable, { localVue, router, store });
    const item = { id: '1' };
    wrapper.vm.openItem(item);
    expect(SET_OPENED_CALL).toHaveBeenCalled();
    expect(SET_OPENED_CALL.mock.calls.pop()[1]).toEqual(item);
  });

  it('resets opened call', () => {
    const wrapper = shallowMount(HistoryTable, {
      localVue, router, store, computed: { isOpenedCallPopup() { return true; } },
    });
    wrapper.findComponent({ name: 'opened-item-popup' }).vm.$emit('close');
    expect(RESET_OPENED_CALL).toHaveBeenCalled();
  });
});
