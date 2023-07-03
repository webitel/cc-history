import {
  AuditFormServiceApiFactory,
  EngineAuditQuestionType,
} from 'webitel-sdk';
import {
  SdkListGetterApiConsumer,
} from 'webitel-sdk/esm2015/api-consumers';
import instance from '../../../../../../../../../app/api/instance';
import configuration from '../../../../../../../../../app/api/utils/openAPIConfig';

const auditService = new AuditFormServiceApiFactory(configuration, '', instance);

const _getScorecardsLookup = (getList) => function ({
                                                page,
                                                size,
                                                search,
                                                sort,
                                                fields,
                                                enabled,
                                                active,
                                              }) {
  const params = [
    page,
    size,
    search,
    sort,
    fields,
    undefined,
    undefined,
    enabled,
    undefined,
    undefined,
    active,
  ];
  return getList(params);
};

const defaultListObject = (response) => {
  console.log('response', response);
  return {
    ...response,
    items: response.items.map((scorecard) => ({
      ...scorecard,
      questions: scorecard.questions.map((question) => {
        if (question.type === EngineAuditQuestionType.Score) {
          return {
            ...question,
            max: question.max || 1,
            min: question.min || 0,
            required: question.required || false,
            question: question.question || '',
          };
        }
        if (question.type === EngineAuditQuestionType.Option) {
          return {
            ...question,
            options: question.options.map((option) => ({
              ...option,
              name: option.name || '',
              score: option.score || 0,
            })),
          };
        }
        return question;
      }),
    })),
  };
};

const listGetter = new SdkListGetterApiConsumer(auditService.searchAuditForm, { defaultListObject })
  .setGetListMethod(_getScorecardsLookup);

const getAuditLookup = (params) => listGetter.getList(params);
const sendAuditResult = (params) => auditService.createAuditFormRate(params);

const getResult = (id) => (auditService.readAuditRate(id));

const CallEvaluationAPI = {
  getLookup: getAuditLookup,
  sendAuditResult,
  getResult,
};

export default CallEvaluationAPI;
