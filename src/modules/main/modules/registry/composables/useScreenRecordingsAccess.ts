import { WtObject } from '@webitel/ui-sdk/enums';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';

export const useScreenRecordingsAccess = () => {
	const { hasReadAccess, hasDeleteAccess } = useUserAccessControl(
		WtObject.ScreenRecordings,
	);

	return {
		hasReadAccess,
		hasDeleteAccess,
	};
};
