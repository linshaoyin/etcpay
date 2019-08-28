<template>
  <div class="home">
    <div class='head'>
        <Header></Header>
        <Nav></Nav>
    </div>

    <div class="mid">
      <Banner/>
      <div class='mid-box'>
        <router-view :token='token'></router-view>
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
     // var request = require('request')
      var username = 'libtop'
      var password = 'libtopjnu42'
      var url = "https://icbcetc.ml/auth/xxx/9999999999999"
      var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

new  Request({
        url:url,
        headers:{
          "Authorization": auth
        }
      },function(error, response, body){
        var parseBody = JSON.parse(body)
        self.token = parseBody.result
        console.log("token aggre:" + self.token)
        console.log("parsebody: "+parseBody.result)
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
