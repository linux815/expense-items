const Home = () => import('~/pages/home').then(m => m.default || m)
const Categories = () => import('~/pages/category').then(m => m.default || m)

export default [
    {path: '/', name: 'home', component: Home},
    {
        path: '/categories', component: {template: '<router-view/>'}, children: [
            {
                path: '', component: Categories, name: 'categories'
            },
        ]
    },
    {path: '*', component: require('~/pages/errors/404.vue')},
    {path: '/404', name: 'not_found', component: require('~/pages/errors/404.vue')},

]
