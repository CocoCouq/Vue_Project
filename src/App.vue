<template>
  <div id="app">
    <index/>
    <addition v-if="appAdd"/>
    <magic v-if="appMag"></magic>
    <calculator v-if="appCal"></calculator>
    <changebox v-if="appInt"></changebox>
  </div>
</template>

<script>
  import index from './components/index'
  import addition from './components/addition'
  import magic from './components/magic'
  import calculator from './components/calculator'
  import changebox from './components/interface'
  export default {
    name: 'App',
    components: {
      index,
      addition,
      magic,
      calculator,
      changebox
    },
    data () {
      return {
        appAdd: false,
        appMag: false,
        appCal: false,
        appInt: false
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
