<template >
<div class="pass">
  <mt-header class='title' title="实名认证">
    <router-link :to="{path:'userInfo'}" slot="left">
      <mt-button icon="back"></mt-button>
    </router-link>
  </mt-header>
  <div class="main">
    <div class="pic">
      <i class='iconfont icon-tongguo'></i>
    </div>
    <p>实名认证审核通过</p>
    <button class='sureButton' type="button" name="button" @click='submit()'>提交报名</button>
  </div>
</div>
</template>
<script type="text/javascript">
import user from '@/http/api'
import {
  gett,
} from '../../help'
import {
  MessageBox,
  Header
} from 'mint-ui';
import Vue from 'vue'
Vue.component(Header.name, Header);
export default {
  data() {
    return {
      activityId: '3'
    }
  },
  methods: {
    submit() {
      let id = this.activityId
      let token = gett('token')
      user.activityClient(id, token)
        .then((res) => {
          console.log(res)
          if (res.data.code == 0) {
            this.$router.push({
              name: 'success'
            })
          }
        })
        .catch((err) => {
          if (err.response) {
            MessageBox(err.response.data.msg)
          } else {
            console.log(err)
          }
        })
    }
  },
  mounted() {
    document.body.removeAttribute('class', 'add_bg')
  },
}
</script>
<style lang='less' scoped>
.pass {
    .main {
        width: 6.5rem;
        height: 1.2rem;
        margin: 2.67rem auto auto;
        .pic {
            width: 1.05rem;
            height: 1.05rem;
            margin: auto auto 0.99rem;
            border-radius: 50%;
            line-height: 1.05rem;
            i {
                display: block;
                border-radius: 50%;
                width: 100%;
                height: 100%;
                color: #74BA3B;
                margin: auto;
                font-size: 1.05rem;
            }
        }
        > p {
            font-size: 0.48rem;
            color: #333333;
        }
        button {
            margin-top: 4rem;
        }

    }

}
</style>
