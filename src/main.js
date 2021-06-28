import { createApp } from 'vue'
import App from './App.vue'
import Navbar from './components/Navbar.vue'
import Spinner from './components/Spinner.vue'
import i18n from './i18n'
import store from './store/store.js'
import Axios from 'axios'
import router from './routes';

const app = createApp(App).use(i18n).use(store).use(router)

app.component('navbar', Navbar);
app.component('spinner', Spinner);

router.beforeEach((to,from,next) => {
    let language = to.params.lang;
    
    if(!language) {
      language = 'en'
    }
  
    i18n.locale = language
  
    next()
})



app.config.globalProperties.$http= Axios

const token = localStorage.getItem('token')
if (token) {
    app.config.globalProperties.$http.defaults.headers.common['Authorization'] = token
}


app.mount('#app')
