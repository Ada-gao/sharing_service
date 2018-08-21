import Vue from 'vue'
import Router from 'vue-router'
import register from '@/components/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/register',
      meta: {
       title: '注册'
     }
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {
       title: '注册'
     }
    },
  ]
})
