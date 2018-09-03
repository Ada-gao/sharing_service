<template>
<div class="register">
  <mt-header class='title' title="注册   登录">
    <!-- <mt-button icon="more" slot="right"></mt-button> -->
  </mt-header>
  <div class="box">
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
    <!-- <div class="agrenment">
      <i ref='icon' class='iconfont icon-dui' v-show='isIconShow' @click='choose()'></i>
      <i ref='icon' class='iconfont icon-duigou' v-show='!isIconShow' @click='choose()'></i>
      <router-link tag='span' :to="{name:'agrement'}">注册协议&隐私协议</router-link>
    </div> -->
    <div class="text">
      <p>{{this.codeMsg}}</p>
    </div>
  </div>
  <button class='btn' type="button" name="button" @click='submit()'>确定</button>
  <button type="button" name="button">取消</button>
</div>
</template>
<script>
import {
  MessageBox,
  Header
} from 'mint-ui';
import Vue from 'vue'
Vue.component(Header.name, Header);

import user from '@/http/api'
import {
  sett,
} from '../../help'

export default {
  name: 'register',
  data() {
    return {
      phone: this.phone,
      verifyCode: this.verifyCode,
      codeMsg: '',
      count: 60,
      msgShow: false,
      msg: '',
      share_id: this.$route.query.share_id,
      dept_id: 11,
      isIconShow: true,
    }
  },
  methods: {
    show(code) {
      switch (code) {
        case 1:
          var phone_reg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57]|19[9])[0-9]{8}$/;
          if (!phone_reg.test(this.phone)) {
            this.codeMsg = '您输入的手机号码不正确'
          } else {
            this.codeMsg = '';
          }
          break
        case 2:
          var pwd_reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
          if (!pwd_reg.test(this.password)) {
            this.codeMsg = '密码必须由 6-16位字母、数字组成'
          } else {
            this.codeMsg = '';
          }
          break
      }
    },
    choose() {
      this.isIconShow = !this.isIconShow
    },
    checkMsgCode() {
      var phone_reg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57]|19[9])[0-9]{8}$/;
      if (!phone_reg.test(this.phone)) {
        this.codeMsg = '您输入的手机号码不正确'
      } else {
        this.codeMsg = ''
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
        // "code_flag": 0,
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
          } else {
            this.codeMsg = res.data.message
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    submit() {
      var phone_reg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57]|19[9])[0-9]{8}$/;
      if (!phone_reg.test(this.phone)) {
        this.codeMsg = '您输入的手机号码不正确'
      } else if (!this.verifyCode) {
        this.codeMsg = '请输入验证码'
      } else {
        this.userRegister()
      }

      // if (this.isIconShow == false) {
      //   this.userRegister()
      // } else {
      //   this.codeMsg = '请认真阅读并勾选协议'
      // }
    },
    userRegister() {
      let obj = {
        "mobile": this.phone,
        "code": this.verifyCode,
        "dept_id": this.dept_id,
        "share_id": '3',
      }
      user.register(obj)
        .then((res) => {
          console.log(res)
          if (res.data.code == 200) {
            let token = res.data.token
            let user_id = res.data.user_id
            sett('token', token)
            sett('user_id', user_id)
            if (res.data.status == 0) {
              this.$router.push({
                name: 'uploadImg'
              });
            } else if (res.data.status == 1) {
              this.$router.push({
                name: 'success'
              });
            }
          } else if (res.data.code == 103 || res.data.code == 104) {
            this.codeMsg = res.data.message
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style lang='less' scoped>
@bgColor: #B68458;
.register {
    background: url("../../assets/images/bg.png") bottom center no-repeat;
    height: 100%;
    background-size: cover;
    .box {
        padding-top: 3rem;
        input {
            width: 6.66rem;
            height: 1.8rem;
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
            top: 0.9rem;
            left: 0.2rem;
            vertical-align: middle;
        }
        .iconfont {
            color: #B1B1B1;
        }
        .two {
            position: relative;
            height: 1.5rem;
            width: 6.36rem;
            margin: auto;
            border-bottom: 1px solid #979797;
            span {
                position: absolute;
                display: inline-block;
                background-color: @bgColor;
                border-radius: 10px;
                width: 1.56rem;
                height: 0.5rem;
                font-size: 0.2rem;
                color: #F0F0F0;
                line-height: 0.5rem;
                top: 0.8rem;
                right: 0.1rem;
            }
        }
        .agrenment {
            color: #fff;
            text-align: left;
            width: 6.36rem;
            margin: auto;
            position: relative;
            padding-top: 0.4rem;
            padding-right: 0.4rem;
            i {
                width: 0.3rem;
                height: 0.3rem;
                font-size: 0.34rem;
                position: absolute;
                top: 0.38rem;
                left: 0.4rem;
            }
            span {
                margin-left: 0.9rem;
                font-size: 0.24rem;
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
    > button {
        background: @bgColor;
        border-radius: 10px;
        width: 2.6rem;
        height: 0.8rem;
        margin-top: 1.7rem;
        margin-bottom: 3.27rem;
        font-size: 0.28rem;
        color: #F0F0F0;
    }
    .btn {
        margin-right: 0.96rem;
    }
}
</style>
