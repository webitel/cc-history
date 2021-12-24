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

const draft = {
  note: 'note',
  startSec: 1,
  endSec: 2,
};

describe('Opened call comment form', () => {
  it('should render a component', () => {
    const wrapper = shallowMount(CommentForm, {
      localVue,
      propsData,
    });
    expect(wrapper.classes('comment-form')).toBe(true);
  });

  it('should emit save event', () => {
    const wrapper = shallowMount(CommentForm, {
      localVue,
      propsData,
      data: () => ({ draft }),
    });
    wrapper.findComponent({ name: 'wt-button' }).vm.$emit('click');
    expect(wrapper.emitted().save[0][0]).toBeTruthy();
  });

  it('should emit draft data on save', () => {
    const wrapper = shallowMount(CommentForm, {
      localVue,
      propsData,
      data: () => ({ draft }),
    });
    wrapper.findComponent({ name: 'wt-button' }).vm.$emit('click');
    expect(wrapper.emitted().save[0][0].note).toBe(draft.note);
    expect(wrapper.emitted().save[0][0].startSec).toBe(draft.startSec);
    expect(wrapper.emitted().save[0][0].endSec).toBe(draft.endSec);
  });

  it('should render delete button', () => {
    const wrapper = shallowMount(CommentForm, {
      localVue,
      propsData,
      data: () => ({
        draft: { ...draft, id: '1' },
      }),
    });
    expect(wrapper.findAllComponents({ name: 'wt-button' })
      .filter((btn) => btn.props().color === 'danger').isVisible()).toBe(true);
  });

  it('should not render delete button when comment id was not passed', () => {
    const wrapper = shallowMount(CommentForm, {
      localVue,
      propsData,
      data: () => ({ draft }),
    });
    expect(wrapper.findAllComponents({ name: 'wt-button' })
      .filter((btn) => btn.props().color === 'danger').exists()).toBe(false);
  });
});
