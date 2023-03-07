import { config } from '@vue/test-utils';
import WebitelUi from '../../src/app/plugins/webitel-ui';
import en from '../../src/app/locale/en/en';

config.global.mocks.$t = (msg) => en[msg] || msg;
config.global.mocks.$tc = (msg) => en[msg] || msg;
config.global.plugins = [WebitelUi];
