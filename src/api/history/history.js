import { CallServiceApiFactory } from 'webitel-sdk';
import instance from '../instance';
import configuration from '../openAPIConfig';
import getDomainId from '../utils/getDomainId';
import formatResponse from './formatHistoryResponse';
import getTodayStart from '../../utils/getTodayStart';

const callService = new CallServiceApiFactory(configuration, '', instance);

// eslint-disable-next-line import/prefer-default-export
export const getHistory = async (
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
    existsFile,
    fields,
    sort = '-created_at',
    search = '',
  },
) => {
  const domainId = getDomainId();
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
        existsFile,
        fields,
        sort,
        domainId,
      );
    return formatResponse(response);
  } catch (err) {
    throw err;
  }
};
