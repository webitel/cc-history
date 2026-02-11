import calcRelativeData from '../calcRelativeData';
import normalizeDashboardData from '../normalizeDashboardData';

const input = [
	{
		count: null,
		createdAt: '01.07',
		direction: null,
	},
	{
		count: 2,
		createdAt: '02.07',
		direction: 'inbound',
	},
	{
		count: 3,
		createdAt: '02.07',
		direction: 'outbound',
	},
	{
		count: 4,
		createdAt: '03.07',
		direction: 'outbound',
	},
	{
		count: null,
		createdAt: '04.07',
		direction: null,
	},
	{
		count: 5,
		createdAt: '05.07',
		direction: 'inbound',
	},
	{
		count: 6,
		createdAt: '05.07',
		direction: 'outbound',
	},
];

test('normalizeDashboardData', () => {
	const output = {
		inbound: {
			data: [
				0,
				2,
				0,
				0,
				5,
			],
			sum: 7,
		},
		outbound: {
			data: [
				0,
				3,
				4,
				0,
				6,
			],
			sum: 13,
		},
		sum: [
			0,
			5,
			4,
			0,
			11,
		],
	};
	const res = normalizeDashboardData({
		aggValue: 'count',
		param: 'direction',
		data: input,
	});
	expect(res.datasets.get('inbound')).toEqual(output.inbound);
	expect(res.datasets.get('outbound')).toEqual(output.outbound);
	// console.info(res);
	expect([
		...res.dates.values(),
	]).toEqual(output.sum);
});

test('calcRelativeData', () => {
	const res = normalizeDashboardData({
		aggValue: 'count',
		param: 'direction',
		data: input,
	});
	const rel = calcRelativeData(res.datasets, res.dates);
	expect(rel.datasets.get('inbound')).toEqual({
		data: [
			0,
			40,
			0,
			0,
			45,
		],
	});
	expect(rel.datasets.get('outbound')).toEqual({
		data: [
			0,
			60,
			100,
			0,
			55,
		],
	});
});
