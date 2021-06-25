<template>
<div class="container">
    <h1>{{info}}</h1>
</div>
</template>

<script>
export default {
    data () {
        return {
            info: ''
        }
    },
    created () {
        this.$store.dispatch('getSecure')
        .then(res => {
            if(res !== 401) this.info = res.info
            else {
                alert('Unauthorized')
                this.$store.dispatch('logout')
                .then(() => {
                    this.$router.push({name:'signin'})
                })
            }
        })
        .catch(err => console.log(err))
    }   
}
</script>