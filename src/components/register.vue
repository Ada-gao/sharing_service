<template>
<div class="hello">
  <div class="one">
    <i class='iconfont icon-shouji'></i>
    <input type="text" name="" value="" placeholder="请输入手机号或邮箱号码" v-model='phone'>
  </div>
  <div class="two">
    <i class='iconfont  icon-weibiaoti-'></i>
    <input type="text" name="" value="" placeholder="请您输入验证码" v-model='password'>
    <span @click='checkMsgCode()'>{{this.msg}}</span>
  </div>
  <button type="button" name="button" @click='checkPhone()'>注册</button>
</div>
</template>

<script>
import {
  MessageBox
} from 'mint-ui';

export default {
  name: 'register',
  data() {
    return {
      phone: this.phone,
      password: this.password,
      msg: '发送验证码',
      count: 30,
    }
  },
  methods: {
    checkPhone() {
      var reg = 11 && /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/;
      if (!reg.test(this.phone)) {
        MessageBox({
          title: '提示',
          message: '您输入的手机号码不正确',
          showCancelButton: false,
          showConfirmButton: true,
        });
      }
    },
    checkMsgCode() {
      this.countDown()
    },
    countDown() {
      var timer = setInterval(() => {
        this.count--;
        this.msg = this.count + 's后重新发送';
        if (this.count <= 0) {
          this.msg = '重新发送验证码'
          clearInterval(timer);
        }
      }, 1000);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@bgColor: #B68458;
* {
    border: 0;
    outline: none;
    font-family: PingFangSC-Regular;
}
input {
    width: 5.2rem;
    height: 0.8rem;
    line-height: 0.8rem;
    border-radius: 8px;
    border: 1px solid #AFAFAF;
    padding-left: 0.66rem;
    font-size: 0.28rem;
    color: #666666;
}
i {
    display: inline-block;
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    top: 0.8rem;
    left: 0.85rem;
}
.one {
    margin-top: 2.69rem;
    margin-bottom: 1.07rem;
    position: relative;
}
.two {
    position: relative;
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
        top: 0.7rem;
        right: 0.8rem;
    }
}
button {
    background: @bgColor;
    border-radius: 10px;
    width: 6.5rem;
    height: 0.8rem;
    margin-top: 2.13rem;
    color: #fff;
}
</style>
