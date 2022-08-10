import { CallServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/utils/openAPIConfig';
import formatResponse from './formatDashboardsResponse';

const SNAPSHOTS_URL = '/user/settings/dashboards';
const defaultParams = {
  search: '',
  from: new Date().setHours(0, 0, 0),
  to: new Date().setHours(23, 59, 59),
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
                                     member,
                                     duration,
                                     cause,
                                     direction,
                                     search,
                                     tags,
                                     amdResult,
                                     fts,
                                     hangupDisposition,
                                     hasFile,
                                     hasTranscription,
                                     description,
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
      duration,
      cause,
      direction,
      fts,
      tags,
      amd_result: amdResult,
      has_file: hasFile,
      has_transcript: hasTranscription,
      description,
      member,
      hangup_disposition: hangupDisposition,
      skip_parent: true,
    });
    return formatResponse(response);
  } catch (err) {
    throw err;
  }
};

const saveDashboards = (dashboards) => instance.put(SNAPSHOTS_URL, dashboards);

const getDashboards = async () => {
  const dashboards = await instance.get(SNAPSHOTS_URL);
  return dashboards || {};
};

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
