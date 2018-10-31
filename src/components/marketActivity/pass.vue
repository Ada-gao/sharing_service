<template >
<div class="pass">
  <div class="main">
    <div class="pic">
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
      activityId: gett('activity_id'),
      userId: gett('user_id')
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
              path: '/marketActivity/success',
              query: {
                activityId: this.activityId,
                userId: this.userId,
                key: gett('token'),
              }
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
            width: 2.84rem;
            height: 2.96rem;
            margin: auto auto 0.5rem;
            background: url("../../assets/images/pass.png") no-repeat center;
            background-size: cover;
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
            font-size: 0.32rem;
            color: #4A4A4A;
        }
        button {
            margin-top: 3rem;
        }

    }

}
</style>
