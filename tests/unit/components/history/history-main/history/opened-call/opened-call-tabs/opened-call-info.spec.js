import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import OpenedCallInfo from '@/components/history/history-main/history/opened-call/opened-call-tabs/opened-call-info.vue';
import openedCallHistory from '@/store/modules/history/opened-call/opened-call';

const localVue = createLocalVue();
localVue.use(Vuex);
const variables = { hello: 'there', hello1: 'there' };

describe('Opened call info tab', () => {
  const store = new Vuex.Store({
    modules: {
      history: {
        namespaced: true,
        modules: { 'opened-call': openedCallHistory },
      },
    },
  });

  it('renders a component without variables', () => {
    const wrapper = shallowMount(OpenedCallInfo, { localVue, store });
    expect(wrapper.classes('opened-call-info')).toBe(true);
  });

  it('renders a component with call variables', () => {
    openedCallHistory.state.mainCall = { variables };
    const wrapper = shallowMount(OpenedCallInfo, { localVue, store });
    expect(wrapper.findAll('.call-info-variable').length).toBe(Object.keys(variables).length);
  });

  it('renders variables texts', () => {
    openedCallHistory.state.mainCall = { variables };
    const wrapper = shallowMount(OpenedCallInfo, { localVue, store });
    const varKey = Object.keys(variables)[0];
    expect(wrapper.find('.call-info-variable__key').text()).toBe(`${varKey}:`);
    expect(wrapper.find('.call-info-variable__value').text()).toBe(variables[varKey]);
  });
});