<template>
  <div id="app">
    <index/>
    <addition v-if="appAdd"/>
    <magic v-if="appMag"></magic>
    <calculator v-if="appCal"></calculator>
    <changebox v-if="appInt"></changebox>
    <!-- Use materialize class to hide canvas games -->
    <pokecatcher></pokecatcher>
    <pokerunner></pokerunner>
  </div>
</template>

<script>
  // Import all components
  import index from './components/index'
  import addition from './components/addition'
  import magic from './components/magic'
  import calculator from './components/calculator'
  import changebox from './components/interface'
  import pokecatcher from './components/pokecatcher'
  import pokerunner from "./components/pokerunner"

  export default {
    name: 'App',
    components: {
      index,
      addition,
      magic,
      calculator,
      changebox,
      pokecatcher,
      pokerunner
    },
    data () {
      return {
        // Navbar value
        appAdd: false,
        appMag: false,
        appCal: false,
        appInt: false,
        pokecatcher: false,
        pokerunner: false
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
  canvas{
    border: #427898 solid 3px !important;
    width: 60vw;
    height: auto;
    margin-left: 20vw;
    box-shadow: 2px 3px #8ee88e;
  }
</style>
