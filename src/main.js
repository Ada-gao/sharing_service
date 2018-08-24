// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Mint from 'mint-ui'
Vue.use(Mint);
import 'mint-ui/lib/style.css'

import './assets/iconfont/iconfont.css'

import axios from 'axios'
Vue.prototype.$ajax= axios

import './assets/css/common.css'

Vue.config.productionTip = false

import vSelect from 'vue-select'
Vue.component('vSelect',vSelect)

//rem动态计算公式
function add(){var html=document.documentElement;var hei=html.clientWidth;var fz=hei/375*100+"px";html.style.fontSize=fz};
add();
window.addEventListener("resize",add,false);
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>=750){
                docEl.style.fontSize = '100px';
            }else{
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
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
