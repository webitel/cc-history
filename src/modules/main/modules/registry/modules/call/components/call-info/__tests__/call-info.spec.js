import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import callInfo from '../call-info.vue';
import call from '../../../store/call';

const localVue = createLocalVue();
localVue.use(Vuex);
const variables = { hello: 'there', hello1: 'there' };

describe('Opened call info tab', () => {
  const store = new Vuex.Store({
    modules: {
      registry: {
        namespaced: true,
        modules: { 'call': call },
      },
    },
  });

  it('renders a component without variables', () => {
    const wrapper = shallowMount(callInfo, { localVue, store });
    expect(wrapper.classes('call-info')).toBe(true);
  });

  it('renders a component with call variables', () => {
    call.state.mainCall = { variables };
    const wrapper = shallowMount(callInfo, { localVue, store });
    expect(wrapper.findAll('.call-variable').length).toBe(Object.keys(variables).length);
  });

  it('renders variables texts', () => {
    call.state.mainCall = { variables };
    const wrapper = shallowMount(callInfo, { localVue, store });
    const varKey = Object.keys(variables)[0];
    expect(wrapper.find('.call-variable__key').text()).toBe(`${varKey}:`);
    expect(wrapper.find('.call-variable__value').text()).toBe(variables[varKey]);
  });
});
