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

  it('should emit save event', () => {
    const wrapper = shallowMount(CommentForm, {
      localVue,
      propsData,
      data: () => ({ draft: { note: 'note', startSec: 1, endSec: 2 } }),
    });
    wrapper.findComponent({ name: 'wt-button' }).vm.$emit('click');
    expect(wrapper.emitted().save[0][0]).toBeTruthy();
  });

  it('should emit draft data on save', () => {
    const wrapper = shallowMount(CommentForm, {
      localVue,
      propsData,
      data: () => ({ draft: { note: 'note', startSec: 1, endSec: 2 } }),
    });
    wrapper.findComponent({ name: 'wt-button' }).vm.$emit('click');
    expect(wrapper.emitted().save[0][0].note).toBe('note');
  });

  it('should render delete button', () => {
    const wrapper = shallowMount(CommentForm, {
      localVue,
      propsData,
      data: () => ({ draft: { id: 'id', note: 'note', startSec: 1, endSec: 2 } }),
    });
    expect(wrapper.findAllComponents({ name: 'wt-button' }).length).toBe(2);
  });

  it('should not render delete button when comment id was not passed', () => {
    const wrapper = shallowMount(CommentForm, {
      localVue,
      propsData,
      data: () => ({ draft: { note: 'note', startSec: 1, endSec: 2 } }),
    });
    expect(wrapper.findAllComponents({ name: 'wt-button' }).length).toBe(1);
  });
});
