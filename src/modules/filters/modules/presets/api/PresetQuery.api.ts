import { EngineCreatePresetQueryRequest, EnginePresetQuery, PresetQueryServiceApiFactory } from 'webitel-sdk';
import { getDefaultGetListResponse, getDefaultGetParams } from '@webitel/ui-sdk/src/api/defaults/index.js';
import applyTransform, {
  camelToSnake,
  merge,
  notify,
  snakeToCamel,
  starToSearch,
} from '@webitel/ui-sdk/src/api/transformers/index.js';
import instance from '../../../../../app/api/instance';
import configuration from '../../../../../app/api/openAPIConfig';

const service = PresetQueryServiceApiFactory(configuration, '', instance);

const getPresetList = async (params) => {
  const {
    page,
    size,
    search,
    sort,
    fields,
    id,
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
  ]);

  try {
    const response = await service.searchPresetQuery(
      page,
      size,
      search,
      sort,
      fields,
      id,
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

const addPreset = async (preset: EngineCreatePresetQueryRequest): Promise<EnginePresetQuery> => {
  const item = applyTransform(preset, [
    camelToSnake(),
  ]);
  try {
    const response = await service.createPresetQuery(item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const updatePreset = async ({ item: itemInstance, id }) => {
  const item = applyTransform(itemInstance, [
    camelToSnake(),
  ]);
  try {
    const response = await service.updatePresetQuery(id, item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const deletePreset = async ({ id }) => {
  try {
    const response = await service.deletePresetQuery(id);
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const PresetQueryAPI = {
  getList: getPresetList,
  add: addPreset,
  update: updatePreset,
  delete: deletePreset,
};

export {
  getPresetList,
  addPreset,
  updatePreset,
  deletePreset,
};

export default PresetQueryAPI;
