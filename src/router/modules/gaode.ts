const gaode: AuthRoute.Route = {
  name: 'gaode',
  path: '/gaode',
  component: 'basic',
  meta: { title: 'gaode', icon: 'mdi:menu' },
  children: [
    { name: 'gaode_map1', path: '/gaode/map1', component: 'self', meta: { title: 'gaode_map1', icon: 'mdi:menu' } },
    { name: 'gaode_map2', path: '/gaode/map2', component: 'self', meta: { title: 'gaode_map2', icon: 'mdi:menu' } }
  ]
};

export default gaode;
