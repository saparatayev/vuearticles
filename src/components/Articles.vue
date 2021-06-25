<template>
<div>
    <spinner v-if="loadingContent"></spinner>
    <div v-else class="container">
        <h2>{{ $t('articles') }}</h2>
        <form @submit.prevent="addArticle" class="mb-3">
            <div class="form-group">
                <input required type="text" class="form-control" :placeholder="$t('title')" v-model="article.title">
            </div>
            <div class="form-group">
                <textarea required class="form-control" :placeholder="$t('body')" v-model="article.body"></textarea>
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
            <h3>{{article.title}}</h3>
            <p>{{article.body}}</p>
            <hr>
            <button @click="deleteArticle(article.id)" class="btn btn-danger mb-2">{{$t('delete')}}</button>
            <button @click="editArticle(article)" class="btn btn-warning">{{$t('edit')}}</button>
        </div>
    </div>
</div>
    
</template>

<script>
export default {
    data () {
        return {
            articles: [],
            article: {
                id: '',
                title: '',
                body: ''
            },
            pagination: {},
            edit: false,
            loadingContent: true
        }
    },
    created () {
        this.fetchArticles();
    },
    methods: {
        fetchArticles (page_url) {
            let vm = this;
            page_url = page_url || 'http://restfulapi/api/articles'
            fetch(page_url)
                .then(res => res.json())
                .then(res => {
                    this.articles = res.data
                    vm.makePagination(res.current_page,res.last_page,res.next_page_url,res.prev_page_url);
                })
                .then(() => this.loadingContent = false)
                .catch(err => console.log(err));
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
        deleteArticle(id) {
            const token = localStorage.getItem('token');

            if(!token) {
                this.$router.push('/signin')
            }
            if(confirm('Are you sure?')) {
                fetch(`api/articles/${id}?token=${token}`,{
                    method:'delete'
                })
                .then(res => res.json())
                .then(() => {
                    alert('Article removed');
                    this.fetchArticles();
                })
                .catch(err => console.log(err))
            }
        },
        addArticle() {
            const token = localStorage.getItem('token');
            if(this.edit === false) {
                if(!token) {
                    this.$router.push('/signin')
                }
                //add
                fetch(`api/articles?token=${token}`,{
                    method: 'post',
                    body: JSON.stringify(this.article),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(() => {
                        this.article.title = '';
                        this.article.body = '';
                        alert('Article Added');
                        this.fetchArticles();
                    })
                    .catch(err => console.log(err))
            } else {
                if(!token) {
                    this.$router.push('/signin')
                }
                //update
                fetch(`api/articles/${this.article.id}?token=${token}`,{
                    method: 'put',
                    body: JSON.stringify(this.article),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(() => {
                        this.article.title = '';
                        this.article.body = '';
                        alert('Article Updated');
                        this.fetchArticles();
                        this.edit = false;
                    })
                    .catch(err => console.log(err))
            }
        },
        editArticle(article) {
            this.edit = true;
            this.article.id = article.id;
            this.article.article_id = article.id;
            this.article.title = article.title;
            this.article.body = article.body;
        }
    }
}
</script>