import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/Home'
import Nav from 'components/Nav'
Vue.use(Router)

export default new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            components: {
                default: Home,
                nav: Nav
            }
        }
    ]
})
