import { type RouteRecordRaw } from 'vue-router';

import CallInfo from "../components/call-info/call-info.vue";
import CallLegs from "../components/call-legs/call-legs.vue";
import CallVisualization from "../components/call-visualization/call-visualization.vue";
import TheCallView from '../components/the-call-view.vue';

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
