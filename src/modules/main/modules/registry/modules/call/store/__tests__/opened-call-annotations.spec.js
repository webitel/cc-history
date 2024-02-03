import CallAnnotationAPIRepository
  from '../../api/CallAnnotationAPIRepository';
import call from '../call';
import getContextMock from '../../../../../../../../../tests/unit/mocks/store/contextMock';

vi.mock('../../api/CallAnnotationAPIRepository');

describe('Annotation store', () => {
  const response = { annotation: {} };
  let context;

  beforeEach(() => {
    vi.clearAllMocks();
    context = getContextMock(vi);
  });

  it('ADD_ANNOTATION calls CallAnnotationApi add method', async () => {
    const addMock = vi.fn(() => response);
    CallAnnotationAPIRepository.add = addMock;
    await call.actions.ADD_ANNOTATION(context);
    expect(addMock).toHaveBeenCalled();
  });

  it('EDIT_ANNOTATION calls CallAnnotationApi update method', async () => {
    const updateMock = vi.fn(() => response);
    CallAnnotationAPIRepository.update = updateMock;
    await call.actions.EDIT_ANNOTATION(context);
    expect(updateMock).toHaveBeenCalled();
  });

  it('DELETE_ANNOTATION calls CallAnnotationApi delete method', async () => {
    const deleteMock = vi.fn(() => response);
    CallAnnotationAPIRepository.delete = deleteMock;
    await call.actions.DELETE_ANNOTATION(context);
    expect(deleteMock).toHaveBeenCalled();
  });
});
