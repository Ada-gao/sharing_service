// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {
  gett
} from './help'
import {
  MessageBox
} from 'mint-ui';
import Mint from 'mint-ui'
Vue.use(Mint);
import 'mint-ui/lib/style.css'

import './assets/iconfont/iconfont.css'

import axios from 'axios'
Vue.prototype.$ajax = axios

import './assets/css/common.css'

Vue.config.productionTip = false

// 压缩图片
import lrz from 'lrz'

//rem动态计算公式
function add() {
  var html = document.documentElement;
  var hei = html.clientWidth;
  var fz = hei / 375 * 100 + "px";
  html.style.fontSize = fz
};
add();
window.addEventListener("resize", add, false);
(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      if (clientWidth >= 750) {
        docEl.style.fontSize = '100px';
      } else {
        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
      }
    };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.login) {
    if (gett('token') || to.query.key) {
      next()
    } else {
      MessageBox.alert('未登录，请您先登录').then(() => {
        next({
          path: '/marketActivity/activeRegister',
          // query: {
          //   redirect: to.fullPath
          // }
        })
      })
    }
  }
  next()
})

// ios禁止页面缩放
window.onload = function() {
  // 阻止双击放大
  var lastTouchEnd = 0;
  document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  document.addEventListener('touchend', function(event) {
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

  // 阻止双指放大
  document.addEventListener('gesturestart', function(event) {
    event.preventDefault();
  });
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})