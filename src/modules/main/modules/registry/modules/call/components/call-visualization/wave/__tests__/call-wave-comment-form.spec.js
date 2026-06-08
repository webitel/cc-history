import { shallowMount } from '@vue/test-utils';

import CommentForm from '../call-wave-comment-form.vue';

const props = {
	callId: 'id',
	callDuration: 1,
};

// The form derives its internal `draft` from the `comment` prop via an
// immediate watcher, so drive the tests through `comment` rather than `data`.
const draft = {
	note: 'note',
	startSec: 1,
	endSec: 2,
};

const mountForm = (comment) =>
	shallowMount(CommentForm, {
		props: {
			...props,
			comment,
		},
	});

const findDeleteButton = (wrapper) =>
	wrapper
		.findAllComponents({
			name: 'wt-button',
		})
		.find((btn) => btn.props().color === 'error');

describe('Opened call comment form', () => {
	it('should render a component', () => {
		const wrapper = mountForm(null);
		expect(wrapper.classes('comment-form')).toBe(true);
	});

	it('should emit save event', () => {
		const wrapper = mountForm(draft);
		wrapper
			.findComponent({
				name: 'wt-button',
			})
			.vm.$emit('click');
		expect(wrapper.emitted().save[0][0]).toBeTruthy();
	});

	it('should emit draft data on save', () => {
		const wrapper = mountForm(draft);
		wrapper
			.findComponent({
				name: 'wt-button',
			})
			.vm.$emit('click');
		expect(wrapper.emitted().save[0][0]).toEqual(draft);
	});

	it('should render delete button if "draft" props contains id field', () => {
		const wrapper = mountForm({
			...draft,
			id: '1',
		});
		expect(findDeleteButton(wrapper).isVisible()).toBe(true);
	});

	it('should not render delete button if "draft" props does not contain id', () => {
		const wrapper = mountForm(draft);
		expect(findDeleteButton(wrapper)).toBeFalsy();
	});
});
