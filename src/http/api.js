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
 },
 // 上传图片
 uploadImg:function(header,data){
   return fetch({
     url:'/common/file_upload/',
     headers:header,
     method:'post',
     data:data
   })
 },
 // 开始认证
 certification:function(header){
   return fetch({
     url:'/cert/certification/',
     headers:header,
     method:'post',
   })
 },
 // 实名认证
 realName:function(id,header,data){
   return fetch({
     url:"/cert/identity/" + id +"/",
     headers:header,
     method:'post',
     data:data
   })
 }

}

export default user
