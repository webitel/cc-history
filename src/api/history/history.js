import { CallServiceApiFactory } from 'webitel-sdk';
import instance from '../instance';
import configuration from '../openAPIConfig';
import formatResponse from './formatHistoryResponse';
import getTodayStart from '../../utils/getTodayStart';

const callService = new CallServiceApiFactory(configuration, '', instance);

const getHistory = async (
  {
    page = 1,
    size = 10,
    from = getTodayStart(),
    to = Date.now(),
    user,
    agent,
    queue,
    team,
    gateway,
    member,
    durationFrom,
    durationTo,
    skipParent = true,
    parentId,
    cause,
    // eslint-disable-next-line no-unused-vars
    existsFile,
    fields,
    sort = '-created_at',
    search = '',
  },
) => {
  try {
    const response = await callService
      .searchHistoryCall(
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
        true,
        fields,
        sort,
      );
    return formatResponse(response);
  } catch (err) {
    throw err;
  }
};

export default getHistory;
