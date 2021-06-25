import Vue from 'vue'
import App from './App.vue'
import i18n from './i18n'
import store from './store/store.js'
import Axios from 'axios'
import Routes from './routes';


Vue.prototype.$http = Axios;

const token = localStorage.getItem('token')
if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Routes.beforeEach((to,from,next) => {
    let language = to.params.lang;
    
    if(!language) {
      language = 'en'
    }
  
    i18n.locale = language
  
    next()
})

new Vue({
    store,
    router: Routes,
    i18n,
    render: h => h(App)
}).$mount('#app')
