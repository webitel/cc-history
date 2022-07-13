import { FileTranscriptServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/utils/openAPIConfig';

const transcriptService = new FileTranscriptServiceApiFactory(configuration, '', instance);

const createTranscript = async (params) => {
  const response = await transcriptService.createFileTranscript({
    ...params,
    locale: 'uk-UA',
    profile: {
      id: 1,
    },
  });
  return response;
};

const getTranscript = async ({ id, page = 1, size = 10000 }) => {
  const response = await transcriptService.getFileTranscriptPhrases(id, page, size);
  return response.items;
};

const CallTranscriptAPI = {
  create: createTranscript,
  get: getTranscript,
};

export default CallTranscriptAPI;
