import { WtTypeExtensionFieldKind } from '@webitel/ui-sdk/enums';
import { describe, expect, it } from 'vitest';

import {
	toVariableFilterFields,
	withVariableColumnFilters,
} from '../variableColumnFilter';

const header = {
	value: 'variables.sip_code',
	field: 'variables.sip_code',
	text: 'sip_code',
	show: true,
};

describe('withVariableColumnFilters', () => {
	it('names the header filter after the variable field, keeping the header itself', () => {
		const [decorated] = withVariableColumnFilters([
			header,
		]);

		expect(decorated).toMatchObject(header);
		expect(decorated.filter).toBe('variables.sip_code');
	});
});

describe('toVariableFilterFields', () => {
	it('describes the variable as a text field the column filter can resolve', () => {
		expect(
			toVariableFilterFields([
				header,
			]),
		).toEqual([
			{
				id: 'variables.sip_code',
				name: 'sip_code',
				kind: WtTypeExtensionFieldKind.Text,
			},
		]);
	});

	it('falls back to the key from the field when the header has no text', () => {
		const [field] = toVariableFilterFields([
			{
				...header,
				text: undefined,
			},
		]);

		expect(field.name).toBe('sip_code');
	});
});
