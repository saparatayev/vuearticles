import { createWebHistory, createRouter } from "vue-router";
import Signin from './components/Signin.vue'
import Signup from './components/Signup.vue'
import Secure from './components/Secure.vue'
import Home from './components/Home';
import About from './components/About';
import Articles from './components/Articles';
import Articlesvuex from './components/Articlesvuex';


let router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/signin',
            name: 'signin',
            component: Signin
        },
        {
            path: '/signup',
            name: 'signup',
            component: Signup
        },
        {
            path: '/secure',
            name: 'secure',
            component: Secure,
            meta: { 
              requiresAuth: true
            }
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/articles',
            name: 'articles',
            component: Articles
        },
        {
            path: '/articlesvuex',
            name: 'articlesvuex',
            component: Articlesvuex
        }
    ]
});

export default router;