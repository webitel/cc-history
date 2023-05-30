import { config } from '@vue/test-utils';
import WebitelUi from '../../src/app/plugins/webitel-ui';

config.global.mocks.$t = (msg) => msg;
config.global.mocks.$tc = (msg) => msg;
config.global.plugins = [WebitelUi];
