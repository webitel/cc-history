import {
  getDefaultGetListResponse,
  getDefaultGetParams,
} from '@webitel/ui-sdk/src/api/defaults';
import applyTransform, {
  camelToSnake,
  merge, notify, snakeToCamel,
  starToSearch, log,
} from '@webitel/ui-sdk/src/api/transformers';
import { AuditFormServiceApiFactory, EngineAuditQuestionType } from 'webitel-sdk';
import instance from '../../../../../../../../../app/api/instance';
import configuration from '../../../../../../../../../app/api/openAPIConfig';

const auditService = new AuditFormServiceApiFactory(configuration, '', instance);

const questionDefaultValuesHandler = (questions) => questions.map((question) => {
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
  });

const responseItemHandler = (response) => ({
  ...response,
  questions: questionDefaultValuesHandler(response.questions),
});

const getScorecards = async (params) => {
  const listHandler = (items) => items.map((item) => ({
      ...item,
      questions: questionDefaultValuesHandler(item.questions),
    }));

  const {
    page,
    size,
    search,
    sort,
    fields,
    enabled,
    active,
  } = applyTransform(params, [
    merge(getDefaultGetParams()),
    starToSearch('search'),
  ]);

  try {
    const response = await auditService.searchAuditForm(
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
    );
    const { items, next } = applyTransform(response.data, [
      snakeToCamel(),
      merge(getDefaultGetListResponse()),
    ]);
    return {
      items: applyTransform(items, [
        listHandler,
      ]),
      log,
      next,
    };
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const getAuditForm = async ({ itemId: id }) => {
  try {
    const response = await auditService.readAuditForm(id);
    console.log('getAuditForm API response:', response);
    return applyTransform(response.data, [
      snakeToCamel(),
      responseItemHandler,
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const sendAuditResult = async (itemInstance) => {
  const item = applyTransform(itemInstance, [
    camelToSnake(),
  ]);
  try {
    const response = await auditService.createAuditFormRate(item);
    return applyTransform(response.data, [
      snakeToCamel(),
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const getResult = async (id) => {
  try {
    const response = await auditService.readAuditRate(id);
    return applyTransform(response.data, [
      snakeToCamel(),
      responseItemHandler,
    ]);
  } catch (err) {
    throw applyTransform(err, [
      notify,
    ]);
  }
};

const getAuditLookup = (params) => getScorecards({
 ...params,
 fields: params.fields || ['id', 'name'],
});

const CallEvaluationAPI = {
  getLookup: getAuditLookup,
  get: getAuditForm,
  sendAuditResult,
  getResult,
};

export default CallEvaluationAPI;
