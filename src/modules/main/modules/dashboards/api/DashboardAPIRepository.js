import deepCopy from 'deep-copy';
import { CallServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../app/api/instance';
import oldInstance from '../../../../../app/api/old/instance';
import configuration from '../../../../../app/api/openAPIConfig';
import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  camelToSnake,
  generateUrl,
  merge,
  mergeEach,
  notify,
  log,
  sanitize,
  snakeToCamel,
  starToSearch,
} from '@webitel/ui-sdk/src/api/transformers';
import formatResponse from './formatDashboardsResponse';


const SNAPSHOTS_URL = '/user/settings/dashboards';
const defaultObject = {
  search: '',
  from: new Date().setHours(0, 0, 0),
  to: new Date().setHours(23, 59, 59),
};

const transformResponseItems = ({ items }) => {
  // retrieve data from item and round all numerical values to 2 digits after comma
  // const newItems = items.map((item) => {
  //   console.log('item:', item);
  //   return item;
  // });
  // return newItems;
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

const oldCallService = new CallServiceApiFactory(configuration, '', oldInstance);
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
                                     grantee,
                                     variable,
                                     contact,
                                   }) => {
  const variables = variable
    && variable.split('&').reduce((vars, currVar) => ({
      ...vars,
      [currVar.split('=')[0]]: currVar.split('=')[1],
    }), {});
  console.log('variables:', variables);
  try {
    const response = await oldCallService.aggregateHistoryCall({
      aggs,
      created_at: { from, to },
      user_id: user,
      agent_id: agent,
      queue_id: queue,
      team_id: team,
      gateway_id: gateway,
      grantee_id: grantee,
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
      variables,
      contact_id: contact,
    });
    console.log('rare resp:', response);
    console.log('format resp:', formatResponse(response));
    return formatResponse(response);
  } catch (err) {
    throw err;
  }
};

const getDashboardsData = async ({
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
                                   search = '',
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
                                 }) => {
  try {
    const variables = variable
      && variable.split('&').reduce((vars, currVar) => ({
        ...vars,
        [currVar.split('=')[0]]: currVar.split('=')[1],
      }), {});
    console.log('variables:', variables);
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
        has_file: hasFile,
        has_transcript: hasTranscription,
        description,
        member,
        hangup_disposition: hangupDisposition,
        skip_parent: true,
        variables,
        contact_id: contact,
    });
    console.log('rare resp:', response);
    console.log('format resp.data:', formatResponse(response.data));
    const items = applyTransform(response.data, [
      snakeToCamel(),
    ]);

    return applyTransform(items, [
      transformResponseItems,
      mergeEach(defaultObject),
      ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

// const saveDashboards = (dashboards) => instance.put(SNAPSHOTS_URL, dashboards);
const saveDashboards = async (dashboards) => {
  try {
    const response = await instance.put(SNAPSHOTS_URL, dashboards);
    console.log('getDashboards resp', response);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

// const getDashboards = async () => {
//   const dashboards = await instance.get(SNAPSHOTS_URL);
//   return dashboards || {};
// };
const getDashboards = async () => {
  try {
    const response = await instance.get(SNAPSHOTS_URL);
    console.log('getDashboards resp', response);
    return response.data || {};
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const DashboardAPIRepository = {
  // async getDashboardsData(argParams) {
  //   const params = {
  //     ...defaultParams,
  //     ...argParams,
  //   };
  //   console.log('Params', params);
  //   return fetchDashboardsData(params);
  // },
  getDashboardsData,
  saveDashboards,
  getDashboards,
};

export default DashboardAPIRepository;
