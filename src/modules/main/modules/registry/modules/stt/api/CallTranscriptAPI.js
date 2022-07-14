import { FileTranscriptServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/utils/openAPIConfig';

const transcriptService = new FileTranscriptServiceApiFactory(configuration, '', instance);

const createTranscript = async ({ callId }) => {
  const uuid = Array.isArray(callId) ? callId : [callId];
  const response = await transcriptService.createFileTranscript({
    uuid,
    locale: 'uk-UA',
  });
  return response;
};

const getTranscript = async ({ id, page = 1, size = 10000 }) => {
  const response = await transcriptService.getFileTranscriptPhrases(id, page, size);
  return response.items;
};

const deleteTranscript = ({ fileId }) => {
  return transcriptService.deleteFileTranscript({ id: [fileId] });
};

const CallTranscriptAPI = {
  create: createTranscript,
  get: getTranscript,
  delete: deleteTranscript,
};

export default CallTranscriptAPI;
