import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: '/eventCal',
        name: 'EventCalendar',
        component: () =>
            import ( /* webpackChunkName: "about" */ '@/components/EventCalendar.vue')
    },
    {
        path: '/calendar',
        name: 'Calendar',
        component: () =>
            import ( /* webpackChunkName: "about" */ '@/components/Calendar.vue')
    },
    {
        path: '/agenda/books/list',
        name: 'book-list',
        component: () =>
            import ( /* webpackChunkName: "about" */ '@/agenda/Books.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router