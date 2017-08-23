import Vue from 'vue'
import Router from 'vue-router'
import { loggedIn } from 'common/js/auth'
Vue.use(Router)

const Home = resolve => require(['views/Home.vue'], resolve)
const PreExpired = resolve => require(['views/PreExpired.vue'], resolve)
const PreExpiredList = resolve => require(['views/PreExpiredList.vue'], resolve)
const DiscountBills = resolve => require(['views/DiscountBills.vue'], resolve)
const BillDetails = resolve => require(['views/BillDetails.vue'], resolve)
const Advisory = resolve => require(['views/Advisory.vue'], resolve)
const Login = resolve => require(['views/Login.vue'], resolve)

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
            path: '/bill-details',
            component: BillDetails,
            name: 'BillDetails',
            meta: { requiresAuth: true }
        },
        {
            path: '/advisory',
            component: Advisory,
            name: 'Advisory',
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
