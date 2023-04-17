import { FileTranscriptServiceApiFactory } from 'webitel-sdk';
import instance from '../../../../../../../app/api/instance';
import configuration from '../../../../../../../app/api/utils/openAPIConfig';

const transcriptService = new FileTranscriptServiceApiFactory(configuration, '', instance);

const createEvaluation = async ({ callId }) => {
const uuid = Array.isArray(callId) ? callId : [callId];
const response = await transcriptService.createFileTranscript({ uuid });
return response;
//додати
};

const getEvaluation = async ({ id, page = 1, size = 10000 }) => {
// const response = await transcriptService.getFileTranscriptPhrases(id, page, size);
return response.items || [];
};

const deleteEvaluation = ({ fileId, callId }) => {
let body;
if (fileId) {
body = { id: Array.isArray(fileId) ? fileId : [fileId] };
} else {
body = { uuid: Array.isArray(callId) ? callId : [callId] };
}
return transcriptService.deleteFileTranscript(body);
};

const CallEvaluationAPI = {
create: createTranscript,
get: getTranscript,
delete: deleteTranscript,
};

export default CallEvaluationAPI;
