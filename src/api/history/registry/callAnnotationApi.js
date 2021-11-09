import { CallServiceApiFactory } from 'webitel-sdk';
import instance from '../../instance';
import configuration from '../../utils/openAPIConfig';
import {
  SdkCreatorApiConsumer,
  SdkDeleterApiConsumer,
  SdkGetterApiConsumer,
  SdkListGetterApiConsumer,
  SdkUpdaterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';

const callService = new CallServiceApiFactory(configuration, '', instance);

const defaultListObject = {};
const defaultSingleObject = {
  callId: '',
  endSec: 0,
  startSec: 0,
  note: '',
};

const fieldsToSend = ['note', 'startSec', 'endSec', 'callId'];

const listGetter = new SdkListGetterApiConsumer(callService.searchSkill);
const itemGetter = new SdkGetterApiConsumer(callService.readSkill);
const itemCreator = new SdkCreatorApiConsumer(callService.createSkill, { fieldsToSend });
const itemUpdater = new SdkUpdaterApiConsumer(callService.updateSkill, { fieldsToSend });
const itemDeleter = new SdkDeleterApiConsumer(callService.deleteSkill);

export const getCommentsList = (params) => listGetter.getList(params);
export const getComment = (params) => itemGetter.getItem(params);
export const addComment = (params) => itemCreator.createItem(params);
export const updateComment = (params) => itemUpdater.updateItem(params);
export const deleteComment = (params) => itemDeleter.deleteItem(params);

export default {
  getList: getCommentsList,
  get: getComment,
  add: addComment,
  update: updateComment,
  delete: deleteComment,
};
