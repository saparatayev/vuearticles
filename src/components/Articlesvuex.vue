<template>
<div>
    <spinner v-if="loadingContent"></spinner>
    <div v-else class="container">
        <h2>{{ $t('articles') }}</h2>
        <form @submit.prevent="addOrUpdateArticle" class="mb-3" enctype="multipart/form-data">
            <div class="form-group">
                <input required type="text" class="form-control" :placeholder="$t('title')" v-model="article.title">
            </div>
            <div class="form-group">
                <input required type="text" class="form-control" placeholder="title_ru" v-model="article.title_ru">
            </div>
            <div class="form-group">
                <textarea required class="form-control" :placeholder="$t('body')" v-model="article.body"></textarea>
            </div>
            <div class="form-group" v-if="image">
                <img :src="image" class="img-responsive" height="70" width="90">
            </div>
            <div class="form-group">
                <input type="file" name="image" v-on:change="onImageChange" class="form-control" placeholder="image">
            </div>
            <button class="btn btn-info btn-block" type="submit">{{$t('submit')}}</button>
        </form>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li :class="[{disabled: !pagination.prev_page_url}]" class="page-item">
                    <a @click="fetchArticles(pagination.prev_page_url)" class="page-link" href="#">&lt;</a>
                </li>
                <li class="page-item disabled"><a class="page-link" href="#">{{$t('page')}} {{pagination.current_page}} of {{pagination.last_page}}</a></li>
                <li :class="[{disabled: !pagination.next_page_url}]" class="page-item">
                    <a @click="fetchArticles(pagination.next_page_url)" class="page-link" href="#">&gt;</a>
                </li>
            </ul>
        </nav>
        <div class="card card-body mb-2" v-for="article in articles" :key="article.id">
            <div class="row">
                <div class="col-3">
                    <img v-if="article.img" :src="article.img" width="100" alt="">
                    <img v-else src="http://restfulapi/assets/no-image.jpg" width="100" alt="">
                </div>
                <div class="col-9">
                    <h3 v-if="$i18n.locale === 'ru'">{{article.title_ru}}</h3>
                    <h3 v-else>{{article.title}}</h3>
                    <p>{{article.body}}</p>
                </div>
            </div>
            
            
            <hr>
            <button @click="deleteArticle(article.id)" class="btn btn-danger mb-2">{{$t('delete')}}</button>
            <button @click="editArticle(article)" class="btn btn-warning">{{$t('edit')}}</button>
        </div>
    </div>
</div>
    
</template>

<script>
export default {
    computed: {
        articles() {
            return this.$store.getters.getArticles
        },
        loadingContent () {
            return this.$store.getters.setLoadingValue
        }
    },
    data () {
        return {
            article: {
                id: '',
                title: '',
                title_ru: '',
                body: '',
                img: ''
            },
            image: '',
            edit: false,
            pagination: {},
        }
    },
    created () {
        this.fetchArticles()
    },
    methods: {
        onImageChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0]);
            this.article.img = files[0];
        },
        createImage(file) {
            let reader = new FileReader();
            let vm = this;
            reader.onload = (e) => {
                vm.image = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        fetchArticles (page_url) {
            let vm = this;
            
            page_url = page_url || 'http://restfulapi/api/articles'

            this.$store.dispatch('fetchArticles_vuex',page_url)
            .then(res => {
                vm.makePagination(res.current_page,res.last_page,res.next_page_url,res.prev_page_url)
            })
            .catch(err => {
                alert(err)
            })
        },
        makePagination (cur_pg,lst_pg,nxt,prv) {
            let pagination = {
                current_page: cur_pg,
                last_page: lst_pg,
                next_page_url: nxt,
                prev_page_url: prv
            }

            this.pagination = pagination;
        },
        addOrUpdateArticle () {
            if(!this.edit) {
                this.$store.dispatch('addArticle_vuex',this.article)
                .then((res) => {
                    this.article.title = ''
                    this.article.title_ru = ''
                    this.article.body = ''
                    this.article.img = ''
                    this.image = ''

                    if(res) {
                        if(res.status === 401) {
                            alert('Unauthorized logged in but expired token')
                            this.$store.dispatch('logout')
                            .then(() => {
                                this.$router.push({name:'signin'})
                            })
                        }
                        else {
                            alert('Article Added')
                            this.fetchArticles()
                        }
                    }
                })
                .catch(err => alert(err))
            } else {
                this.$store.dispatch('updateArticle_vuex',this.article)
                .then((res) => {
                    this.edit = false
                    this.article.title = ''
                    this.article.title_ru = ''
                    this.article.body = ''
                    this.article.img = ''
                    this.image = ''

                    if(res) {
                        if(res.status === 401) {
                            alert('Unauthorized')
                            this.$store.dispatch('logout')
                            .then(() => {
                                this.$router.push({name:'signin'})
                            })
                        }
                        else {
                            alert('Article Updated')
                            this.fetchArticles()
                        }
                    }
                })
                .catch(err => alert(err))
            }
        },
        editArticle(article) {
            this.edit = true;
            this.article.id = article.id;
            this.article.article_id = article.id;
            this.article.title = article.title;
            this.article.title_ru = article.title_ru;
            this.article.body = article.body;
            this.article.img = article.img;
            this.image = article.img;
        },
        deleteArticle (id) {
            this.$store.dispatch('deleteArticle_vuex',id)
            .then((res)=> {
                if(res) {
                    if(res.status === 401) {
                        alert('Unauthorized')
                        this.$store.dispatch('logout')
                        .then(() => {
                            this.$router.push('signin')
                        })
                    }
                    else {
                        alert('Article deleted')
                        this.fetchArticles()
                    }
                }
            })
            .catch(err => alert(err))
        }
    }
}
</script>