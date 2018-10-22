<template>
<div class="register">
  <div class="box">
    <div class="two">
      <i class='iconfont icon-gerenxinxi'></i>
      <input type="text" name="" value="" placeholder="请输入用户姓名" v-model='userName'>
    </div>
    <div class="two">
      <i class=' iconfont icon-dianhuaphone349'></i>
      <input type="text" name="" value="" placeholder="请输入手机号或邮箱号码" v-model='phone'>
    </div>
    <div class="two">
      <i class='iconfont icon-duanxinyanzhengma'></i>
      <input type="text" name="" value="" placeholder="请您输入验证码" v-model='verifyCode'>
      <span v-show='!msgShow' @click='checkMsgCode()'>发送验证码</span>
      <span v-show='msgShow'>{{this.msg}}</span>
    </div>
    <div class="two">
      <i class='iconfont icon-mima'></i>
      <input type="password" name="" value="" placeholder="请您输入密码" v-model='password'>
    </div>
    <div class="two">
      <i class='iconfont icon-mima'></i>
      <input type="password" name="" value="" placeholder="请您再一次输入密码" v-model='surePassword'>
    </div>
    <div class="text">
      <p>{{this.codeMsg}}</p>
    </div>
  </div>
  <button type="button" name="button" @click='checkRegister()'>注册</button>
</div>
</template>

<script>
import {
  MessageBox
} from 'mint-ui';
import user from '@/http/api'
import {
  getUrlParams
} from '../help'

export default {
  name: 'register',
  data() {
    return {
      userName: this.userName,
      phone: this.phone,
      verifyCode: this.verifyCode,
      password: this.password,
      surePassword: this.surePassword,
      codeMsg: '',
      count: 60,
      msgShow: false,
      msg: '',
      share_id: null,
    }
  },
  methods: {
    checkMsgCode() {
      var phone_reg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57]|19[9])[0-9]{8}$/;
      if (!this.userName) {
        this.codeMsg = '请输入用户名'
      } else if (!phone_reg.test(this.phone)) {
        this.codeMsg = '您输入的手机号码不正确'
      } else {
        this.sendCode();
      }
    },
    countDown() {
      var timer = setInterval(() => {
        this.msgShow = true
        this.count--;
        this.msg = this.count + 'S后重新发送';
        if (this.count <= 0) {
          this.msgShow = false
          clearInterval(timer);
        }
      }, 1000);
    },
    sendCode() {
      let obj = {
        "mobile": this.phone,
        "code_flag": 1,
        "platform": "iOS",
        "app_version": "v1.0",
        "registration_id": "0891683108200105F"
      }
      user.sendMsg(obj)
        .then((res) => {
          console.log(res)
          if (res.data.code == 200) {
            this.countDown();
            MessageBox('提示', '验证码发送成功，请查收');
            this.codeMsg = ''
          } else {
            this.codeMsg = res.data.message
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    userRegister() {
      this.share_id = getUrlParams('shareId')
      console.log(this.share_id)
      let obj = {
        "mobile": this.phone,
        "name": this.userName,
        "passwd": this.password,
        "verify_passwd": this.surePassword,
        "code": this.verifyCode,
        "share_id": this.share_id
      }
      user.register(obj)
        .then((res) => {
          console.log(res)
          if (res.data.code == 200) {
            MessageBox('提示', '注册成功');
          } else {
            this.codeMsg = res.data.message
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    checkRegister() {
      var phone_reg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57]|19[9])[0-9]{8}$/;
      var pwd_reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
      if (!this.userName) {
        this.codeMsg = '请输入用户名'
      } else if (!phone_reg.test(this.phone)) {
        this.codeMsg = '您输入的手机号码不正确'
      } else if (!this.verifyCode) {
        this.codeMsg = '请输入验证码'
      } else if (!pwd_reg.test(this.password)) {
        this.codeMsg = '密码必须由 6-16位字母、数字组成'
      } else if (this.surePassword != this.password) {
        this.codeMsg = '两次输入的密码不一致'
      } else {
        this.codeMsg = ''
        this.userRegister();
      }
    }
  }
}
</script>

<style lang='less' scoped>
@bgColor: #B68458;
.register {
    background: url("../assets/images/bg.png") bottom center no-repeat;
    height: 100vh;
    width: 100vw;
    background-size: cover;
    .box {
        padding-top: 2.52rem;
        input {
            width: 6.36rem;
            height: 1.17rem;
            border: 1px solid #979797;
            padding-left: 0.6rem;
            font-size: 0.28rem;
            color: #B4B4B4;
            border: 0 none;
            background-color: rgba(255,255,255,0);
            margin-top: 0.2rem;
            box-sizing: border-box;
        }
        input::-webkit-input-placeholder {
            color: #B4B4B4;
        }
        i {
            display: inline-block;
            width: 0.3rem;
            height: 0.3rem;
            position: absolute;
            top: 0.59rem;
            left: 0.2rem;
            vertical-align: middle;
        }
        .iconfont {
            color: #B1B1B1;
        }
        .two {
            position: relative;
            height: 1.17rem;
            width: 6.36rem;
            margin: auto;
            border-bottom: 1px solid #979797;
            span {
                position: absolute;
                display: inline-block;
                background-color: @bgColor;
                border-radius: 10px;
                width: 1.8rem;
                height: 0.5rem;
                font-size: 0.2rem;
                color: #F0F0F0;
                line-height: 0.5rem;
                top: 0.52rem;
                right: 0.1rem;
            }
        }
        .text {
            height: 1rem;
            p {
                color: red;
                padding-top: 0.4rem;
            }
        }

    }
    button {
        background: @bgColor;
        border-radius: 10px;
        width: 6.5rem;
        height: 0.8rem;
        margin-top: 1rem;
        /* margin-bottom: 2.3rem; */
        font-size: 0.28rem;
        color: #F0F0F0;
    }
}
</style>
