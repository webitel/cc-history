import './app/assets/icons/sprite';
import './app/css/main.scss';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import { createUserAccessControl } from './app/composables/useUserAccessControl';
import i18n from './app/locale/i18n';
import {
	plugin as WebitelUi,
	options as WebitelUiOptions,
} from './app/plugins/webitel/ui-sdk';
import './app/plugins/webitel-ui-chats.ts';
import { initRouter, router } from './app/router';
import { setTokenFromUrl } from './app/scripts/setTokenFromUrl';
import store from './app/store';
import { useUserinfoStore } from './modules/userinfo/stores/userinfoStore';
import App from './the-app.vue';

const fetchConfig = async () => {
	const response = await fetch(`${import.meta.env.BASE_URL}/config.json`);
	return response.json();
};

const pinia = createPinia();

const initApp = async () => {
	const app = createApp(App).use(store).use(i18n).use(pinia);

	const { initialize, routeAccessGuard, clearStorageNotifications } =
		useUserinfoStore();
	try {
		await initialize();
		createUserAccessControl(useUserinfoStore);
		await initRouter({
			beforeEach: [
				routeAccessGuard,
			],
			onUnauthorized: clearStorageNotifications,
		});
	} catch (err) {
		console.error('Error initializing app', err);
	}

	app.use(router);
	app.use(WebitelUi, {
		...WebitelUiOptions,
		router,
	}); // setup webitel ui after router init

	return app;
};

// init IIFE
(async () => {
	let config: unknown;
	try {
		setTokenFromUrl();
		config = await fetchConfig();
	} catch (err) {
		console.error('before app mount error:', err);
	} finally {
		const app = await initApp();
		app.provide('$config', config);
		app.mount('#app');
	}
})();
