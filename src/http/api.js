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
 },
 // 是否绑定理财师
 isBind:function(header){
   return fetch({
     url:'/mine/planner/is_bind/',
     headers:header,
     method:'get'
   })
 },

 // 查询理财师
 search:function(header,data){
   return fetch({
     url:'/mine/planner/search/',
     headers:header,
     method:'post',
     data:data
   })
 },

 // 查询绑定理财师信息
 detail:function(header){
   return fetch({
     url:'/mine/planner/detail/',
     method:'get',
     headers:header
   })
 },

 // 绑定理财师
 bind:function(header,data){
   return fetch({
     url:'/mine/planner/bind/',
     method:'post',
     headers:header,
     data:data
   })
 },


}

export default user
