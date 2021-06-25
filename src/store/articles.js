import Router from '../routes';

export default {
    state: {
        articles_vuex: [],
        loadingContent_vuex: true
    },
    mutations: {
        loadingvuex (state,boolValue) {
            state.loadingContent_vuex = boolValue
        },
        setArticles (state,loadedArticles) {
            state.articles_vuex = loadedArticles.data
        }
    },
    actions: {
        fetchArticles_vuex ({commit},page_url) {
            
            commit('loadingvuex', true)

            return new Promise((resolve, reject) => {
                fetch(page_url)
                .then(res => res.json())
                .then(res => {
                    
                    commit('setArticles',res)
                    commit('loadingvuex', false)

                    resolve(res)
                })
                .catch(err => reject(err))
            })
        },
        addArticle_vuex ({commit},newArticle) {
            commit('loadingvuex', true)

            const token = localStorage.getItem('token');
            
            if(!token) {
                alert('Unauthorized')
                Router.push({name:'signin'})
            } else {
                return new Promise((resolve,reject) => {
                    // fetch(`http://restfulapi/api/articles?token=${token}`,{
                    //     method: 'post',
                    //     body: JSON.stringify(newArticle),
                    //     headers: {
                    //         'content-type': 'application/json'
                    //     }
                    // })
                    const formData = new FormData();
                    formData.append('id', newArticle.id);
                    formData.append('title', newArticle.title);
                    formData.append('title_ru', newArticle.title_ru);
                    formData.append('body', newArticle.body);
                    formData.append('image', newArticle.img);

                    fetch(`http://restfulapi/api/articles?token=${token}`,{
                        method: 'post',
                        body: formData
                    })

                    .then((res) => {
                        commit('loadingvuex', false)

                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
                })
            }
        },
        updateArticle_vuex ({commit},newArticle) {
            commit('loadingvuex', true)

            const token = localStorage.getItem('token');
            
            if(!token) {
                alert('Unauthorized')
                Router.push({name:'signin'})
            } else {
                return new Promise((resolve,reject) => {
                    // fetch(`http://restfulapi/api/articles/${newArticle.id}?token=${token}`,{
                    //     method: 'put',
                    //     body: JSON.stringify(newArticle),
                    //     headers: {
                    //         'content-type': 'application/json'
                    //     }
                    // })
                    const formData = new FormData();
                    formData.append('id', newArticle.id);
                    formData.append('title', newArticle.title);
                    formData.append('title_ru', newArticle.title_ru);
                    formData.append('body', newArticle.body);
                    formData.append('image', newArticle.img);
                    formData.append('_method', 'PUT');

                    fetch(`http://restfulapi/api/articles/${newArticle.id}?token=${token}`,{
                        method: 'post',
                        body: formData
                    })
                    .then((res) => {
                        commit('loadingvuex', false)

                        resolve(res)
                    })
                    .catch(err => reject(err))
                })
            }
        },
        deleteArticle_vuex ({commit},id) {
            commit('loadingvuex', true)

            const token = localStorage.getItem('token');
            
            if(!token) {
                alert('Unauthorized')
                Router.push({name:'signin'})
            } else {
                if(confirm('Are you sure?')) {
                    return new Promise((resolve,reject) => {
                        fetch(`http://restfulapi/api/articles/${id}?token=${token}`,{
                            method:'delete'
                        })
                        .then((res) => {
                            commit('loadingvuex', false)

                            resolve(res)
                        })
                        .catch(err => reject(err))
                    })
                }
            }
        }
    },
    getters: {
        getArticles: state => state.articles_vuex,
        setLoadingValue: state => state.loadingContent_vuex
    }
}