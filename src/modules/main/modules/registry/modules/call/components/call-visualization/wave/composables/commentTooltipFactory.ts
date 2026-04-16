// VNode factory for comment tooltips (authors, dates, quoted note) used on region overlays.
import { FormatDateMode } from '@webitel/ui-sdk/enums';
import { formatDate } from '@webitel/ui-sdk/utils';
import { h } from 'vue';
import type { WaveAnnotation } from '../call-wave.types';

const formatCommentDate = (dateString: string) =>
	formatDate(+dateString, FormatDateMode.DATETIME);

function createAuthorBlock(label: string, name: string, date: string) {
	return [
		h(
			'p',
			{
				style: {
					margin: 0,
					fontSize: '14px',
					fontWeight: '700',
				},
			},
			name,
		),
		h(
			'p',
			{
				style: {
					margin: 0,
					fontSize: '12px',
				},
			},
			`${label}: ${date}`,
		),
		h('hr', {
			style: {
				margin: 0,
				background: 'var(--secondary-color)',
				border: 'none',
				height: '1px',
			},
		}),
	];
}

function createCommentHeader(comment: WaveAnnotation) {
	const nodes: ReturnType<typeof h>[] = [];
	const wasEdited =
		comment.updatedAt &&
		comment.createdAt &&
		comment.updatedAt !== comment.createdAt;

	if (wasEdited) {
		const updatedBy = comment.updatedBy?.name || comment.updatedBy?.id || '';
		nodes.push(
			...createAuthorBlock(
				'Updated',
				updatedBy,
				formatCommentDate(comment.updatedAt as string),
			),
		);
	}
	if (comment.createdAt) {
		const createdBy = comment.createdBy?.name || comment.createdBy?.id || '';
		nodes.push(
			...createAuthorBlock(
				'Created',
				createdBy,
				formatCommentDate(comment.createdAt as string),
			),
		);
	}
	return h('div', {}, nodes);
}

export function createCommentTooltipContent(comment: WaveAnnotation) {
	const header = createCommentHeader(comment);
	const noteElement = h(
		'p',
		{
			style: {
				margin: 0,
			},
		},
		`"${comment.note}"`,
	);
	return [
		header,
		noteElement,
	];
}
