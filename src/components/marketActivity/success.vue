<template >
<div class="success">
  <!-- <mt-header class='title' title="报名成功">
    <router-link :to="{path:'userInfo'}" slot="left">
      <mt-button icon="back"></mt-button>
    </router-link>
  </mt-header> -->
  <div class="main">
    <i class='ok iconfont icon-iconfont-success'></i>
    <h2>报名成功!</h2>
    <p>你已成功报名<span>{{activitySite}}</span></p>
    <p class='time'>活动时间:<span>{{activityStart}}</span></p>
    <p class='site'>活动地址: <span>{{activitySite}}</span></p>
    <button class='sureButton' type="button" name="button" @click='download()'>立即下载望财app</button>
    <p class='bind' @click='modalShow()' v-show='isbindShow'>立即绑定理财师<i class='iconfont icon-gengduo'></i></p>
  </div>
  <div class="modal" v-show='isModalShow'>
    <div class="box clearfix">
      <i class='iconfont icon-chahao' @click='close()'></i>
      <div class="one" v-show='bindShow'>
        <input ref='default' type="radio" id="first" name="radio" @change='change()' checked />
        <label :class='{"color":isInputShow === false}' for="first">绑定推荐理财师<span>（{{name}}）</span></label>
      </div>
      <div class="two">
        <input ref='check' type="radio" id="second" name="radio" @change='change()' />
        <label :class='{ "color":isInputShow === true}' for="second">输入理财师手机号绑定</label>
      </div>
      <div class="inputer">
        <input type="text" name="" value="" placeholder='请输入理财师手机号' v-model='phone' v-show='isInputShow'>
      </div>
      <button type="button" name="button" @click='close()'>取消</button>
      <button type="button" name="button" @click='submit()'>绑定</button>
    </div>
  </div>
</div>
</template>
<script type="text/javascript">
import user from '@/http/api'
import runApp from '@/http/platform'
import {gett,sett,timestampToTime} from '../../help'
import {MessageBox,Header} from 'mint-ui';
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
      activity_id: '4',
      activityStart: '',
      activityName: '',
      activitySite: '',
      name:'',
      bindShow:true,
    }
  },
  created() {
    this.isBind()
    this.activityDetail()
    this.detail()
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
        document.getElementByClassName('introduce')[0].color='#BD9D62'
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
    submit() {
      if (this.$refs.check.checked) {
        var phone_reg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57]|19[9])[0-9]{8}$/;
        if (!phone_reg.test(this.phone)) {
          MessageBox('手机号码输入不正确')
        } else {
          let data = {
            "mobile": this.phone
          }
          this.bind(data)
        }
      } else if (this.$refs.default.checked) {
        let data = {
          "user_id": gett('user_id')
        }
        this.bind(data)
      } else {
        MessageBox('请选择绑定理财师')
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
    // 查询绑定理财师信息
    detail(){
      let token = gett('token');
      let header = {
        'X-Token': token
      }
      user.detail(header)
      .then((res)=>{
        this.name = res.data.name
        console.log(res.data.name)
      })
      .catch((err)=>{
        console.log(err.response)
      })
    },
    // 下载app
    download() {
      runApp({
        ios: 'https://itunes.apple.com/cn/app/wang-cai/id1105720274?mt=8',
        android: 'http://sj.qq.com/myapp/detail.htm?apkName=com.wangcai.android'
      })
    },
    // 活动详情
    activityDetail() {
      let id = this.activity_id
      let token = gett('token')
      user.activityDetail(id, token)
        .then((res) => {
          this.activityStart = timestampToTime(res.data.activityStart)
          this.activityName = res.data.activityName
          this.activitySite = res.data.activitySite
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  mounted() {
    document.body.removeAttribute('class', 'add_bg')
    if(!gett('user_id')){
      this.bindShow = false
    }
    if(!gett('token')){
      MessageBox.alert('登录信息已过期，请重新登录').then(action => {
        this.$router.push({
          name: 'activeRegister'
        })
      });
    }
  },
}
</script>
<style lang='less' scoped>
.success {
  background: url('../../assets/images/background.png') no-repeat center;
  background-size:cover;
  /* height:14rem; */ 
  height: 100vh;
  width: 100vw;
    .main {
      width: 6.7rem;
      margin: auto;
      background-color: #ffffff;
      position:fixed;
      bottom:0;
      left:0;
      right:0;
      padding:0.4rem 0;
      border-top-right-radius: 20px;
      border-top-left-radius: 20px;
        h2 {
            font-size: 0.4rem;
            color: #413620;
            font-weight: 400;
            margin-bottom: 0.46rem;
        }
        > p {
            font-size: 0.28rem;
            color: #4A4A4A;
            vertical-align: bottom;
            position: relative;
            /* > i {
                font-size: 0.4rem;
                color: #333;
                position: absolute;
                left: -0.5rem;
            } */
        }
        .site,
        .time {
            text-align: left;
            margin-left: 1.2rem;
            color: #9B9B9B;
            font-size:0.26rem;
        }
        > .time {
            margin-top: 0.4rem;
            margin-bottom: 0.1rem;
        }
        .ok{
          margin: auto;
          display:block;
        }
    }
    .sureButton {
        width: 5.9rem;
        margin-top:0.5rem;
        margin-bottom: 0.5rem;
        font-size: 0.36rem;
    }
    p.bind {
        font-size: 0.28rem;
        color: #9B9B9B;
        /* text-align: right; */
        /* margin-right: 0.4rem; */
        padding-bottom: 0.5rem;
        position:relative;
        i{
          position:absolute;
          top:-0.05rem;
        }
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
            /* height: 4.34rem; */
            margin: auto;
            position: relative;
            top: 50%;
            margin-top: -2.17rem;
            background-color: #ffffff;
            > i {
                float: right;
                margin-top: 0.1rem;
                margin-right: 0.26rem;
            }
            .one,
            .two {
                width: 4rem;
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
                .color{
                  font-size: 0.28rem;
                  letter-spacing: 0;
                  color: #BD9D62;
                }
            }
            .one {
                padding-top: 0.63rem;
                

            }
            .two{
              padding-top: 0.5rem;
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
                width: 50%;
                height: 1rem;
                float: left;
                background: #fff;
                margin: auto;
                color: #9B9B9B;
                margin-top: 0.7rem;
                font-size: 0.36rem;
                letter-spacing: 0;
                border-top:1px solid #D2D3D5;
            }
            button:last-child{
              border-left:1px solid #D2D3D5;
              color: #BD9D62;
            }

        }
    }
}
</style>
