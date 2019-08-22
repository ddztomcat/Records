<template>
  <div id="app" @dblclick="handleClick">
    <router-view></router-view>
  </div>
</template>

<script>
import routes from './routes';
export default {
  name: 'app',
  data() {
    return {
      curIndex: 0
    }
  },
  mounted() {

  },
  methods: {
    handleClick() {
      console.log(34)
      this.$router.push({
        path: routes[this.curIndex].path
      })
      this.curIndex = (this.curIndex + 1) % routes.length
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
}
</style>
