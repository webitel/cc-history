import { CallServiceApiFactory } from 'webitel-sdk';
import applyTransform, {
  camelToSnake,
  notify,
  sanitize,
  snakeToCamel,
} from '@webitel/ui-sdk/src/api/transformers';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const callService = new CallServiceApiFactory(configuration, '', instance);

const fieldsToSend = ['note', 'startSec', 'endSec', 'callId'];

const addComment = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);

  try {
    const response = await callService.createCallAnnotation(
       itemInstance.callId,
       item,
     );
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const updateComment = async ({ itemInstance }) => {
  const item = applyTransform(itemInstance, [
    sanitize(fieldsToSend),
    camelToSnake(),
  ]);

  try {
    const response = await callService.updateCallAnnotation(
      itemInstance.callId,
      itemInstance.id,
      item,
      );
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const deleteComment = async ({ itemInstance }) => {
  try {
    const response = await callService.deleteCallAnnotation(
      itemInstance.callId,
      itemInstance.id,
    );
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const CallAnnotationAPIRepository = {
  add: addComment,
  update: updateComment,
  delete: deleteComment,
};

export default CallAnnotationAPIRepository;
