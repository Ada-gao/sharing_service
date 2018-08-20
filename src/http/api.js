import { fetch } from "./fetch"; //引用fetch.js


//发送验证码
export function sendMsg(data) {
  return fetch({
    url: '/auth/verification_code/',
    method: 'post',
    data:data
  })
}

// 注册
export function register(data){
  return fetch({
    url:'/auth/signup/',
    method:'post',
    data:data
  })
}
