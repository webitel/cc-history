import { config } from '@vue/test-utils';
import axiosMock from '@webitel/ui-sdk/src/tests/mocks/axiosMock.js'; // import instance from '../../src/app/api/instance.js';
import WebitelUi from '../../src/app/plugins/webitel-ui';
import i18n from '../../src/app/locale/i18n';
config.global.plugins = [WebitelUi, i18n];

vi.doMock('../../src/app/api/instance', axiosMock());

