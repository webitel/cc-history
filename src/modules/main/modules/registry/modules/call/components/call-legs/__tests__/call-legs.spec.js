import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';

import RegistryAPIRepository from '../../../../../api/RegistryAPIRepository';
import registry from '../../../../../store/registry';
import call from '../../../store/call';
import callLegs from '../call-legs.vue';

const mainCall = { id: '1', transferTo: '2' };
const legsData = [
  { id: '2', transferFrom: '1', transferTo: '3' },
  { id: '3', transferFrom: '2' },
];

vi.mock('../../../../../api/RegistryAPIRepository');
RegistryAPIRepository.getHistory.mockImplementation(() =>
  Promise.resolve({ items: legsData }),
);

const props = {
  call: mainCall,
  namespace: 'registry/call',
};

describe('Opened call legs tab', () => {
  call.state.mainCall = mainCall;
  const store = createStore({
    modules: {
      registry: {
        ...registry,
        modules: { call },
      },
    },
  });

  it('renders a component', () => {
    const wrapper = shallowMount(callLegs, {
      global: {
        plugins: [store],
      },
      props,
    });
    expect(wrapper.isVisible()).toBe(true);
  });

  it('fills table with data from API', () => {
    const wrapper = shallowMount(callLegs, {
      global: {
        plugins: [store],
      },
      props,
    });
    expect(RegistryAPIRepository.getHistory).toHaveBeenCalled();
    expect(wrapper.vm.legsData).toEqual(legsData);
  });
});
