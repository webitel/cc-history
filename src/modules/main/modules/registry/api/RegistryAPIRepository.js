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
    hangupDisposition: item.hangupDisposition ? snakeToCamel(item.hangupDisposition) : '',
    score: item.scoreRequired ? item.scoreRequired.toFixed(2) : null,
  }));
};

const getList = async (params) => {
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
  } = applyTransform(params, [
    starToSearch('search'),
  ]);
  try {
    const variables = variable
      && variable.split('&').reduce((vars, currVar) => ({
        ...vars,
        [currVar.split('=')[0]]: currVar.split('=')[1],
      }), {});

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
      has_file: hasFile,
      number: search,
      direction,
      id,
      dependency_id: dependencyId,
      tags,
      amd_result: amdResult,
      fts,
      directions: hangupDisposition,
      has_transcript: hasTranscription,
      agent_description: description,
      grantee_id: grantee,
      talk: talkSec,
      rated,
      rated_by: ratedBy,
      score_required: score,
      variables,
    });
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items: applyTransform(items, [
        transformResponseItems,
      ]),
      next,
    };
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const RegistryAPIRepository = {
  getHistory: getList,
};

export default RegistryAPIRepository;
