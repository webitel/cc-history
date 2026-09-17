import {
	createFilterConfig,
	type FilterConfigDefinition,
	FilterOption,
} from '@webitel/ui-datalist/filters';

export const filterConfigs = {
	[FilterOption.CreatedAt]: createFilterConfig({
		name: FilterOption.CreatedAt,
		notDeletable: true,
	}),
	[FilterOption.Agent]: FilterOption.Agent,
	[FilterOption.AmdResult]: FilterOption.AmdResult,
	[FilterOption.Contact]: FilterOption.Contact,
	[FilterOption.CallDirection]: FilterOption.CallDirection,
	[FilterOption.Rated]: FilterOption.Rated,
	[FilterOption.Gateway]: FilterOption.Gateway,
	[FilterOption.Grantee]: FilterOption.Grantee,
	[FilterOption.HangupCause]: FilterOption.HangupCause,
	[FilterOption.Queue]: FilterOption.Queue,
	[FilterOption.RatedBy]: FilterOption.RatedBy,
	[FilterOption.HasFile]: FilterOption.HasFile,
	[FilterOption.Score]: FilterOption.Score,
	[FilterOption.Tag]: FilterOption.Tag,
	[FilterOption.TalkDuration]: FilterOption.TalkDuration,
	[FilterOption.Team]: FilterOption.Team,
	[FilterOption.TotalDuration]: FilterOption.TotalDuration,
	[FilterOption.HasTranscription]: FilterOption.HasTranscription,
	[FilterOption.User]: FilterOption.User,
	[FilterOption.Variable]: FilterOption.Variable,
} satisfies Record<string, FilterConfigDefinition>;

export const filtersOptions: FilterConfigDefinition[] =
	Object.values(filterConfigs);
