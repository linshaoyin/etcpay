<template>
  <div class="banner">
    <el-carousel trigger="click" height="700px">
      <el-carousel-item v-for="banner in banner_list" v-bind:key="banner.id">
        <a :href="banner.link"><img width="100%" height='100%' :src="banner.img" alt=""></a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  data () {
    return {
      banner_list: [
        {id: 1, link: '#', img: '/static/banner/01.png'},
        {id: 2, link: '#', img: '/static/banner/02.jpg'},
        {id: 3, link: '#', img: '/static/banner/03.png'}
      ]
    }
  }
}
</script>

<style scoped>
  .el-carousel{
    transform: translate3d(0,0,0)
  }
</style>
