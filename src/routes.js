import { createWebHistory, createRouter } from "vue-router";
import store from './store/store.js'
import Signin from './components/Signin.vue'
import Signup from './components/Signup.vue'
import Secure from './components/Secure.vue'
import Home from './components/Home';
import About from './components/About';
import Articles from './components/Articles';
import Articlesvuex from './components/Articlesvuex';
import i18n from './i18n.js'


let router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '',
            redirect: `/${i18n.locale}`
        },
        {
            path:'/:pathMatch(.*)*',
            redirect: `/${i18n.locale}`
        },
        {
            path:'/:pathMatch(.*)',
            redirect: `/${i18n.locale}`
        },
        {
            path: '/:lang',
            component: {
                render(c) { return c('router-view') }
            },
            children: [
                {
                    path: '',
                    name: 'home',
                    component: Home
                },
                {
                    path: 'signin',
                    name: 'signin',
                    component: Signin
                },
                {
                    path: 'signup',
                    name: 'signup',
                    component: Signup
                },
                {
                    path: 'secure',
                    name: 'secure',
                    component: Secure,
                    meta: { 
                      requiresAuth: true
                    }
                },
                {
                    path: 'about',
                    name: 'about',
                    component: About
                },
                {
                    path: 'articles',
                    name: 'articles',
                    component: Articles
                },
                {
                    path: 'articlesvuex',
                    name: 'articlesvuex',
                    component: Articlesvuex
                }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters.isLoggedIn) {
        next()
        return
      }
      next(`/${i18n.locale}/signin`) 
    } else {
      next() 
    }
})

export default router;