import axios from 'axios'

export default {
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        username: '',
      },
      mutations: {
        auth_request(state){
            state.status = 'loading'
        },
        auth_success(state, data){
            state.status = 'success'
            state.token = data.access_token
            state.username = data.username
        },
        auth_error(state){
            state.status = 'error'
        },
        logout(state){
            state.status = ''
            state.token = ''
            state.username = ''
        },
      },
      actions: {
        login({commit},payload){
            let myPromise = new Promise((resolve, reject) => {
              commit('auth_request')
              axios.post( 'http://restfulapi/api/auth/login',{
                email: payload.email,
                password: payload.password
              }, {headers: {'X-Requested-With':'XMLHttpRequest'}})
              .then(resp => {
                const token = resp.data.access_token.access_token
                
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = token
                
                commit('auth_success', resp.data.access_token)

                resolve(resp)
              })
              .catch(err => {
                commit('auth_error')
                localStorage.removeItem('token')
                reject(err)
              })
            })

            return myPromise
        },
        register({commit}, payload){
            return new Promise((resolve, reject) => {
              commit('auth_request')
              axios.post('http://restfulapi/api/user/signup',{
                name: payload.name,
                email: payload.email,
                password: payload.password,
                password_confirmation: payload.password_confirmation
              }, {headers: {'Content-Type':'application/json'}})
              .then(resp => {
                const token = resp.data.access_token
                
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = token
                commit('auth_success', resp.data)
                resolve(resp)
              })
              .catch(error => {
                commit('auth_error', error)
                localStorage.removeItem('token')
                reject(error)
              })
            })
        },
        logout({commit}){
            return new Promise((resolve) => {
              commit('logout')
              localStorage.removeItem('token')
              delete axios.defaults.headers.common['Authorization']
              resolve()
            })
        }
      },
      getters : {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        username: state => state.username
      }
}