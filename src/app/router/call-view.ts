import { type RouteRecordRaw } from 'vue-router';

import TheCallView from '../../modules/main/modules/registry/modules/call/components/the-call-view.vue';

const CALL_VIEW_NAME = 'call_view';

const callChildrenRoutes: RouteRecordRaw[] = [
  {
    path: 'call-info',
    name: `${CALL_VIEW_NAME}-call-info`,
    component: () => import('../../modules/main/modules/registry/modules/call/components/call-info/call-info.vue'),
  },
  {
    path: 'legs-a-b',
    name: `${CALL_VIEW_NAME}-legs-a-b`,
    component: () => import('../../modules/main/modules/registry/modules/call/components/call-legs/call-legs.vue'),
  },
  {
    path: 'call-visualization',
    name: `${CALL_VIEW_NAME}-call-visualization`,
    component: () => import('../../modules/main/modules/registry/modules/call/components/call-visualization/call-visualization.vue'),
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
