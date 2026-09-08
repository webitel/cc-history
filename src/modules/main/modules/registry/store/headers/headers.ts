import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { FilterOption } from '@webitel/ui-datalist/filters';
import { SpecialGlobalAction } from '@webitel/ui-sdk/modules/Userinfo';

import { useUserinfoStore } from '../../../../../userinfo/stores/userinfoStore';

/** Matches how the call visualization already hides its screencast tab. */
const controlAgentScreenAccess = () =>
	useUserinfoStore().hasSpecialGlobalActionAccess(
		SpecialGlobalAction.ControlAgentScreen,
	);

/* annotated on the literal so a mistyped key is an error, not a silent no-op */
const rawHeaders: DatalistTableHeader[] = [
	{
		value: 'createdAt',
		show: true,
		sort: null,
		field: 'created_at',
		filter: FilterOption.CreatedAt,
		locale: 'reusable.dateTime',
		reorderable: false,
	},
	{
		value: 'direction',
		show: true,
		sort: null,
		field: 'direction',
		filter: FilterOption.CallDirection,
	},
	{
		value: 'mos',
		show: false,
		sort: undefined,
		field: 'quality_metrics',
	},
	{
		value: 'answeredAt',
		show: false,
		sort: null,
		field: 'answered_at',
	},
	{
		value: 'bridgedAt',
		show: false,
		sort: null,
		field: 'bridged_at',
	},
	{
		value: 'queueBridgedAt',
		show: false,
		sort: null,
		field: 'queue_bridged_at',
	},
	{
		value: 'joinedAt',
		show: false,
		sort: null,
		field: 'joined_at',
	},
	{
		value: 'leavingAt',
		show: false,
		sort: null,
		field: 'leaving_at',
	},
	{
		value: 'hangupAt',
		show: false,
		sort: null,
		field: 'hangup_at',
	},
	{
		value: 'hangupPhrase',
		show: true,
		sort: null,
		field: 'hangup_phrase',
	},
	{
		value: 'reportingAt',
		show: false,
		sort: null,
		field: 'reporting_at',
	},
	{
		value: 'user',
		show: true,
		sort: null,
		field: 'user',
		filter: FilterOption.User,
	},
	{
		value: 'extension',
		show: false,
		sort: null,
		field: 'extension',
	},
	{
		value: 'from',
		show: true,
		field: 'from',
	},
	{
		value: 'to',
		show: true,
		field: 'to',
	},
	{
		value: 'destination',
		show: true,
		sort: null,
		field: 'destination',
	},
	{
		value: 'gateway',
		show: false,
		sort: null,
		field: 'gateway',
		filter: FilterOption.Gateway,
	},
	{
		value: 'agent',
		show: false,
		sort: null,
		field: 'agent',
		filter: FilterOption.Agent,
	},
	{
		value: 'team',
		show: false,
		sort: null,
		field: 'team',
		filter: FilterOption.Team,
	},
	{
		value: 'queue',
		show: false,
		sort: null,
		field: 'queue',
		filter: FilterOption.Queue,
	},
	{
		value: 'member',
		show: false,
		sort: null,
		field: 'member',
	},
	{
		value: 'hangupBy',
		show: false,
		sort: null,
		field: 'hangup_by',
	},
	{
		value: 'duration',
		show: true,
		sort: null,
		field: 'duration',
		filter: FilterOption.TotalDuration,
	},
	{
		value: 'screenshots',
		show: false,
		field: 'screenshots',
		locale: [
			'objects.screenshots',
			{
				count: 2,
			},
		],
	},
	{
		value: 'screencast',
		show: false,
		sort: undefined,
		field: 'screencast',
		locale: 'vocabulary.screencast',
		access: controlAgentScreenAccess,
	},
	{
		value: 'tags',
		show: false,
		sort: null,
		field: 'tags',
		filter: FilterOption.Tag,
	},
	{
		value: 'display',
		show: false,
		sort: null,
		field: 'display',
	},
	{
		value: 'holdSec',
		show: false,
		sort: null,
		field: 'hold_sec',
	},
	{
		value: 'waitSec',
		show: false,
		sort: null,
		field: 'wait_sec',
	},
	{
		value: 'billSec',
		show: true,
		sort: null,
		field: 'bill_sec',
	},
	{
		value: 'talkSec',
		show: true,
		sort: null,
		field: 'talk_sec',
		filter: FilterOption.TalkDuration,
	},
	{
		value: 'reportingSec',
		show: false,
		sort: null,
		field: 'reporting_sec',
	},
	{
		value: 'queueWaitSec',
		show: false,
		sort: null,
		field: 'queue_wait_sec',
	},
	{
		value: 'queueDurationSec',
		show: false,
		sort: null,
		field: 'queue_duration_sec',
	},
	{
		value: 'result',
		show: false,
		sort: null,
		field: 'result',
	},
	{
		value: 'sipCode',
		show: false,
		sort: null,
		field: 'sip_code',
	},
	{
		value: 'cause',
		show: true,
		sort: null,
		field: 'cause',
		filter: FilterOption.HangupCause,
	},
	{
		value: 'hangupDisposition',
		show: false,
		sort: null,
		field: 'hangup_disposition',
	},
	{
		value: 'amdResult',
		show: false,
		sort: null,
		field: 'amd_result',
		filter: FilterOption.AmdResult,
	},
	{
		value: 'agentDescription',
		show: false,
		sort: null,
		field: 'agent_description',
	},
	{
		value: 'blindTransfer',
		show: false,
		sort: null,
		field: 'blind_transfer',
	},
	{
		value: 'grantee',
		show: false,
		sort: null,
		field: 'grantee',
		filter: FilterOption.Grantee,
	},
	{
		value: 'score',
		show: false,
		sort: null,
		field: 'score_required',
		filter: FilterOption.Score,
	},
	{
		value: 'ratedBy',
		show: false,
		sort: null,
		field: 'rated_by',
		filter: FilterOption.RatedBy,
	},
	{
		value: 'memberId',
		show: false,
		sort: null,
		field: 'member',
	},
	{
		value: 'attemptId',
		show: false,
		sort: null,
		field: 'attempt_id',
	},
	{
		value: 'contact',
		show: false,
		sort: null,
		field: 'contact',
		filter: FilterOption.Contact,
	},
];

export const headers: DatalistTableHeader[] = rawHeaders.map((header) => ({
	locale: `fields.${header.value}`,
	...header,
}));
