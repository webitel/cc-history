import { getDefaultGetListResponse } from '@webitel/ui-sdk/api/defaults/index';
import applyTransform, {
	merge,
	notify,
	snakeToCamel,
} from '@webitel/ui-sdk/api/transformers/index';
import { normalizeToTimestamp } from '@webitel/ui-sdk/scripts';
import { startOfToday } from 'date-fns';
import { CallServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';
import { transformExportItems } from './_internals/transformExportItems.ts';
import { transformHistoryItems } from './_internals/transformHistoryItems.ts';

const callService = new CallServiceApiFactory(configuration, '', instance);

/*
pass custom transformers to use "abstract" getList function in both UI and CSV export cases:
 same params, different transformers
 */
const getList =
	({
		paramsTransformers = [],
		responseTransformers = [],
		responseItemsTransformers = [],
	}) =>
	async (params) => {
		const {
			page,
			size,
			createdAt,
			user,
			rated,
			ratedBy,
			agent,
			queue,
			team,
			gateway,
			member,
			totalDuration,
			talkDuration,
			skipParent,
			parentId,
			cause,
			fields,
			sort = '-created_at',
			direction,
			search,
			id,
			dependencyId,
			tag,
			amdResult,
			fts,
			hangupDisposition,
			hasFile,
			hasTranscription,
			description,
			grantee,
			talkSec, // Це теж не використовується
			score,
			variable,
			contact,
		} = applyTransform(params, paramsTransformers);
		try {
			const variables = variable?.split('&').reduce((vars, currVar) => {
				const [key, value] = currVar.split('=');
				/*
         This if else statement is needed for sending ''
          to backend when user writes not valid variableSearch, so we can display dummy image.
         */
				vars[key] = value !== undefined ? value : '';
				return vars;
			}, {});

			const setupCreatedAt = (createdAt) => {
				if (typeof createdAt === 'string') {
					return {
						from: normalizeToTimestamp(createdAt, {
							round: 'start',
						}),
						to: normalizeToTimestamp(createdAt, {
							round: 'end',
						}),
					};
				}

				if (!createdAt) {
					return {
						from: normalizeToTimestamp(startOfToday().getTime()),
					};
				}

				return createdAt;
			};

			const response = await callService.searchHistoryCallPost({
				page,
				size,
				sort,
				fields: [
					'id',
					...fields,
				],
				created_at: setupCreatedAt(createdAt),
				user_id: user,
				agent_id: agent,
				queue_id: queue,
				team_id: team,
				member_id: member,
				gateway_id: gateway,
				duration: totalDuration,
				talk: talkDuration,
				skip_parent: skipParent ?? true,
				parent_id: parentId,
				cause,
				has_file: hasFile !== undefined ? hasFile : undefined,
				number: search,
				direction,
				id,
				dependency_id: dependencyId,
				tags: tag,
				amd_result: amdResult,
				fts,
				directions: hangupDisposition,
				has_transcript:
					hasTranscription !== undefined ? hasTranscription : undefined,
				agent_description: description,
				grantee_id: grantee,
				rated: rated !== undefined ? rated : undefined,
				rated_by: ratedBy,
				score_required: score,
				variables,
				contact_id: contact,
			});
			const { items, next } = applyTransform(
				response.data,
				responseTransformers,
			);
			return {
				items: applyTransform(items, responseItemsTransformers),
				next,
			};
		} catch (err) {
			throw applyTransform(err, [
				notify,
			]);
		}
	};

const getHistory = (requestParams) => {
	const requestFields = [
		'files',
		'files_job',
		'transcripts',
		'conversation_id',
		...requestParams.fields,
	];
	return getList({
		paramsTransformers: [],
		responseTransformers: [
			snakeToCamel([
				'variables',
				'form_fields',
			]),
			merge(getDefaultGetListResponse()),
		],
		responseItemsTransformers: [
			transformHistoryItems,
		],
	})({
		...requestParams,
		fields: requestFields,
	});
};

const exportHistoryToFile = getList({
	responseTransformers: [
		merge(getDefaultGetListResponse()),
	],
	responseItemsTransformers: [
		transformExportItems,
	],
});

const RegistryAPIRepository = {
	getHistory,
	exportHistoryToFile,
};

export default RegistryAPIRepository;
