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
        path: '/agenda/books/list',
        name: 'book-list',
        component: () =>
            import ( /* webpackChunkName: "about" */ '@/agenda/Books.vue')
    }
]

/* router.beforeEach((to,from,next)=>{
    if(to.path ==="/login" && auth.currentUser)
}) */

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router