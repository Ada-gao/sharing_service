<template>
<div class="register">
  <!-- <mt-header class='title' title="注册   登录">
    <mt-button icon="more" slot="right"></mt-button>
  </mt-header> -->
  <div class="box">
    <div class="two">
      <i class=' iconfont icon-dianhuaphone349'></i>
      <input type="text" name="" value="" placeholder="请输入手机号" v-model='phone'>
    </div>
    <div class="two">
      <i class='iconfont icon-duanxinyanzhengma'></i>
      <input type="text" name="" value="" placeholder="请您输入验证码" v-model='verifyCode'>
      <!-- <span @click='checkMsgCode()'>{{this.msg}}</span> -->
      <button :disabled='isDisable' @click='checkMsgCode()'>{{this.msg}}</button>
    </div>
    <div class="agrenment">
      <i ref='icon' class='iconfont icon-dui' v-show='isIconShow' @click='choose()'></i>
      <i ref='icon' class='iconfont icon-duigou' v-show='!isIconShow' @click='choose()'></i>
      <router-link tag='span' :to="{name:'agrement'}">注册协议 & 隐私协议</router-link>
    </div>
    <div class="text">
      <p>{{this.codeMsg}}</p>
    </div>
  </div>
  <button class='sureButton' type="button" name="button" @click='submit()'>确定</button>
  <div class="botBox">

  </div>
  <!-- <button type="button" name="button">取消</button> -->
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
  gett
} from '../../help'

export default {
  name: 'activeRegister',
  data() {
    return {
      phone: this.phone,
      verifyCode: this.verifyCode,
      codeMsg: '',
      count: '',
      msg: '发送验证码',
      share_id: gett('share_id'),
      dept_id: gett('dept_id'),
      isIconShow: true,
      isDisable: false,
      activityId: gett('activity_id'),
      userId: null,
    }
  },
  methods: {
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
      const TIME_COUNT = 60
      this.count = TIME_COUNT
      var timer = setInterval(() => {
        if (this.count > 1 && this.count <= TIME_COUNT) {
          this.count--;
          this.msg = this.count + 'S后重新发送';
          this.isDisable = true
        } else {
          this.isDisable = false
          this.msg = '发送验证码';
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
            MessageBox('提示', '验证码发送成功，请查收');
            this.countDown();
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
      } else if (this.isIconShow) {
        this.codeMsg = '请认真阅读并勾选协议'
      } else {
        this.codeMsg = ''
        this.userRegister()
      }
    },
    userRegister() {
      let obj = {
        "mobile": this.phone,
        "code": this.verifyCode,
        "dept_id": this.dept_id,
        "share_id": this.share_id,
      }
      user.register(obj)
        .then((res) => {
          console.log(res)
          if (res.status == 200) {
            let token = res.data.token
            sett('token', token)
            if (res.data.user_id) {
              let user_id = res.data.user_id
              this.userId = res.data.user_id
              sett('user_id', user_id)
            }
            if (res.data.status == 0) {
              this.$router.push({
                name: 'uploadImg'
              });
            } else if (res.data.status == 1) {
              this.$router.push({
                name: 'success',
                query: {
                  activityId: this.activityId,
                  userId: this.userId,
                  key: gett('token'),
                }
              });
            }
            if (res.data.code == 103 || res.data.code == 104) {
              this.codeMsg = res.data.message
            } else if (res.data.code == 101) {
              MessageBox('提示', '请先扫码报名活动');
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  mounted() {
    document.getElementsByTagName("body")[0].className = 'add_bgs'
  },
  beforedestroy() {
    document.body.removeAttribute('class', 'add_bgs')
  },
}
</script>

<style lang='less' scoped>
.register {
    background: url("../../assets/images/background.png") bottom center no-repeat;
    height: 100%;
    width: 100vw;
    background-size: cover;
    font-size: 0.26rem;
    .box {
        padding-top: 3.9rem;
        input {
            width: 6.66rem;
            height: 1.8rem;
            border: 1px solid #979797;
            padding-left: 0.8rem;
            font-size: 0.26rem;
            color: #B4B4B4;
            border: 0 none;
            background-color: rgba(255,255,255,0);
            margin-top: 0.2rem;
            box-sizing: border-box;
        }
        input::-webkit-input-placeholder {
            color: #7B7976;
        }
        i {
            display: inline-block;
            width: 0.32rem;
            height: 0.32rem;
            position: absolute;
            top: 0.89rem;
            left: 0.2rem;
            vertical-align: middle;
        }
        .iconfont {
            color: #8F7859;
        }
        .two {
            position: relative;
            height: 1.5rem;
            width: 6.36rem;
            margin: auto;
            border-bottom: 1px solid #7E7569;
            button {
                position: absolute;
                display: inline-block;
                border: 1px solid #BD9D62;
                border-radius: 4px;
                width: 1.8rem;
                height: 0.5rem;
                font-size: 0.2rem;
                background-color: rgba(255,255,255,0);
                color: #BD9D62;
                line-height: 0.4rem;
                top: 0.8rem;
                right: 0.1rem;
            }
        }
        .agrenment {
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
                margin-left: 0.99rem;
                font-size: 0.26rem;
                color: #B9B9B9;
            }
        }
        .text {
            height: 1.7rem;
            p {
                color: red;
                padding-top: 0.4rem;
            }
        }

    }
    > button {
        /* margin-bottom: 2.09rem; */
    }
    .botBox {
        height: 2rem;
    }
}
</style>
