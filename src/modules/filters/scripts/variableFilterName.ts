import { VARIABLE_FIELD_PREFIX } from '@webitel/ui-sdk/modules/TableVariableColumnSelect';

export const isVariableFilterName = (name: string) =>
	name.startsWith(VARIABLE_FIELD_PREFIX);

export const variableKeyFromFilterName = (name: string) =>
	name.slice(VARIABLE_FIELD_PREFIX.length);
