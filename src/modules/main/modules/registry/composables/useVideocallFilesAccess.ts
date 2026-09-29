import { WtObject } from '@webitel/ui-sdk/enums';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';

export const useVideocallFilesAccess = () => {
	const { hasReadAccess, hasDeleteAccess } = useUserAccessControl(
		WtObject.VideocallFiles,
	);

	return {
		hasReadAccess,
		hasDeleteAccess,
	};
};
