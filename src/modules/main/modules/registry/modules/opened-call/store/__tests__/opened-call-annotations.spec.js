import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import CallAnnotationAPIRepository
  from '../../api/CallAnnotationAPIRepository';
import openedCall from '../opened-call';
import getContextMock from '../../../../../../../../../tests/unit/mocks/store/contextMock';

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock('../../api/CallAnnotationAPIRepository');

describe('Annotation store', () => {
  const response = { annotation: {} };
  let context;

  beforeEach(() => {
    jest.clearAllMocks();
    context = getContextMock(jest);
  });

  it('ADD_ANNOTATION calls CallAnnotationApi add method', async () => {
    const addMock = jest.fn(() => response);
    CallAnnotationAPIRepository.add = addMock;
    await openedCall.actions.ADD_ANNOTATION(context);
    expect(addMock).toHaveBeenCalled();
  });

  it('EDIT_ANNOTATION calls CallAnnotationApi update method', async () => {
    const updateMock = jest.fn(() => response);
    CallAnnotationAPIRepository.update = updateMock;
    await openedCall.actions.EDIT_ANNOTATION(context);
    expect(updateMock).toHaveBeenCalled();
  });

  it('DELETE_ANNOTATION calls CallAnnotationApi delete method', async () => {
    const deleteMock = jest.fn(() => response);
    CallAnnotationAPIRepository.delete = deleteMock;
    await openedCall.actions.DELETE_ANNOTATION(context);
    expect(deleteMock).toHaveBeenCalled();
  });
});
