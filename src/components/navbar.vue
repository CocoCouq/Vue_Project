<template>
    <nav>
        <div class="nav-wrapper">
            <ul class="row">
                <!-- for each navbar btn -->
                <li
                        class="green lighten-2 col s3"
                        v-for="btnN in btnsNavbar"
                        v-bind:key="btnN.id"
                >
                    <i class="material-icons" v-on:click="btnN.actionBtn">{{btnN.icon}}</i>
                </li>
                <!-- FIRST GAME (pong) -->
                <li class="blue-grey darken-2 col s6" @click="pokeFunction">
                    <img
                            id="pokeCatcher"
                            class="responsive-img"
                            src="../assets/images/pokecatcher.png"
                            alt="PokeCatcher"
                    >
                </li>
                <!-- SECOND GAME (snake) -->
                <li class="blue-grey darken-2 col s6" @click="runnerFunction">
                    <img
                            id="pokeRunner"
                            class="responsive-img"
                            src="../assets/images/pokeSnake.png"
                            alt="PokeCatcher"
                    >
                </li>
                <!-- Other project : https://github.com/CocoCouq/axios_Vue_CRUD -->
                <li id="CRUD" class="blue col s12"><a href="http://localhost:8888/Zone/Vue_CRUD/">CRUD</a></li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'navbar',
        data () {
            return {
                btnsNavbar: [
                    {id: 1, icon: 'add', actionBtn: this.addFunction},
                    {id: 2, icon: 'golf_course', actionBtn: this.magFunction},
                    {id: 3, icon: 'keyboard', actionBtn: this.calFunction},
                    {id: 4, icon: 'feedback', actionBtn: this.intFunction}
                ]
            }
        },
        methods: {
            addFunction: function () {
                // Toggle boolean
                this.$parent.$parent.appAdd ^= true
                this.$parent.$parent.appMag = false
                this.$parent.$parent.appCal = false
                this.$parent.$parent.appInt = false
                // Use materialize class for hide canvas
                if (this.$parent.$parent.pokecatcher) {
                    document.getElementById('poke_catcher').classList.add('hide')
                    this.$parent.$parent.pokecatcher = false
                }
                if (this.$parent.$parent.pokerunner) {
                    document.getElementById('poke_runner').classList.add('hide')
                    this.$parent.$parent.pokerunner = false
                }
            },
            magFunction: function () {
                this.$parent.$parent.appMag ^= true
                this.$parent.$parent.appAdd = false
                this.$parent.$parent.appInt = false
                this.$parent.$parent.appCal = false
                if (this.$parent.$parent.pokecatcher) {
                    document.getElementById('poke_catcher').classList.add('hide')
                    this.$parent.$parent.pokecatcher = false
                }
                if (this.$parent.$parent.pokerunner) {
                    document.getElementById('poke_runner').classList.add('hide')
                    this.$parent.$parent.pokerunner = false
                }
            },
            calFunction: function () {
                this.$parent.$parent.appCal ^= true
                this.$parent.$parent.appAdd = false
                this.$parent.$parent.appMag = false
                this.$parent.$parent.appInt = false
                if (this.$parent.$parent.pokecatcher) {
                    document.getElementById('poke_catcher').classList.add('hide')
                    this.$parent.$parent.pokecatcher = false
                }
                if (this.$parent.$parent.pokerunner) {
                    document.getElementById('poke_runner').classList.add('hide')
                    this.$parent.$parent.pokerunner = false
                }
            },
            intFunction: function () {
                this.$parent.$parent.appInt ^= true
                this.$parent.$parent.appAdd = false
                this.$parent.$parent.appMag = false
                this.$parent.$parent.appCal = false
                if (this.$parent.$parent.pokecatcher) {
                    document.getElementById('poke_catcher').classList.add('hide')
                    this.$parent.$parent.pokecatcher = false
                }
                if (this.$parent.$parent.pokerunner) {
                    document.getElementById('poke_runner').classList.add('hide')
                    this.$parent.$parent.pokerunner = false
                }
            }
            ,
            pokeFunction: function () {
                this.$parent.$parent.appInt = false
                this.$parent.$parent.appAdd = false
                this.$parent.$parent.appMag = false
                this.$parent.$parent.appCal = false
                if (this.$parent.$parent.pokecatcher === false) {
                    document.getElementById('poke_catcher').classList.remove('hide')
                    document.getElementById('poke_runner').classList.add('hide')
                    this.$parent.$parent.pokecatcher = true
                    this.$parent.$parent.pokerunner = false
                }
                else {
                    document.getElementById('poke_catcher').classList.add('hide')
                    this.$parent.$parent.pokecatcher = false
                }

            },

            runnerFunction: function () {
                this.$parent.$parent.appInt = false
                this.$parent.$parent.appAdd = false
                this.$parent.$parent.appMag = false
                this.$parent.$parent.appCal = false
                if (this.$parent.$parent.pokerunner === false) {
                    document.getElementById('poke_runner').classList.remove('hide')
                    document.getElementById('poke_catcher').classList.add('hide')
                    this.$parent.$parent.pokerunner = true
                    this.$parent.$parent.pokecatcher = false
                }
                else {
                    document.getElementById('poke_runner').classList.add('hide')
                    this.$parent.$parent.pokerunner = false
                }

            }
        }
    }
</script>

<style>
    nav{
        cursor: pointer;
    }
    #pokeCatcher, #pokeRunner{
        margin-top: 10px;
    }
    #CRUD{
        font-family: Impact, sans-serif;
    }
</style>
