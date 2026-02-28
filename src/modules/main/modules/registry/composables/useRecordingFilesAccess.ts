import { WtObject } from '@webitel/ui-sdk/enums';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';

export const useRecordingFilesAccess = () => {
	const { hasDeleteAccess } = useUserAccessControl(WtObject.RecordFile);

	return {
		hasDeleteAccess,
	};
};
