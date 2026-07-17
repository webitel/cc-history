import type { DatalistTableHeader } from '@webitel/ui-datalist';

export const headers: DatalistTableHeader[] = [
	{
		value: 'parameter',
		show: true,
		field: 'parameter',
		locale: 'registry.call.callQuality.parameter',
	},
	{
		value: 'avg',
		show: true,
		field: 'avg',
		locale: 'registry.call.callQuality.avg',
	},
	{
		value: 'min',
		show: true,
		field: 'min',
		locale: 'registry.call.callQuality.min',
	},
	{
		value: 'minAt',
		show: true,
		field: 'minAt',
		locale: 'registry.call.callQuality.minAt',
	},
	{
		value: 'max',
		show: true,
		field: 'max',
		locale: 'registry.call.callQuality.max',
	},
	{
		value: 'maxAt',
		show: true,
		field: 'maxAt',
		locale: 'registry.call.callQuality.maxAt',
	},
];

export const QUALITY_PARAMETERS = [
	'mos',
	'jitter',
	'packetloss',
	'roundtrip',
] as const;

export type QualityParameter = (typeof QUALITY_PARAMETERS)[number];
