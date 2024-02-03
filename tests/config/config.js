import { config } from '@vue/test-utils';
import WebitelUi from '../../src/app/plugins/webitel-ui';
import i18n from '../../src/app/locale/i18n';

config.global.plugins = [WebitelUi, i18n];

vi.mock('axios', () => {
  return {
    default: {
      post: vi.fn(() => Promise.resolve({ data: {}})),
      get: vi.fn(() => Promise.resolve({ data: {}})),
      delete: vi.fn(() => Promise.resolve({ data: {}})),
      put: vi.fn(() => Promise.resolve({ data: {}})),
      patch: vi.fn(() => Promise.resolve({ data: {}})),
      request: vi.fn(() => Promise.resolve({ data: {}})),
      create: vi.fn().mockReturnThis(),
      interceptors: {
        request: {
          use: vi.fn(), eject: vi.fn(),
        }, response: {
          use: vi.fn(), eject: vi.fn(),
        },
      },
    },
  };
});

