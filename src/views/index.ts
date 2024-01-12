import type { RouteComponent } from 'vue-router';

export const views: Record<
  PageRoute.LastDegreeRouteKey,
  RouteComponent | (() => Promise<{ default: RouteComponent }>)
> = {
  403: () => import('./_builtin/403/index.vue'),
  404: () => import('./_builtin/404/index.vue'),
  500: () => import('./_builtin/500/index.vue'),
  'constant-page': () => import('./_builtin/constant-page/index.vue'),
  login: () => import('./_builtin/login/index.vue'),
  'not-found': () => import('./_builtin/not-found/index.vue'),
  demo_dominantColor: () => import('./demo/dominantColor/index.vue'),
  demo_magicGrid: () => import('./demo/magicGrid/index.vue'),
  gaode_map1: () => import('./gaode/map1/index.vue'),
  gaode_map2: () => import('./gaode/map2/index.vue')
};
