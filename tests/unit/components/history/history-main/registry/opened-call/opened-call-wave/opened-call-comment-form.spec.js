import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuelidate from 'vuelidate';
import Vuex from 'vuex';

import CommentForm
  from '../../../../../../../../src/components/history/history-main/registry/opened-call/opened-call-wave/opened-call-comment-form.vue';

const localVue = createLocalVue();
localVue.use(Vuelidate);
localVue.use(Vuex);

const propsData = {
  callId: 'id',
  callDuration: 1,
};

describe('Opened call comment form', () => {
  it('should render a component', () => {
    const wrapper = shallowMount(CommentForm, {
      localVue,
      propsData,
    });
    expect(wrapper.classes('comment-form'))
      .toBe(true);
  });
});
