import Vue from 'vue'
import Vuex from 'vuex'

import user from './user.js'
import articles from './articles.js'
import secure from './secure.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    articles,
    secure
  }
})