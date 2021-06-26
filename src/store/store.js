import { createStore } from 'vuex'

import user from './user.js'
import articles from './articles.js'
import secure from './secure.js'

export default createStore({
  modules: {
    user,
    articles,
    secure
  }
})