import { createTestingPinia } from '@pinia/testing';
import { config } from '@vue/test-utils';
import i18n from '../../src/app/locale/i18n';
import WebitelUi from '../../src/app/plugins/webitel/ui-sdk';

config.global.plugins = [
	WebitelUi,
	i18n,
	createTestingPinia({
		createSpy: vi.fn,
		stubActions: false,
	}),
];
