import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import OpenedCallInfo from '../../../../../../../../src/components/history/history-main/registry/opened-call/opened-call-info/opened-call-info.vue';
import openedCall from '../../../../../../../../src/store/modules/registry/opened-call/opened-call';

const localVue = createLocalVue();
localVue.use(Vuex);
const variables = { hello: 'there', hello1: 'there' };

describe('Opened call info tab', () => {
  const store = new Vuex.Store({
    modules: {
      registry: {
        namespaced: true,
        modules: { 'opened-call': openedCall },
      },
    },
  });

  it('renders a component without variables', () => {
    const wrapper = shallowMount(OpenedCallInfo, { localVue, store });
    expect(wrapper.classes('opened-call-info')).toBe(true);
  });

  it('renders a component with call variables', () => {
    openedCall.state.mainCall = { variables };
    const wrapper = shallowMount(OpenedCallInfo, { localVue, store });
    expect(wrapper.findAll('.call-variable').length).toBe(Object.keys(variables).length);
  });

  it('renders variables texts', () => {
    openedCall.state.mainCall = { variables };
    const wrapper = shallowMount(OpenedCallInfo, { localVue, store });
    const varKey = Object.keys(variables)[0];
    expect(wrapper.find('.call-variable__key').text()).toBe(`${varKey}:`);
    expect(wrapper.find('.call-variable__value').text()).toBe(variables[varKey]);
  });
});
