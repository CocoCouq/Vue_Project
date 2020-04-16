<template>
    <nav>
        <div class="nav-wrapper">
            <ul class="row">
                <li
                        class="green lighten-2 col s3"
                        v-for="btnN in btnsNavbar"
                        v-bind:key="btnN.id"
                >
                    <i class="material-icons" v-on:click="btnN.actionBtn">{{btnN.icon}}</i>
                </li>
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
            },
            magFunction: function () {
                this.$parent.$parent.appMag ^= true
                this.$parent.$parent.appAdd = false
                this.$parent.$parent.appInt = false
            },
            calFunction: function () {
                this.$parent.$parent.appCal ^= true
                this.$parent.$parent.appAdd = false
                this.$parent.$parent.appMag = false
                this.$parent.$parent.appInt = false
            },
            intFunction: function () {
                this.$parent.$parent.appInt ^= true
                this.$parent.$parent.appAdd = false
                this.$parent.$parent.appMag = false
                this.$parent.$parent.appCal = false
            }
        }
    }
</script>

<style>
    nav{
        cursor: pointer;
    }
</style>
