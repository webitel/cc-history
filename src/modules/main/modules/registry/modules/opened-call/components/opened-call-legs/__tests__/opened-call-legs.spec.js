import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import OpenedCallLegs from '../opened-call-legs.vue';
import registry from '../../../../../store/registry';
import openedCall from '../../../store/opened-call';
import RegistryAPIRepository from '../../../../../api/RegistryAPIRepository';

const localVue = createLocalVue();
localVue.use(Vuex);
const mainCall = { id: '1', transferTo: '2' };
const legsData = [{ id: '2', transferFrom: '1', transferTo: '3' }, { id: '3', transferFrom: '2' }];

jest.mock('../../../../../api/RegistryAPIRepository');
RegistryAPIRepository.getHistory.mockImplementation(() => Promise.resolve({ items: legsData }));

describe('Opened call legs tab', () => {
  openedCall.state.mainCall = mainCall;
  const store = new Vuex.Store({
    modules: {
      registry: {
        ...registry,
        modules: { 'opened-call': openedCall },
      },
    },
  });

  it('renders a component', () => {
    const wrapper = shallowMount(OpenedCallLegs, { localVue, store });
    expect(wrapper.classes('opened-call-legs')).toBe(true);
  });

  it('fills table with data from API', () => {
    const wrapper = shallowMount(OpenedCallLegs, { localVue, store });
    expect(RegistryAPIRepository.getHistory).toHaveBeenCalled();
    expect(wrapper.vm.legsData).toEqual(legsData);
  });
});
