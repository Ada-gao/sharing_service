import { fetch } from "./fetch"; //引用fetch.js

const user = {
  //发送验证码
  sendMsg:function(data) {
   return fetch({
     url: '/auth/verification_code/',
     method: 'post',
     data:data
   })
 },
 // 注册
 register:function(data){
   return fetch({
     url:'/auth/signup/',
     method:'post',
     data:data
   })
 }
}

export default user
