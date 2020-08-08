import Vue from 'vue'
import VueRouter from 'vue-router'
import Join from '../views/Join.vue'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Join',
    component: Join
  },
  {
    path: '/main',
    name: 'Main',
    component: Main
  },
]

const router = new VueRouter({
  mode: 'history',
  base: '/join',
  routes
})


export default router
