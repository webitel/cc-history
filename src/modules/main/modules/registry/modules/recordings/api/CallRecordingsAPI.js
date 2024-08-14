import { FileServiceApiFactory } from 'webitel-sdk';
import applyTransform, {
  notify,
} from '@webitel/ui-sdk/src/api/transformers/index.js';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/openAPIConfig';

const fileService = new FileServiceApiFactory(configuration, '', instance);

const deleteRecordings = async (id) => {
  try {
    const idsArray = Array.isArray(id) ? id : [id];
    const response = await fileService.deleteFiles({ id: idsArray });
    return applyTransform(response.data, []);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const CallRecordingsAPI = {
  delete: deleteRecordings,
};

export default CallRecordingsAPI;
