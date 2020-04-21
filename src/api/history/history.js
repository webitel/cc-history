import { CallServiceApiFactory } from 'webitel-sdk';
import instance from '../instance';
import configuration from '../openAPIConfig';
import store from '../../store/index';

const callService = new CallServiceApiFactory(configuration, '', instance);

// eslint-disable-next-line import/prefer-default-export
export const getHistory = async (
  {
    page = 1,
    size = 10,
    from = Date.now() - 60 * 60 * 10 ** 3, // last hour
    to = Date.now(),
    userId = null,
    agentId = null,
    queueId = null,
    teamId = null,
    memberId = null,
    number = null,
    search = '',
  },
) => {
  const { domainId } = store.state.userinfo;
  // eslint-disable-next-line no-unused-vars
  let formattedSearch = search;
  if (search.length && search.slice(-1) !== '*') formattedSearch += '*';
  try {
    const response = await callService
      .searchHistoryCall(
        page,
        size,
        from,
        to,
        userId,
        agentId,
        queueId,
        teamId,
        memberId,
        number,
        domainId,
      );
    return response.items || [];
  } catch (err) {
    throw err;
  }
};
