<template >
<div class="success">
  <mt-header class='title' title="报名成功">
    <router-link :to="{path:'userInfo'}" slot="left">
      <mt-button icon="back"></mt-button>
    </router-link>
  </mt-header>
  <div class="main">
    <h2>恭喜你，报名成功</h2>
    <p>最近主办“新时代新趋势新机遇”,中国发展与投资论坛</p>
    <p class='time'><i class='iconfont icon-shijian'></i>参会时间:<span> 2018年4月24日 17:00</span></p>
    <p><i class='iconfont icon-dizhi'></i>参会地址: <span>北京市朝阳区东直门国际酒店9F</span></p>
  </div>
  <button class='sureButton' type="button" name="button">立即下载望财app</button>
  <p class='bind' @click='modalShow()' v-show='isbindShow'>绑定理财师</p>
  <div class="modal" v-show='isModalShow'>
    <div class="box clearfix">
      <i class='iconfont icon-chahao' @click='close()'></i>
      <div class="one">
        <input type="radio" id="first" name="radio" @change='change()' />
        <label for="first">绑定推荐理财师:<span>{{name}}</span></label>
      </div>
      <div class="two">
        <input ref='check' type="radio" id="second" name="radio" @change='change()' />
        <label for="second">输入理财师手机号绑定</label>
      </div>
      <div class="inputer">
        <input type="text" name="" value="" placeholder='请输入理财师手机号' v-model='phone' v-show='isInputShow'>
      </div>
      <button type="button" name="button" @click='submit()'>绑定</button>
    </div>
  </div>
</div>
</template>
<script type="text/javascript">
import user from '@/http/api'
import _runApp from '@/http/platform'
import {
  gett,
  sett,
} from '../../help'
import {
  MessageBox,
  Header,
  Toast
} from 'mint-ui';
import Vue from 'vue'
Vue.component(Header.name, Header);
export default {
  data() {
    return {
      isModalShow: true,
      isInputShow: false,
      isbindShow: true,
      phone: this.phone,
      name: '',
    }
  },
  created() {
    this.isBind()
  },
  methods: {
    close() {
      this.isModalShow = false
    },
    modalShow() {
      this.isModalShow = true
    },
    change() {
      if (this.$refs.check.checked) {
        this.isInputShow = true
      } else {
        this.isInputShow = false
      }
    },
    // 查询用户是否绑定理财师
    isBind() {
      let token = gett('token');
      let header = {
        'X-Token': token
      }
      user.isBind(header)
        .then((res) => {
          console.log(res)
          if (res.data.code == 209) {
            this.isbindShow = false
            this.isModalShow = false
          } else {
            this.isbindShow = true
            this.isModalShow = true
          }
        })
        .catch((err) => {
          if (err.response) {
            // console.log(err.response.data);
            if (err.response.data.code == 222) {
              this.isbindShow = true
              this.isModalShow = true
            } else {
              this.isbindShow = false
              this.isModalShow = false
            }
          } else {
            console.log('Error', err.message);
          }
        })
    },
    // 查询理财师
    // search() {
    //   let token = gett('token');
    //   let header = {
    //     'X-Token': token
    //   }
    //   let data = {
    //     'mobile': this.phone
    //   }
    //   user.search(header, data)
    //     .then((res) => {
    //       console.log(res)
    //       MessageBox(res.data.message)
    //     })
    //     .catch((err) => {
    //       if (err.response) {
    //         MessageBox(err.response.data.message)
    //       }
    //     })
    // },
    submit() {
      if (this.$refs.check.checked) {
        // this.search()
        let data = {
          "mobile": this.phone
        }
        this.bind(data)
      } else {
        let data = {
          "user_id": gett('user_id')
        }
        this.bind(data)
      }
    },

    // 绑定理财师
    bind(data) {
      let token = gett('token');
      let header = {
        'X-Token': token
      }
      user.bind(header, data)
        .then((res) => {
          console.log(res)
          if (res.data.code == 209) {
            MessageBox(res.data.message)
            this.isbindShow = false
            this.isModalShow = false
          } else {
            MessageBox(res.data.message)
          }
        })
        .catch((err) => {
          MessageBox(err.response.data.message)
        })
    },
    // 下载app
    download() {
      _runApp({
        ios: '',
        android: ''
      })
    }
  },
  mounted() {
    document.body.removeAttribute('class', 'add_bg')
  },
}
</script>
<style lang='less' scoped>
.success {
    .main {
        h2 {
            font-size: 0.36rem;
            color: #B68458;
            font-weight: 400;
            margin-top: 1.16rem;
            margin-bottom: 0.6rem;
        }
        > p {
            font-size: 0.28rem;
            color: #333333;
            vertical-align: bottom;
            position: relative;
            > i {
                font-size: 0.4rem;
                color: #333;
                position: absolute;
            }
            .icon-shijian {
                left: 1.28rem;
            }
            .icon-dizhi {
                left: 0.66rem;
            }
        }
        > p.time {
            margin-top: 1.68rem;
            margin-bottom: 0.88rem;
        }
    }
    .sureButton {
        margin-top: 3.94rem;
        font-size: 0.28rem;
    }
    p.bind {
        font-size: 0.28rem;
        color: #9B9B9B;
        text-align: right;
        margin-right: 0.4rem;
        margin-top: 0.3rem;
    }
    .modal {
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.4);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        .box {
            width: 5.29rem;
            height: 4.34rem;
            margin: auto;
            position: relative;
            top: 45%;
            margin-top: -2.17rem;
            background-color: #ffffff;
            > i {
                float: right;
                margin-top: 0.26rem;
                margin-right: 0.26rem;
            }
            .one,
            .two {
                width: 3.36rem;
                margin: auto;
                text-align: left;
                input[type="radio"] + label::before {
                    content: "\a0";
                    /*不换行空格*/
                    display: inline-block;
                    vertical-align: middle;
                    font-size: 18px;
                    width: 0.3rem;
                    height: 0.3rem;
                    margin-right: 0.4em;
                    border-radius: 50%;
                    border: 1px solid #5B5B5B;
                    text-indent: 0.15em;
                    line-height: 1;
                }
                input[type="radio"]:checked + label::before {
                    background-color: #B68458;
                    background-clip: content-box;
                    padding: 0.1em;
                }
                input[type="radio"] {
                    position: absolute;
                    clip: rect(0, 0, 0, 0);
                }
                label {
                    font-size: 0.28rem;
                    color: #5B5B5B;
                    letter-spacing: 0;
                }
            }
            .one {
                padding-top: 0.63rem;
                margin-bottom: 0.3rem;

            }
            .inputer {
                width: 3.36rem;
                height: 0.6rem;
                margin: 0.3rem auto auto;
                input {
                    width: 100%;
                    height: 100%;
                    border: 1px solid #979797;
                    border-radius: 4px;

                }
                input::-webkit-input-placeholder {
                    font-size: 0.24rem;
                    color: #A7A7A7;
                    letter-spacing: 0;
                    padding-left: 0.1rem;
                }
            }
            button {
                width: 4.13rem;
                height: 0.6rem;
                background: #B68458;
                border-radius: 4px;
                margin: auto;
                color: #fff;
                margin-top: 0.73rem;
                ont-size: 0.28rem;
                color: #FFFFFF;
                letter-spacing: 0;
            }

        }
    }
}
</style>
