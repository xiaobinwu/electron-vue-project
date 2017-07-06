import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/Home'
import PreExpired from 'views/PreExpired'
import PreExpiredList from 'views/PreExpiredList'
import DiscountBills from 'views/DiscountBills'
import Login from 'views/Login'
import Nav from 'components/Nav'
import { loggedIn } from 'common/plugin/auth'
Vue.use(Router)
const getComponents = function (component) {
    return {
        default: component,
        nav: Nav
    }
}
let router = new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            components: getComponents(Home),
            meta: { requiresAuth: true }
        },
        {
            path: '/pre_expired',
            components: getComponents(PreExpired),
            meta: { requiresAuth: true }
        },
        {
            path: '/pre_expired_list',
            components: getComponents(PreExpiredList),
            meta: { requiresAuth: true }
        },
        {
            path: '/discount-bills',
            components: getComponents(DiscountBills),
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            components: getComponents(Login)
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
