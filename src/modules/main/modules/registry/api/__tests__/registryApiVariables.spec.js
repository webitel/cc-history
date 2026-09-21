import { CallHistoryAPI } from '@webitel/api-services/api';

import RegistryApi from '../RegistryAPIRepository.js';

vi.mock('@webitel/api-services/api', () => ({
	CallHistoryAPI: {
		getListPost: vi.fn(() =>
			Promise.resolve({
				items: [],
				next: false,
			}),
		),
	},
	getMediaUrl: vi.fn(),
}));

const requestData = () => CallHistoryAPI.getListPost.mock.calls.at(-1)[0].data;

describe('RegistryAPIRepository variables', () => {
	beforeEach(() => {
		CallHistoryAPI.getListPost.mockClear();
	});

	it('sends no variables when nothing is filtered', async () => {
		await RegistryApi.getHistory({
			fields: [],
		});

		expect(requestData().variables).toBeUndefined();
	});

	it('sends a variable column header filter as a variables entry', async () => {
		await RegistryApi.getHistory({
			fields: [],
			'variables.sip_code': '200',
		});

		expect(requestData().variables).toEqual({
			sip_code: '200',
		});
	});

	it('merges column header filters with the search query filter', async () => {
		await RegistryApi.getHistory({
			fields: [],
			variable: 'from_panel=1',
			'variables.from_column': '2',
		});

		expect(requestData().variables).toEqual({
			from_panel: '1',
			from_column: '2',
		});
	});

	it('lets a column header filter win over the same key from the query filter', async () => {
		await RegistryApi.getHistory({
			fields: [],
			variable: 'dup=query',
			'variables.dup': 'column',
		});

		expect(requestData().variables).toEqual({
			dup: 'column',
		});
	});
});
