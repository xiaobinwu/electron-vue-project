import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/Home'
import PreExpired from 'views/PreExpired'
import PreExpiredList from 'views/PreExpiredList'
import DiscountBills from 'views/DiscountBills'
import Nav from 'components/Nav'
Vue.use(Router)
const getComponents = function (component) {
    return {
        default: component,
        nav: Nav
    }
}
export default new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            components: getComponents(Home)
        },
        {
            path: '/pre_expired',
            components: getComponents(PreExpired)
        },
        {
            path: '/pre_expired_list',
            components: getComponents(PreExpiredList)
        },
        {
            path: '/discount-bills',
            components: getComponents(DiscountBills)
        }
    ]
})
