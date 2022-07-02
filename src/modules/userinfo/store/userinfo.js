import UserinfoStoreModule from '@webitel/ui-sdk/src/modules/Userinfo/store/UserinfoStoreModule';
import WebitelApplications from '@webitel/ui-sdk/src/enums/WebitelApplications/WebitelApplications.enum';

// register api's
import authAPI from '@webitel/ui-sdk/src/modules/Userinfo/api/auth';
import userinfoAPI from '@webitel/ui-sdk/src/modules/Userinfo/api/userinfo';
import instance from '../../../app/api/instance';

authAPI.setInstance(instance);
userinfoAPI.setInstance(instance);

const state = {
  thisApp: WebitelApplications.HISTORY,
};

const userinfo = new UserinfoStoreModule().getModule({ state });

export default userinfo;
