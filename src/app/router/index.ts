import { createRouter, createWebHistory } from "vue-router";

import AccessDenied from "../components/shared/access-denied-component.vue";
import { checkAppAccess } from "./_internals/guards";
import Call from "../../modules/main/modules/registry/modules/call/components/the-call.vue";
import HistoryMainPage from "../components/history-main-page.vue";
import History from "../components/the-history.vue";
import CallTabsPathNames from "./_internals/CallTabsPathNames.enum.js";
import callViewRoute from "../../modules/main/modules/registry/modules/call/router/call-view.ts";
const CallInfo = import(
	"../../modules/main/modules/registry/modules/call/components/call-info/call-info.vue"
);
const CallLegs = import(
	"../../modules/main/modules/registry/modules/call/components/call-legs/call-legs.vue"
);
const CallVisualization = import(
	"../../modules/main/modules/registry/modules/call/components/call-visualization/call-visualization.vue"
);
const VideoCallRecording = import(
	"../../modules/main/modules/registry/modules/call/components/video-call-recording/video-call-recording.vue"
);

const routes = [
	{
		path: "/",
		component: History,
		beforeEnter: checkAppAccess,
		children: [
			{
				path: "/",
				name: "history",
				component: HistoryMainPage,
			},
			{
				path: "/:pathMatch(.*)",
				name: "call",
				redirect: { name: CallTabsPathNames.CALL_INFO },
				component: Call,
				children: [
					{
						path: "call-info",
						name: CallTabsPathNames.CALL_INFO,
						component: CallInfo,
					},
					{
						path: "legs-a-b",
						name: CallTabsPathNames.LEGS_A_B,
						component: CallLegs,
					},
					{
						path: "call-visualization",
						name: CallTabsPathNames.CALL_VISUALIZATION,
						component: CallVisualization,
					},
					{
						path: "video-call-recording",
						name: CallTabsPathNames.VIDEO_CALL_RECORDING,
						component: VideoCallRecording,
					},
				],
			},
		],
	},

	{
		path: "/access-denied",
		name: "access-denied",
		component: AccessDenied,
	},
	...callViewRoute,
	{
		path: "/:pathMatch(.*)*",
		name: "not-found",
		// component: notFound
	},
];

export let router = null;

export const initRouter = async ({ beforeEach = [] } = {}) => {
	router = createRouter({
		history: createWebHistory(import.meta.env.BASE_URL),

		scrollBehavior(to, from, savedPosition) {
			return {
				left: 0,
				top: 0,
			};
		},
		routes,
	});

	router.beforeEach((to, from, next) => {
		if (!localStorage.getItem("access-token") && !to.query.accessToken) {
			const desiredUrl = encodeURIComponent(window.location.href);
			const authUrl = import.meta.env.VITE_AUTH_URL;
			window.location.href = `${authUrl}?redirectTo=${desiredUrl}`;
		} else if (to.query.accessToken) {
			// assume that access token was set from query before app initialization in main.js
			const newQuery = { ...to.query };
			delete newQuery.accessToken;
			next({ ...to, query: newQuery });
		} else {
			next();
		}
	});

	beforeEach.forEach((guard) => {
		router.beforeEach(guard);
	});

	return router;
};
