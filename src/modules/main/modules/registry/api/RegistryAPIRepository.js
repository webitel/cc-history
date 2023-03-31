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
                            }) => {
  try {
    const response = await callService.searchHistoryCall(
      page,
      size,
      undefined,
      sort,
      fields,
      from,
      to,
      user,
      agent,
      queue,
      team,
      member,
      gateway,
      duration?.from,
      duration?.to,
      skipParent,
      parentId,
      cause,
      hasFile,
      undefined,
      `${search}`,
      direction,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      id,
      undefined,
      undefined,
      dependencyId,
      tags,
      amdResult,
      fts,
      hangupDisposition,
      hasTranscription,
      description,
      undefined,
      grantee,
    );
    return formatResponse(response);
  } catch (err) {
    throw err;
  }
};

const RegistryAPIRepository = {
  async getHistory(argParams) {
    console.log('argParams', argParams);
    const params = {
      ...defaultParams,
      ...argParams,
    };
    params.q = params.search;
    return fetchHistory(params);
  },
};

export default RegistryAPIRepository;
