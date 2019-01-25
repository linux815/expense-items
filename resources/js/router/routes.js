const Home = () => import('~/pages/home').then(m => m.default || m)
const Categories = () => import('~/pages/category').then(m => m.default || m)
const CategoryUpdate = () => import('~/pages/category/update').then(m => m.default || m)
const Expenses = () => import('~/pages/expense').then(m => m.default || m)
const ExpenseUpdate = () => import('~/pages/expense/update').then(m => m.default || m)
const ExpenseAnalysis = () => import('~/pages/expense/analysis').then(m => m.default || m)

export default [
    {path: '/', name: 'home', component: Home},
    {
        path: '/categories', component: {template: '<router-view/>'}, children: [
            {
                path: '', component: Categories, name: 'categories'
            },
            {
                path: ':id/update', name: 'category.update', component: CategoryUpdate,
            },
            {
                path: '/create', name: 'category.createCategory', component: CategoryUpdate,
            },
        ]
    },
    {

        path: '/expenses', component: {template: '<router-view/>'}, children: [
            {
                path: '', component: Expenses, name: 'expenses'
            },
            {
                path: ':id/update', name: 'expense.update', component: ExpenseUpdate,
            },
            {
                path: 'create', name: 'expense.createExpense', component: ExpenseUpdate,
            },
            {
                path: 'analysis', name: 'expense.analysisExpense', component: ExpenseAnalysis,
            },
        ]
    },
    {path: '*', component: require('~/pages/errors/404.vue')},
    {path: '/404', name: 'not_found', component: require('~/pages/errors/404.vue')},

]
