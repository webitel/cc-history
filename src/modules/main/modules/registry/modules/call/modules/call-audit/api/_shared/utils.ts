import { EngineAuditQuestionType } from 'webitel-sdk';

export const questionDefaultValuesHandler = (questions) =>
  questions.map((question) => {
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
export const responseItemHandler = (response) => ({
  ...response,
  questions: questionDefaultValuesHandler(response.questions),
});
