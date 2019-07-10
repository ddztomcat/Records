const routes = [
    {
        path: '/chapter01',
        component: () => import('./views/chapter.vue')
    },
    {
        path: '/chapter02',
        component: () => import('./views/chapter.1.vue')
    },
    {
        path: '/chapter03',
        component: () => import('./views/chapter.2.vue')
    },
    {
        path: '/chapter04',
        component: () => import('./views/chapter.3.vue')
    },
    {
        path: '/chapter05',
        component: () => import('./views/chapter.4.vue')
    },
    {
        path: '/chapter06',
        component: () => import('./views/chapter.5.vue')
    },
    {
        path: '/chapter07',
        component: () => import('./views/chapter.6.vue')
    },
    {
        path: '',
        redirect: { path: '/chapter01' }
    }]

export default routes