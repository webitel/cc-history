import { CallServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../utils/openAPIConfig';

const SNAPSHOTS_URL = '/user/settings/dashboards';
const defaultParams = {
  page: 1,
  size: 10,
  search: '',
  from: new Date().setHours(0, 0, 0),
  to: new Date().setHours(23, 59, 59),
  sort: '-created_at',
};

const callService = new CallServiceApiFactory(configuration, '', instance);

const fetchDashboardsData = async ({
                              aggs,
                              from,
                              to,
                              user,
                              agent,
                              queue,
                              team,
                              gateway,
                              durationFrom,
                              durationTo,
                              cause,
                              direction,
                              search,
                            }) => {
  try {
    const response = await callService.aggregateHistoryCall({
      aggs,
      created_at: { from, to },
      user_id: user,
      agent_id: agent,
      queue_id: queue,
      team_id: team,
      gateway_id: gateway,
      q: `${search}`,
      duration: { from: durationFrom, to: durationTo },
      cause,
      direction,
  });
    let data = [];
    if (response.items) data = response.items.map((item) => [...item.data]);
    return data;
  } catch (err) {
    throw err;
  }
};

const saveDashboards = (dashboards) => instance.put(SNAPSHOTS_URL, dashboards);

const getDashboards = () => instance.get(SNAPSHOTS_URL);

const DashboardAPIRepository = {
  async getDashboardsData(argParams) {
    const params = {
      ...defaultParams,
      ...argParams,
    };
    params.q = params.search;
    return fetchDashboardsData(params);
  },
  saveDashboards,
  getDashboards,
};

export default DashboardAPIRepository;
