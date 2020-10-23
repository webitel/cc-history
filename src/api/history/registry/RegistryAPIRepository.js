import { CallServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../utils/openAPIConfig';
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
                              agent,
                              queue,
                              team,
                              gateway,
                              member,
                              durationFrom,
                              durationTo,
                              skipParent,
                              parentId,
                              cause,
                              existsFile,
                              fields,
                              sort,
                              direction,
                              search,
                              ids,
                              dependencyId,
                            }) => {
  try {
    const response = await callService.searchHistoryCall(
      page,
      size,
      from,
      to,
      user,
      agent,
      queue,
      team,
      member,
      gateway,
      `${search}`,
      durationFrom,
      durationTo,
      skipParent,
      parentId,
      cause,
      existsFile,
      fields,
      sort,
      undefined,
      undefined,
      direction,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      ids,
      undefined,
      undefined,
      dependencyId,
    );
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
    params.q = params.search;
    return fetchHistory(params);
  },
};

export default RegistryAPIRepository;
