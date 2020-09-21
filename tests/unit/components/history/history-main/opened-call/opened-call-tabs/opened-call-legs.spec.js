import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import OpenedCallLegs from '../../../../../../../src/components/history/history-main/opened-call/opened-call-tabs/opened-call-legs.vue';
import history from '../../../../../../../src/store/modules/history/history';
import openedCallHistory from '../../../../../../../src/store/modules/history/opened-call/opened-call';
import HistoryAPIRepository from '../../../../../../../src/api/history/HistoryAPIRepository';

const localVue = createLocalVue();
localVue.use(Vuex);
const mainCall = { id: '1', transferTo: '2' };
const legsData = [{ id: '2', transferFrom: '1', transferTo: '3' }, { id: '3', transferFrom: '2' }];

jest.mock('../../../../../../../src/api/history/HistoryAPIRepository');
HistoryAPIRepository.getHistory.mockImplementation(() => Promise.resolve({ items: legsData }));

describe('Opened call legs tab', () => {
  openedCallHistory.state.mainCall = mainCall;
  const store = new Vuex.Store({
    modules: {
      history: {
        ...history,
        modules: { 'opened-call': openedCallHistory },
      },
    },
  });

  it('renders a component', () => {
    const wrapper = shallowMount(OpenedCallLegs, { localVue, store });
    expect(wrapper.classes('opened-call-legs')).toBe(true);
  });

  it('fills table with data from API', () => {
    const wrapper = shallowMount(OpenedCallLegs, { localVue, store });
    expect(HistoryAPIRepository.getHistory).toHaveBeenCalled();
    expect(wrapper.vm.legsData).toEqual(legsData);
  });
});
