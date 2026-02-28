import { createUserAccessControlComposable } from '@webitel/ui-sdk/modules/Userinfo';

export let useUserAccessControl: ReturnType<
	typeof createUserAccessControlComposable
>;

export const createUserAccessControl = (useUserinfoStore) => {
	useUserAccessControl = createUserAccessControlComposable(useUserinfoStore);
	return useUserAccessControl;
};
