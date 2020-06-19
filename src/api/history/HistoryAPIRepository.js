import { CallServiceApiFactory } from 'webitel-sdk';
import instance from '../instance';
import configuration from '../utils/openAPIConfig';
import formatResponse from './formatHistoryResponse';
import getTodayStart from '../../utils/getTodayStart';

const defaultParams = {
  page: 1,
  size: 10,
  search: '',
  from: getTodayStart(),
  to: Date.now(),
  skipParent: true,
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
                              search,
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
    );
    return formatResponse(response);
  } catch (err) {
    throw err;
  }
};

const HistoryAPIRepository = {
  async getHistory(argParams) {
    const params = {
      ...defaultParams,
      ...argParams,
    };
    params.q = params.search;
    return fetchHistory(params);
  },
};

export default HistoryAPIRepository;
