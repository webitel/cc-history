import { flushPromises, mount } from '@vue/test-utils';
import {
	ColumnFilterComponent,
	createFiltersManager,
	toVariableFilterFields,
	withVariableColumnFilters,
} from '@webitel/ui-datalist/filters';
import { describe, expect, it } from 'vitest';

const variableHeader = {
	value: 'variables.sip_code',
	field: 'variables.sip_code',
	text: 'sip_code',
	show: true,
};

const mountColumnFilter = async () => {
	const [header] = withVariableColumnFilters([
		variableHeader,
	]);

	const wrapper = mount(ColumnFilterComponent, {
		props: {
			header,
			filterableExtensionFields: toVariableFilterFields([
				variableHeader,
			]),
			filtersManager: createFiltersManager(),
			formView: true,
		},
	});

	await vi.dynamicImportSettled();
	await flushPromises();

	return wrapper;
};

describe('variable column filter', () => {
	it('asks for the value with a text input', async () => {
		const wrapper = await mountColumnFilter();

		expect(wrapper.find('input[type="text"]').exists()).toBe(true);
	});

	it('applies the typed value as a filter named after the variable field', async () => {
		const wrapper = await mountColumnFilter();

		await wrapper.find('input[type="text"]').setValue('200');
		await wrapper.findAll('.wt-button')[0].trigger('click');

		expect(wrapper.emitted('add:filter')?.[0]).toEqual([
			{
				name: 'variables.sip_code',
				value: '200',
			},
		]);
	});
});
