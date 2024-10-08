import { config } from '@vue/test-utils';
import axiosMock from '@webitel/ui-sdk/src/tests/mocks/axiosMock.js'; // import instance from '../../src/app/api/instance.js';
import i18n from '../../src/app/locale/i18n';
import WebitelUi from '../../src/app/plugins/webitel-ui';

config.global.plugins = [WebitelUi, i18n];

const request = vi.fn(() => Promise.resolve({ data: {} }));
const axios = axiosMock({ default: { request } });
vi.doMock('@webitel/ui-sdk/src/api/axios/generateInstance.js', () => ({ default: () => axios().default }));

beforeEach(() => {
  request.mockClear();
});

