import { CallAnnotationsAPI } from '@webitel/api-services/api';
import getContextMock from '../../../../../../../../../tests/unit/mocks/store/contextMock';

import call from '../call';

vi.mock('@webitel/api-services/api');

describe('Annotation store', () => {
	const response = {
		annotation: {},
	};
	let context;

	beforeEach(() => {
		vi.clearAllMocks();
		context = getContextMock(vi);
		// actions read/write `state.mainCall.annotations`
		context.state.mainCall = {
			annotations: [],
		};
	});

	it('ADD_ANNOTATION calls CallAnnotationApi add method', async () => {
		const addMock = vi.fn(() => response);
		CallAnnotationsAPI.add = addMock;
		await call.actions.ADD_ANNOTATION(context);
		expect(addMock).toHaveBeenCalled();
	});

	it('EDIT_ANNOTATION calls CallAnnotationApi update method', async () => {
		const updateMock = vi.fn(() => response);
		CallAnnotationsAPI.update = updateMock;
		await call.actions.EDIT_ANNOTATION(context);
		expect(updateMock).toHaveBeenCalled();
	});

	it('DELETE_ANNOTATION calls CallAnnotationApi delete method', async () => {
		const deleteMock = vi.fn(() => response);
		CallAnnotationsAPI.delete = deleteMock;
		await call.actions.DELETE_ANNOTATION(context);
		expect(deleteMock).toHaveBeenCalled();
	});
});
