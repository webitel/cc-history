import { getDefaultGetListResponse } from '@webitel/ui-sdk/api/defaults/index';
import applyTransform, {
  merge,
  notify,
  snakeToCamel,
} from '@webitel/ui-sdk/api/transformers/index';
import { convertDuration, normalizeToTimestamp } from '@webitel/ui-sdk/scripts';
import * as converters from '@webitel/ui-sdk/scripts/caseConverters';
import { startOfToday } from 'date-fns';
import { CallServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const callService = new CallServiceApiFactory(configuration, '', instance);

const computeDate = (timestamp) => {
  if (!timestamp) return null;
  const date = new Date(+timestamp);
  return date.toLocaleDateString();
};

const computeTime = (timestamp) => {
  if (!timestamp) return null;
  const date = new Date(+timestamp);
  return date.toLocaleTimeString();
};

const computeDateAndTime = (timestamp) => {
  if (!timestamp) return null;
  const date = new Date(+timestamp);
  return date.toLocaleString('en-GB');
};

const mapDefaultComments = (item) => {
  const defaultComment = {
    startSec: 0,
    endSec: 0,
    note: '',
  };

  return item.annotations
    ? item.annotations.map((comment) => ({
        ...defaultComment,
        ...comment,
      }))
    : [];
};

const mapTranscripts = (item) => {
  return item.transcripts
    ? item.transcripts.map((transcript) => ({
        ...transcript,
        name: transcript.file?.name,
      }))
    : [];
};

const transformResponseItems = (items) => {
  const defaultObject = {
    _isSelected: false,
  };
  return items.map((item) => ({
    ...defaultObject,
    ...item,
    date: computeDate(item.createdAt),
    time: computeTime(item.createdAt),
    bridgedAt: computeTime(item.bridgedAt),
    queueBridgedAt: computeTime(item.queueBridgedAt),
    createdAt: computeDateAndTime(item.createdAt),
    answeredAt: computeTime(item.answeredAt),
    joinedAt: computeTime(item.joinedAt),
    leavingAt: computeTime(item.leavingAt),
    hangupAt: computeTime(item.hangupAt),
    reportingAt: computeTime(item.reportingAt),
    duration: convertDuration(item.duration),
    holdSec: convertDuration(item.holdSec),
    waitSec: convertDuration(item.waitSec),
    billSec: convertDuration(item.billSec),
    talkSec: convertDuration(item.talkSec),
    reportingSec: convertDuration(item.reportingSec),
    queueWaitSec: convertDuration(item.queueWaitSec),
    queueDurationSec: convertDuration(item.queueDurationSec),
    annotations: mapDefaultComments(item),
    hangupDisposition: item.hangupDisposition
      ? converters.snakeToCamel(item.hangupDisposition)
      : '',
    score: item.scoreRequired ? item.scoreRequired.toFixed(2) : null,
    transcripts: mapTranscripts(item),
  }));
};

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
      talkSec,
      score,
      variable,
      contact,
    } = applyTransform(params, paramsTransformers);
    try {
      const variables =
        variable &&
        variable.split('&').reduce((vars, currVar) => {
          const [key, value] = currVar.split('=');
          return {
            ...vars,
            /*
             This if else statement is needed for sending ''
              to backend when user writes not valid variableSearch, so we can display dummy image.
             */
            [key]: value !== undefined ? value : '',
          };
        }, {});

      const setupCreatedAt = (createdAt) => {
        if (typeof createdAt === 'string') {
          return {
            from: normalizeToTimestamp(createdAt, { round: 'start' }),
            to: normalizeToTimestamp(createdAt, { round: 'end' }),
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
        fields: ['id', 'files', 'files_job', 'transcripts', ...fields],
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
      throw applyTransform(err, [notify]);
    }
  };

const getHistory = getList({
  paramsTransformers: [],
  responseTransformers: [
    snakeToCamel(['variables', 'form_fields']),
    merge(getDefaultGetListResponse()),
  ],
  responseItemsTransformers: [transformResponseItems],
});

const exportHistoryToFile = getList({
  responseTransformers: [merge(getDefaultGetListResponse())],
  responseItemsTransformers: [
    (items) =>
      items.map((item) => {
        const convertedItem = { ...item };

        if (item.created_at) {
          // convertedItem.date = computeDate(item.created_at);
          // convertedItem.time = computeTime(item.created_at);
          convertedItem.created_at = computeDateAndTime(item.created_at);
        }

        if (item.bridged_at) {
          convertedItem.bridged_at = computeTime(item.bridged_at);
        }

        if (item.queue_bridged_at) {
          convertedItem.queue_bridged_at = computeTime(item.queue_bridged_at);
        }

        if (item.answered_at) {
          convertedItem.answered_at = computeTime(item.answered_at);
        }

        if (item.joined_at) {
          convertedItem.joined_at = computeTime(item.joined_at);
        }

        if (item.leaving_at) {
          convertedItem.leaving_at = computeTime(item.leaving_at);
        }

        if (item.hangup_at) {
          convertedItem.hangup_at = computeTime(item.hangup_at);
        }

        if (item.reporting_at) {
          convertedItem.reporting_at = computeTime(item.reporting_at);
        }

        if (item.duration) {
          convertedItem.duration = convertDuration(item.duration);
        }

        if (item.hold_sec) {
          convertedItem.hold_sec = convertDuration(item.hold_sec);
        }

        if (item.wait_sec) {
          convertedItem.wait_sec = convertDuration(item.wait_sec);
        }

        if (item.bill_sec) {
          convertedItem.bill_sec = convertDuration(item.bill_sec);
        }

        if (item.talk_sec) {
          convertedItem.talk_sec = convertDuration(item.talk_sec);
        }

        if (item.reporting_sec) {
          convertedItem.reporting_sec = convertDuration(item.reporting_sec);
        }

        if (item.queue_wait_sec) {
          convertedItem.queue_wait_sec = convertDuration(item.queue_wait_sec);
        }

        if (item.queue_duration_sec) {
          convertedItem.queue_duration_sec = convertDuration(
            item.queue_duration_sec,
          );
        }

        return convertedItem;
      }),
  ],
});

const RegistryAPIRepository = {
  getHistory,
  exportHistoryToFile,
};

export default RegistryAPIRepository;
