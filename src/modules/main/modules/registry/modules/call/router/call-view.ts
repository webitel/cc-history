import { type RouteRecordRaw } from 'vue-router';

const TheCallView = () => import('../components/the-call-view.vue');
const CallInfo = () => import('../components/call-info/call-info.vue');
const CallLegs = () => import('../components/call-legs/call-legs.vue');
const CallVisualization = () => import('../components/call-visualization/call-visualization.vue');

const CALL_VIEW_NAME = 'call_view';

const callChildrenRoutes: RouteRecordRaw[] = [
  {
    path: 'call-info',
    name: `${CALL_VIEW_NAME}-call-info`,
    component: CallInfo,
  },
  {
    path: 'legs-a-b',
    name: `${CALL_VIEW_NAME}-legs-a-b`,
    component: CallLegs,
  },
  {
    path: 'call-visualization',
    name: `${CALL_VIEW_NAME}-call-visualization`,
    component: CallVisualization,
  },
];

const callViewRoute: RouteRecordRaw[] = [
  {
    path: `/view/${CALL_VIEW_NAME}/:pathMatch(.*)`,
    name: CALL_VIEW_NAME,
    component: TheCallView,
    redirect: { name: `${CALL_VIEW_NAME}-call-info` },
    children: callChildrenRoutes,
  },
];

export default callViewRoute;
