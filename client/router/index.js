import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/Home'
import PreExpired from 'views/PreExpired'
import PreExpiredList from 'views/PreExpiredList'
import DiscountBills from 'views/DiscountBills'
import Login from 'views/Login'
import { loggedIn } from 'common/js/auth'
Vue.use(Router)
let router = new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: { requiresAuth: true }
        },
        {
            path: '/pre_expired',
            component: PreExpired,
            name: 'PreExpired',
            meta: { requiresAuth: true }
        },
        {
            path: '/pre_expired_list',
            component: PreExpiredList,
            name: 'PreExpiredList',
            meta: { requiresAuth: true }
        },
        {
            path: '/discount-bills',
            component: DiscountBills,
            name: 'DiscountBills',
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]
})
// 验证登录状态
router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!loggedIn()) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
})
export default router
