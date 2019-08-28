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
import axios from 'axios'

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
	var url = 'https://icbcetc.ml/auth/xxx/9999999999999'
	var username = 'libtop'
	var password = 'libtopjnu42'
	var auth = "Basic " + new Buffer(username + ":" + password).toString("base64")
	var config = {"headers": {"Authorization": auth}}
	axios.get(url,config).then(function(response){
 		self.token = response.data.result
	//	console.log('token: '+ response.data.result)
	        console.log('Authenticated')
	}).catch(function(error){
		console.log('error:'+error)
		console.log('Error on Auth')
	})
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
