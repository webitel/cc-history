import { describe, expect, it } from 'vitest';

import { buildCallScreenRecordingArchiveParams } from '../buildCallScreenRecordingArchiveParams';

describe('buildCallScreenRecordingArchiveParams', () => {
	it('downloads every recording of the call when nothing is selected and no date filter is set', () => {
		expect(
			buildCallScreenRecordingArchiveParams({
				selected: [],
			}),
		).toEqual({});
	});

	it('sends the date range as recording start time bounds', () => {
		expect(
			buildCallScreenRecordingArchiveParams({
				selected: [],
				from: 1_700_000_000_000,
				to: 1_700_000_100_000,
			}),
		).toEqual({
			from: '1700000000000',
			to: '1700000100000',
		});
	});

	it('sends a single bound when only one date is set', () => {
		expect(
			buildCallScreenRecordingArchiveParams({
				selected: [],
				from: 1_700_000_000_000,
				to: null,
			}),
		).toEqual({
			from: '1700000000000',
		});

		expect(
			buildCallScreenRecordingArchiveParams({
				selected: [],
				from: null,
				to: 1_700_000_100_000,
			}),
		).toEqual({
			to: '1700000100000',
		});
	});

	it('sends only selected file ids, even when a date filter is set', () => {
		expect(
			buildCallScreenRecordingArchiveParams({
				selected: [
					{
						id: '123',
					},
					{
						id: '456',
					},
				],
				from: 1,
				to: 2,
			}),
		).toEqual({
			fileIds: [
				'123',
				'456',
			],
		});
	});
});
