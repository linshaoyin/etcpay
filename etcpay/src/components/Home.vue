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
     token: ''
    }
  },
  components: {
    Header,
    Banner,
    Footer,
    Pay,
    Nav
  },
  methods : {
    getToken(val) {
      var self = this
      // this.$axios.get('/token/auth/xxx/454556').then(function (value) {
      //    self.token = value.data.result
      //    console.log(token)
      //   }).catch( function(e){
      //       console.log(e)
      //   })
      var request = require('request'),
      username = "libtop",
      password = "libtopjnu42",
      url = "https://icbcetc.ml/auth/xxx/9999999",
      auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

      request({
        url:url,
        headers:{
          "Authorization": auth
        }
      },function(error, response, body){
        
        console.log(response)
        console.log(body)
        self.token = response.data.result
        console.log(token)
      }
      )
    },
  },
  mounted() {
  this.getToken()
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
