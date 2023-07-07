import { FileServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../../../app/api/old/instance';
import configuration from '../../../../../../../app/api/old/utils/openAPIConfig';

const fileService = new FileServiceApiFactory(configuration, '', instance);

const deleteRecordings = (ids) => {
  const id = Array.isArray(ids) ? ids : [ids];
  return fileService.deleteFiles({ id });
};

const CallRecordingsAPI = {
  delete: deleteRecordings,
};

export default CallRecordingsAPI;
