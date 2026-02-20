import { computed } from 'vue';
import { SpecialGlobalAction } from '@webitel/ui-sdk/modules/Userinfo';
import { WtObject } from '@webitel/ui-sdk/enums';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import { useUserinfoStore } from '../../../../userinfo/stores/userinfoStore';

export const useRecordingsAccess = () => {
	const userinfoStore = useUserinfoStore();
	const { hasSpecialGlobalActionAccess } = userinfoStore;

	const {
		hasReadAccess: hasRecordingsObjectReadAccess,
		hasDeleteAccess: hasRecordingsDeleteAccess,
	} = useUserAccessControl(WtObject.RecordFile);

	const hasRecordingsReadAccess = computed(() => {
		return (
			hasSpecialGlobalActionAccess(SpecialGlobalAction.PlaybackRecordFile) ||
			hasSpecialGlobalActionAccess(SpecialGlobalAction.TimeLimitedRecordFile) ||
			hasRecordingsObjectReadAccess.value
		);
	});

	return {
		hasRecordingsReadAccess,
		hasRecordingsDeleteAccess,
	};
};
