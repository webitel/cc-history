import deepCopy from 'deep-copy';
import { CallServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';
import applyTransform, {
  merge,
  notify,
  snakeToCamel,
} from '@webitel/ui-sdk/src/api/transformers';


const SNAPSHOTS_URL = '/user/settings/dashboards';


const transformResponseItems = ({ items }) => {
  // retrieve data from item and round all numerical values to 2 digits after comma
  const copy = deepCopy(items);
  return copy.map((item) => {
    return item.data ? item.data.map((dataItem) => {
      const mappedItem = {};
      Object.keys(dataItem).forEach((key) => {
        let value = dataItem[key];
        if (typeof value === 'number') value = Math.round(value * 100) / 100;
        mappedItem[key] = value;
      });
      return mappedItem;
    }) : [];
  });
};

const callService = new CallServiceApiFactory(configuration, '', instance);


const getDashboardsData = async (params) => {
  const defaultParams = {
    search: '',
    from: new Date().setHours(0, 0, 0),
    to: new Date().setHours(23, 59, 59),
  };

  const {
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
    grantee,
    variable,
    contact,
  } = applyTransform(params, [
    merge(defaultParams),
  ]);

  try {
    const variables = variable
      && variable.split('&').reduce((vars, currVar) => ({
        ...vars,
        [currVar.split('=')[0]]: currVar.split('=')[1],
      }), {});

    const response = await callService.aggregateHistoryCall({
        aggs,
        created_at: { from, to },
        user_id: user,
        agent_id: agent,
        queue_id: queue,
        team_id: team,
        gateway_id: gateway,
        grantee_id: grantee,
        q: search,
        duration,
        cause,
        direction,
        fts,
        tags,
        amd_result: amdResult,
        has_file: hasFile === undefined ? hasFile : hasFile === 'true', // str -> bool
        has_transcript: hasTranscription,
        description,
        member,
        hangup_disposition: hangupDisposition,
        skip_parent: true,
        variables,
        contact_id: contact,
    });
    const items = applyTransform(response.data, [
      snakeToCamel(),
    ]);

    return applyTransform(items, [
      transformResponseItems,
      ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const saveDashboards = async (dashboards) => {
  try {
    const response = await instance.put(SNAPSHOTS_URL, dashboards);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};


const getDashboards = async () => {
  try {
    const response = await instance.get(SNAPSHOTS_URL);
    console.info(response);
    return response.data || {};
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const DashboardAPIRepository = {
  getDashboardsData,
  saveDashboards,
  getDashboards,
};

export default DashboardAPIRepository;
