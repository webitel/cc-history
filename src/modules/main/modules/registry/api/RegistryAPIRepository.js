import { CallServiceApiFactory } from 'webitel-sdk';

import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/utils/openAPIConfig';
import formatResponse from './formatRegistryResponse';

const defaultParams = {
  page: 1,
  size: 10,
  search: '',
  from: new Date().setHours(0, 0, 0),
  to: new Date().setHours(23, 59, 59),
  sort: '-created_at',
};

const callService = new CallServiceApiFactory(configuration, '', instance);

const fetchHistory = async ({
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
                              sort,
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
                            }) => {
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
      createdAt: {
        from,
        to,
      },
      userId: user,
      agentId: agent,
      queueId: queue,
      teamId: team,
      memberId: member,
      gatewayId: gateway,
      duration,
      skipParent,
      parentId,
      cause,
      hasFile,
      q: search,
      direction,
      id,
      dependencyId,
      tags,
      amdResult,
      fts,
      directions: hangupDisposition,
      hasTranscript: hasTranscription,
      agentDescription: description,
      granteeId: grantee,
      talk: talkSec,
      rated,
      ratedBy,
      scoreRequired: score,
      variables,
    });
    return formatResponse(response);
  } catch (err) {
    throw err;
  }
};

const RegistryAPIRepository = {
  async getHistory(argParams) {
    const params = {
      ...defaultParams,
      ...argParams,
    };
    return fetchHistory(params);
  },
};

export default RegistryAPIRepository;
