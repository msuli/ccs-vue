import Vue from 'vue'
import Router from 'vue-router'
import helloWorld from '../components/HelloWorld.vue'
const home = resolve => require(['../page/home'], resolve)
const specialPrice = resolve => require(['../page/specialPrice'], resolve)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      component: home
    },
    {
      path: '/helloWorld',
      component: helloWorld
    },
    {
      path: '/specialPrice',
      component: specialPrice
    }
  ]
})
