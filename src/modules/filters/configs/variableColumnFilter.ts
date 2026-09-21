import type { DataField } from '@webitel/api-services/gen/models';
import { WtTypeExtensionFieldKind } from '@webitel/ui-sdk/enums';
import type { TableVariableHeader } from '@webitel/ui-sdk/modules/TableVariableColumnSelect';

import { variableKeyFromFilterName } from '../scripts/variableFilterName';

const variableFieldName = (header: TableVariableHeader) =>
	header.field ?? header.value;

export const withVariableColumnFilters = (headers: TableVariableHeader[]) =>
	headers.map((header) => ({
		...header,
		filter: variableFieldName(header),
	}));

export const toVariableFilterFields = (
	headers: TableVariableHeader[],
): DataField[] =>
	headers.map((header) => {
		const field = variableFieldName(header);

		return {
			id: field,
			name: header.text ?? variableKeyFromFilterName(field),
			kind: WtTypeExtensionFieldKind.Text,
		};
	});
