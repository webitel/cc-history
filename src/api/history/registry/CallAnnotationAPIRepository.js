import { CallServiceApiFactory } from 'webitel-sdk';
import {
  SdkCreatorApiConsumer,
  SdkDeleterApiConsumer,
  SdkUpdaterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../instance';
import configuration from '../../utils/openAPIConfig';

const callService = new CallServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['note', 'startSec', 'endSec', 'callId'];

const itemCreator = new SdkCreatorApiConsumer(callService.createCallAnnotation, { fieldsToSend });
const itemUpdater = new SdkUpdaterApiConsumer(callService.updateCallAnnotation, { fieldsToSend });
const itemDeleter = new SdkDeleterApiConsumer(callService.deleteCallAnnotation);

/*TODO TEST: Апішки теж можна тесити. Десь я це прям наловчився зручно і класно робити --
    здається у супервізорі. Пінгани мене за це, якщо не знайдег чи не впевнений будеш */

const addComment = ({ itemInstance }) => (itemCreator.createNestedItem({
  parentId: itemInstance.callId,
  itemInstance,
}));

const updateComment = ({ itemInstance }) => (itemUpdater.updateNestedItem({
  parentId: itemInstance.callId,
  itemId: itemInstance.id,
  itemInstance,
}));

const deleteComment = ({ itemInstance }) => (itemDeleter.deleteNestedItem({
  parentId: itemInstance.callId,
  id: itemInstance.id,
}));

const CallAnnotationAPIRepository = {
  add: addComment,
  update: updateComment,
  delete: deleteComment,
};

export default CallAnnotationAPIRepository;
