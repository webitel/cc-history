import {
	createFilterConfig,
	type FilterConfigDefinition,
	FilterOption,
} from '@webitel/ui-datalist/filters';

export const createdAtFilterConfig = createFilterConfig({
	name: FilterOption.CreatedAt,
	notDeletable: true,
});

export const filtersOptions: FilterConfigDefinition[] = [
	createdAtFilterConfig,
	FilterOption.Agent,
	FilterOption.AmdResult,
	FilterOption.Contact,
	FilterOption.CallDirection,
	FilterOption.Rated,
	FilterOption.Gateway,
	FilterOption.Grantee,
	FilterOption.HangupCause,
	FilterOption.Queue,
	FilterOption.RatedBy,
	FilterOption.HasFile,
	FilterOption.Score,
	FilterOption.Tag,
	FilterOption.TalkDuration,
	FilterOption.Team,
	FilterOption.TotalDuration,
	FilterOption.HasTranscription,
	FilterOption.User,
	FilterOption.Variable,
];
