<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
  *{
    padding: 0;
    margin: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    /* width: 100%; */
    /* color: #2c3e50; */
    /* margin-top: 10px; */
  }
  a{
    text-decoration: none;
    color: #4d4c4c;
    /* color */
  }
  a:hover{
    color: rgb(139, 23, 23);
  }
  .header .el-menu li .el-submenu__title{
    height: 26px!important;
    line-height: 26px!important;
  }
  .el-menu--popup{
    min-width: 140px;
  }
</style>
