import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults/index.js';
import applyTransform, {
  merge,
  notify,
  snakeToCamel,
  starToSearch,
} from '@webitel/ui-sdk/src/api/transformers/index.js';
import { SystemSettingServiceApiFactory } from 'webitel-sdk';
import instance from '../../../app/api/instance';
import configuration from '../../../app/api/openAPIConfig';

const service = new SystemSettingServiceApiFactory(configuration, '', instance);

const getList = async (params) => {
  const {
    page,
    size,
    search,
    sort,
    fields,
    name,
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
  ]);

  try {
    const response = await service.searchSystemSetting(
      page,
      size,
      search,
      sort,
      fields,
      name,
    );
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items,
      next,
    };
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const ConfigurationAPI = {
  getList,
};

export default ConfigurationAPI;
