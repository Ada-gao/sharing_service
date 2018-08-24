import Vue from 'vue'
import Router from 'vue-router'
import register from '@/components/register'
import activeRegister from '@/components/marketActivity/register'
import uploadImg from '@/components/marketActivity/uploadImg'
import userInfo from '@/components/marketActivity/userInfo'
import pass from '@/components/marketActivity/pass'

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
    {
      path: '/marketActivity/register',
      name: 'activeRegister',
      component: activeRegister,
      meta: {
       title: '注册'
     }
   },
   {
     path: '/marketActivity/uploadImg',
     name: 'uploadImg',
     component: uploadImg,
     meta: {
      title: '实名认证'
    }
  },
  {
    path: '/marketActivity/userInfo',
    name: 'userInfo',
    component: userInfo,
    meta: {
     title: '实名认证'
   }
 },
 {
   path: '/marketActivity/pass',
   name: 'pass',
   component: pass,
   meta: {
    title: '实名认证'
  }
},
  ]
})
