const Home = () => import('~/pages/home').then(m => m.default || m)

export default [
    {path: '/', name: 'home', component: Home},
    // {
    //     path: '/settings', component: Settings, children: [
    //         {path: '', redirect: {name: 'settings.profile'}},
    //         {path: 'profile', name: 'settings.profile', component: SettingsProfile},
    //         {path: 'password', name: 'settings.password', component: SettingsPassword}
    //     ]
    // },
    //
    {path: '*', component: require('~/pages/errors/404.vue')}
]
