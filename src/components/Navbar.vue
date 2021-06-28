<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-info mb-2">
            <div class="container-fluid">
                <ul class="nav">
                    <li class="nav-item">
                        <router-link tag="a" :to="`/`" class="navbar-brand">Restfulapi</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link tag="a" :to="`/about`" class="nav-link text-light">{{ $t('about') }}</router-link>
                    </li>
                    <!-- <li class="nav-item">
                        <router-link tag="a" :to="`/${$i18n.locale}/articles`" class="nav-link text-light">{{ $t('articles') }}</router-link>
                    </li> -->
                    <li class="nav-item">
                        <router-link tag="a" :to="`/articlesvuex`" class="nav-link text-light">{{ $t('articles_vuex') }}</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link tag="a" :to="`/secure`" class="nav-link text-light">{{ $t('secure') }}</router-link>
                    </li>
                    <template v-if="!isLoggedIn">
                        <li class="nav-item">
                            <router-link tag="a" :to="`/signup`" class="nav-link text-light">{{ $t('signup.signup') }}</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link tag="a" :to="`/signin`" class="nav-link text-light">{{ $t('signin.signin') }}</router-link>
                        </li>
                    </template>
                    <template v-else>
                        <li class="nav-item">
                            <a href="#" @click.prevent="onLogout" class="nav-link text-light">{{ $t('logout') }}</a>
                        </li>
                        <li class="nav-item">
                            <span class="nav-link text-light">{{username}}</span>
                        </li>
                    </template>
                    <select @change="onLocaleChanged($i18n.locale)" v-model="$i18n.locale" class="mx-2 bg-info text-light border border-light rounded">
                        <option v-for="(lang, i) in $i18n.availableLocales" :key="`Lang${i}`" :value="lang" class="bg-light text-dark">{{ lang }}</option>
                    </select>
                </ul>
            </div>
        </nav>
</template>

<script>
export default {
    
    computed : {
        isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
        username: function() { return this.$store.getters.username}
    },
    methods: {
        onLocaleChanged (lng) {
            this.$router.push({params:{lang: lng}})
        },
        onLogout () {
        this.$store.dispatch('logout')
            .then(() => {
            this.$router.push({name:'signin'})
            })
        }
    },
    created () {
        this.$http.interceptors.response.use(undefined, function (err) {
        return new Promise(function () {
            if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch("logout")
            }
            throw err;
        });
        });
    }
};
</script>