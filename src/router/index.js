import Vue from 'vue'
import Router from 'vue-router'
import register from '@/components/register'
import activeRegister from '@/components/marketActivity/activeRegister'
import uploadImg from '@/components/marketActivity/uploadImg'
import userInfo from '@/components/marketActivity/userInfo'
import pass from '@/components/marketActivity/pass'
import success from '@/components/marketActivity/success'
import agrement from '@/components/marketActivity/agrement'
import activeDetail from '@/components/marketActivity/activeDetail'

Vue.use(Router)
export default new Router({
  routes: [
    // {
    //   path: '/',
    //   redirect:'/register',
    //   meta: {
    //    title: '注册'
    //  }
    // },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {
        title: '注册'
      }
    },
    {
      path: '/marketActivity/activeRegister',
      name: 'activeRegister',
      component: activeRegister,
      meta: {
        title: '登录注册',
        keepAlive: true
      }
    },
    {
      path: '/marketActivity/uploadImg',
      name: 'uploadImg',
      component: uploadImg,
      meta: {
        title: '实名认证',
        login: true,
      }
    },
    {
      path: '/marketActivity/userInfo',
      name: 'userInfo',
      component: userInfo,
      meta: {
        title: '实名认证',
        login: true,
      }
    },
    {
      path: '/marketActivity/pass',
      name: 'pass',
      component: pass,
      meta: {
        title: '实名认证',
        login: true,
      }
    },
    {
      path: '/marketActivity/success',
      name: 'success',
      component: success,
      meta: {
        title: '报名成功',
        login: true,
      }
    },
    {
      path: '/marketActivity/agrement',
      name: 'agrement',
      component: agrement,
      meta: {
        title: '用户协议',
        keepAlive: false,
      }
    },
    {
      path: '/marketActivity/activeDetail',
      name: 'activeDetail',
      component: activeDetail,
      meta: {
        title: '活动详情'
      }
    },
  ]
})