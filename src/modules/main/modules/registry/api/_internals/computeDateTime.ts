import { FormatDateMode } from '@webitel/ui-sdk/enums';
import { formatDate } from '@webitel/ui-sdk/utils';

type Timestamp = string | number | null | undefined;

export const computeTimeWithSec = (timestamp: Timestamp): string | null => {
	if (!timestamp) return null;
	const date = new Date(+timestamp);
	return formatDate(date, FormatDateMode.TIME_SEC);
};

export const computeDateAndTime = (timestamp: Timestamp): string | null => {
	if (!timestamp) return null;
	const date = new Date(+timestamp);
	return formatDate(date, FormatDateMode.DATETIME);
};
