<template>
    <form @submit.prevent="signin" class="container">
        <div 
            v-if="invalidCredentials"
            class="alert alert-danger" 
            role="alert"
        >
            Invalid Credentials
        </div>
        <div class="from-group">
            <label for="email">Mail</label>
            <input 
                type="email" 
                id="email" 
                name="email" 
                class="form-control"
                v-model="email"
                required
            >
        </div>
        <div class="from-group">
            <label for="password">{{$t('password')}}</label>
            <input 
                type="password" 
                id="password" 
                name="password" 
                class="form-control"
                v-model="password"
                required
            >
        </div>
        <button type="submit" class="btn btn-primary mt-3">{{$t('signin.signin')}}</button>
    </form>
</template>

<script>
export default {
    data () {
        return {
            email:'',
            password:'',
            invalidCredentials: false
        }
    },
    methods: {
        signin () {
            let email = this.email 
            let password = this.password

            this.$store.dispatch('login', { email, password })
                .then(() => this.$router.push('/'))
                .catch(err => {
                    console.log(err)
                    this.invalidCredentials = true
                })
        }
    }
}
</script>