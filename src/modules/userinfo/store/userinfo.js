import WebitelApplications from '@webitel/ui-sdk/src/enums/WebitelApplications/WebitelApplications.enum';
import UserinfoStoreModule from '@webitel/ui-sdk/src/modules/Userinfo/store/UserinfoStoreModule';

const state = {
  thisApp: WebitelApplications.HISTORY,
};

const userinfo = new UserinfoStoreModule().getModule({ state });

export default userinfo;
