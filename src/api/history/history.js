import { CallServiceApiFactory } from 'webitel-sdk';
import instance from '../instance';
import configuration from '../openAPIConfig';
import store from '../../store/index';

const callService = new CallServiceApiFactory(configuration, '', instance);

const computeDate = (createdAt) => {
  const date = new Date(+createdAt);
  return date.toLocaleDateString();
};

const computeTime = (createdAt) => {
  const date = new Date(+createdAt);
  return date.toLocaleTimeString();
};

const formatResponse = (response) => {
  const defaultObject = {
    _isSelected: false,
  };
  if (response.items) {
    return response.items.map((item) => ({
      ...defaultObject,
      ...item,
      date: computeDate(item.createdAt),
      time: computeTime(item.createdAt),
      duration: new Date(item.duration || 0).toISOString()
        .substr(11, 8),
    }));
  }
  return [];
};

// eslint-disable-next-line import/prefer-default-export
export const getHistory = async (
  {
    page = 1,
    size = 10,
    from = Date.now() - 60 * 60 * 10 ** 3, // last hour
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
    fields,
    sort,
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
        user,
        agent,
        queue,
        team,
        member,
        gateway,
        formattedSearch,
        durationFrom,
        durationTo,
        skipParent,
        parentId,
        cause,
        fields,
        sort,
        domainId,
      );
    return formatResponse(response);
  } catch (err) {
    throw err;
  }
};
