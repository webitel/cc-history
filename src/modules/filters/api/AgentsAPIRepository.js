import { AgentServiceApiFactory } from 'webitel-sdk';
import { SdkListGetterApiConsumer } from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../app/api/instance';
import configuration from '../../../app/api/openAPIConfig';
import applyTransform, {
  merge, mergeEach, notify,
  sanitize,
  snakeToCamel,
  starToSearch
} from "@webitel/ui-sdk/src/api/transformers";
import {getDefaultGetListResponse, getDefaultGetParams} from "@webitel/ui-sdk/src/api/defaults";

const agentService = new AgentServiceApiFactory(configuration, '', instance);

// const listGetter = new SdkListGetterApiConsumer(agentService.searchAgent);
const getAgentList = async (params) => {
  const fieldsToSend = [
    'page',
    'size',
    'search',
    'sort',
    'fields',
    'id',
  ];
  const defaultObject = {
    enabled: false,
  };

  // const {
  //   page,
  //   size,
  //   search,
  //   sort,
  //   fields,
  //   id,
  // } = applyTransform(params, [
  //   merge(getDefaultGetParams()),
  //   starToSearch('search'),
  //   sanitize(fieldsToSend),
  // ]);

  try {
    const response = await agentService.searchAgent(params);
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items: applyTransform(items, [
        mergeEach(defaultObject),
      ]),
      next,
    };
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const getAgentsLookup = (params) => getAgentList({
  ...params,
  fields: params.fields || ['id', 'name'],
});

const AgentsAPIRepository = {
  getLookup: getAgentsLookup,
};

export default AgentsAPIRepository;
