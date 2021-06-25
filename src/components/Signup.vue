<template>
    <div class="container">
    <form @submit.prevent="signup">
        <div v-if="errorsArr.length > 0">
            <div 
                v-for="error in errorsArr" 
                class="alert alert-danger" 
                role="alert"
                :key="error"
            >
                {{error}}
            </div>
        </div>
        
        <div class="from-group">
            <label for="username">{{$t('signup.username')}}</label>
            <input 
                type="text" 
                id="username" 
                name="username" 
                class="form-control"
                v-model="username"
                required
            >
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
        <div class="from-group">
            <label for="password_confirmation">{{$t('signup.confirmPassword')}}</label>
            <input 
                type="password" 
                id="password_confirmation" 
                name="password_confirmation" 
                class="form-control"
                v-model="password_confirmation"
                required
            >
        </div>
        <button type="submit" class="btn btn-primary mt-3">{{$t('signup.signup')}}</button>
    </form>
    </div>
    
</template>

<script>
export default {
    data () {
        return {
            username:'',
            email:'',
            password:'',
            password_confirmation:'',
            errorsArr: []
        }
    },
    methods: {
        signup () {
            let name = this.username
            let email = this.email
            let password = this.password
            let password_confirmation = this.password_confirmation

            this.$store.dispatch('register', {name,email,password,password_confirmation})
                .then(() => this.$router.push('/'))
                .catch(error => {
                    this.errorsArr = []
                    let errorValidation = error.response.data.errorValidation
                    for (let key in errorValidation) {
                        for(let i=0;i<errorValidation[key].length;i++) {
                            this.errorsArr.push(errorValidation[key][i])
                        }
                    }
                })
        }
    }
}
</script>