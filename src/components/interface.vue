<template>
    <div class="container">
        <section class="row z-depth-1 white section">
            <div class="center-align" v-if="checked">
                <h2 class="center-align">Cliquez</h2>
                <input class="btn red" type="button" value="Cliquez" @click="change">
            </div>
            <div class="center-align" v-else>
                <h2 class="center-align">WTF ?! Un bouton qui change de couleur !!</h2>
                <input class="btn blue" type="button" value="Revenir" @click="change">
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'changebox',
        data () {
            return {
                checked: true
            }
        },
        methods: {
            change: function () {
                this.checked = !this.checked
            }
        }
    }
</script>
