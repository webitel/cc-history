import {
  camelToSnake, notify,
  starToSearch, snakeToCamel,
  merge, mergeEach,
} from '@webitel/ui-sdk/src/api/transformers';
import applyTransform
  from '@webitel/ui-sdk/src/api/transformers/applyTransform';
import { getDefaultGetListResponse } from '@webitel/ui-sdk/src/api/defaults';
import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';
import { CallServiceApiFactory } from 'webitel-sdk';
import * as converters from '@webitel/ui-sdk/src/scripts/caseConverters';

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

  return item.annotations ? item.annotations.map((comment) => ({
    ...defaultComment,
    ...comment,
  })) : [];
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
  }));
};

/*
pass custom transformers to use "abstract" getList function in both UI and CSV export cases:
 same params, different transformers
 */
const getList = ({
                   paramsTransformers = [],
                   responseTransformers = [],
                   responseItemsTransformers = [],
                 }) => async (params) => {
  const {
    page,
    size,
    from,
    to,
    user,
    rated,
    ratedBy,
    agent,
    queue,
    team,
    gateway,
    member,
    duration,
    skipParent,
    parentId,
    cause,
    fields,
    sort = '-created_at',
    direction,
    search,
    id,
    dependencyId,
    tags,
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
    const variables = variable
      && variable.split('&')
      .reduce((vars, currVar) => {
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

    const response = await callService.searchHistoryCallPost({
      page,
      size,
      sort,
      fields,
      created_at: {
        from,
        to,
      },
      user_id: user,
      agent_id: agent,
      queue_id: queue,
      team_id: team,
      member_id: member,
      gateway_id: gateway,
      duration,
      skip_parent: skipParent,
      parent_id: parentId,
      cause,
      has_file: hasFile === 'true' ? true : hasFile === 'false' ? false : undefined,
      number: search,
      direction,
      id,
      dependency_id: dependencyId,
      tags,
      amd_result: amdResult,
      fts,
      directions: hangupDisposition,
      has_transcript: hasTranscription === 'true' ? true : hasTranscription === 'false' ? false : undefined,
      agent_description: description,
      grantee_id: grantee,
      talk: talkSec,
      rated: rated === 'true' ? true : rated === 'false' ? false : undefined,
      rated_by: ratedBy,
      score_required: score,
      variables,
      contact_id: contact,
    });
    const {
      items,
      next,
    } = applyTransform(response.data, responseTransformers);
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

const getHistory = getList({
  paramsTransformers: [],
  responseTransformers: [
    snakeToCamel(['variables']),
    merge(getDefaultGetListResponse()),
  ],
  responseItemsTransformers: [
    transformResponseItems,
  ],
});

const exportHistoryToFile = getList({
  responseTransformers: [
    merge(getDefaultGetListResponse()),
  ],
  responseItemsTransformers: [
    (items) => items.map((item) => ({
    ...item,
      date: computeDate(item.created_at),
      time: computeTime(item.created_at),
      bridged_at: computeTime(item.bridged_at),
      queue_bridged_at: computeTime(item.queue_bridged_at),
      created_at: computeDateAndTime(item.created_at),
      answered_at: computeTime(item.answered_at),
      joined_at: computeTime(item.joined_at),
      leaving_at: computeTime(item.leaving_at),
      hangup_at: computeTime(item.hangup_at),
      reporting_at: computeTime(item.reporting_at),
      duration: convertDuration(item.duration),
      hold_sec: convertDuration(item.hold_sec),
      wait_sec: convertDuration(item.wait_sec),
      bill_sec: convertDuration(item.bill_sec),
      talk_sec: convertDuration(item.talk_sec),
      reporting_sec: convertDuration(item.reporting_sec),
      queue_wait_sec: convertDuration(item.queue_wait_sec),
      queue_duration_sec: convertDuration(item.queue_duration_sec),
    })),
  ],
});

const RegistryAPIRepository = {
  getHistory,
  exportHistoryToFile,
};

export default RegistryAPIRepository;
