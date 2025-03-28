import { shallowMount } from '@vue/test-utils';

import CommentForm from '../call-wave-comment-form.vue';

const props = {
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
      props,
    });
    expect(wrapper.classes('comment-form')).toBe(true);
  });

  it('should emit save event', () => {
    const wrapper = shallowMount(CommentForm, {
      props,
      data: () => ({ draft }),
    });
    wrapper.findComponent({ name: 'wt-button' }).vm.$emit('click');
    expect(wrapper.emitted().save[0][0]).toBeTruthy();
  });

  it('should emit draft data on save', () => {
    const wrapper = shallowMount(CommentForm, {
      props,
      data: () => ({ draft }),
    });
    wrapper.findComponent({ name: 'wt-button' }).vm.$emit('click');
    expect(wrapper.emitted().save[0][0]).toEqual(draft);
  });

  it('should render delete button if "draft" props contains id field', () => {
    const wrapper = shallowMount(CommentForm, {
      props,
      data: () => ({
        draft: { ...draft, id: '1' },
      }),
    });
    expect(
      wrapper
        .findAllComponents({ name: 'wt-button' })
        .find((btn) => btn.props().color === 'error')
        .isVisible(),
    ).toBe(true);
  });

  it('should not render delete button if "draft" props does not contain id', () => {
    const wrapper = shallowMount(CommentForm, {
      props,
      data: () => ({ draft }),
    });
    expect(
      wrapper
        .findAllComponents({ name: 'wt-button' })
        .find((btn) => btn.props().color === 'danger'),
    ).toBeFalsy();
  });
});
