<template>
    <div class="row">
        <div class="col s3">
            <img class="responsive-img" src="../assets/images/logo.png">
        </div>
        <div class="col s6 offset-s1">
            <h1>{{ msg }}</h1>
            <navbar></navbar>
        </div>
    </div>
</template>

<script>
    // Import navbar component
    import navbar from './navbar'

    export default {
        name: 'index',
        components: {
            navbar
        },
        data () {
            return {
                msg: 'Arcade'
            }
        }
    }
</script>
