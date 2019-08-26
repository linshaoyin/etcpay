<template>
  <div class="home">
    <div class='head'>
        <Header></Header>
        <Nav></Nav>
    </div>

    <div class="mid">
      <Banner/>
      <div class='mid-box'>
        <router-view></router-view>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>

import Header from './common/Header'
import Banner from './common/Banner'
import Footer from './common/Footer'
import Pay from './PayInput'
import Nav from './common/Navigation'

export default {
  name: 'Home',
  data () {
    return {

    }
  },
  components: {
    Header,
    Banner,
    Footer,
    Pay,
    Nav
  }
}
</script>

<style scoped>

  .home .mid{
    position: relative;
  }

  .head{
    position: fixed;
    width: 100%;
    z-index: 1;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 2px;
  }

</style>
