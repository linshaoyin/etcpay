import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import PayInput from '../components/PayInput'
import BlackList from '../components/BlackList'

// import

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          component: PayInput
        },
        {
          path: 'pay',
          component: PayInput
        },
        {
          path: 'black',
          component: BlackList
        }]
    }
  ]
})
