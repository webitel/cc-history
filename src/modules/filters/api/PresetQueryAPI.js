import {
  PresetQueryServiceApiFactory,
} from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
  SdkCreatorApiConsumer,
  SdkUpdaterApiConsumer,
  SdkDeleterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../app/api/instance';
import configuration from '../../../app/api/utils/openAPIConfig';

const service = new PresetQueryServiceApiFactory(configuration, '', instance);

const listGetter = new SdkListGetterApiConsumer(service.searchPresetQuery);
const creator = new SdkCreatorApiConsumer(service.createPresetQuery);
const updater = new SdkUpdaterApiConsumer(service.updatePresetQuery);
const deleter = new SdkDeleterApiConsumer(service.deletePresetQuery);

const getList = (params) => listGetter.getList(params);
const addPreset = (params) => creator.createItem({ itemInstance: params });

const updatePreset = ({ item, id }) => (
  updater.updateItem({ itemInstance: item, itemId: id })
);

const deletePreset = (params) => deleter.deleteItem(params);

const PresetQueryAPI = {
  getList,
  add: addPreset,
  update: updatePreset,
  delete: deletePreset,
};

export default PresetQueryAPI;
