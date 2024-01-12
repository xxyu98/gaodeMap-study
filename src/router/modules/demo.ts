const demo: AuthRoute.Route = {
	name: 'demo',
	path: '/demo',
	component: 'basic',
	meta: {
		title: 'demo',
		icon: 'mdi:magic',
		i18nTitle: 'routes.demo._value'
	},
	children: [
		{
			name: 'demo_dominantColor',
			path: '/demo/dominantColor',
			component: 'self',
			meta: {
				title:
					'demo_dominantColor',
				icon: 'fluent:color-16-filled',
				i18nTitle: 'routes.demo.dominantColor'
			}
		},
		{
			name: 'demo_magicGrid',
			path: '/demo/magicGrid',
			component: 'self',
			meta: {
				title:
					'demo_magicGrid',
				icon: 'ep:grid',
				i18nTitle: 'routes.demo.magicGrid'
			}
		}
	]
};

export default demo;
