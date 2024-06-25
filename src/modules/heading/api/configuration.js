import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  merge,
  notify,
  snakeToCamel,
  starToSearch,
} from '@webitel/ui-sdk/src/api/transformers';
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
      'export_settings',
    );
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    console.log(response.data);
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
