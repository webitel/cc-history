import { FileTranscriptServiceApiFactory } from 'webitel-sdk';
import { SdkCreatorApiConsumer } from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/utils/openAPIConfig';

const transcriptService = new FileTranscriptServiceApiFactory(configuration, '', instance);

const creator = new SdkCreatorApiConsumer(transcriptService.createFileTranscript);

const createTranscript = (params) => creator.add(params);
const getTranscript = async ({ id, page = 1, size = 10000 }) => {
  const response = await transcriptService.getFileTranscriptPhrases(id, page, size);
  return response.items;
};

const CallTranscriptAPI = {
  create: createTranscript,
  get: getTranscript,
};

export default CallTranscriptAPI;
