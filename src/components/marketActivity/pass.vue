<template >
<div class="pass">
  <mt-header class='title' title="实名认证">
    <router-link :to="{path:'userInfo'}" slot="left">
      <mt-button icon="back"></mt-button>
    </router-link>
  </mt-header>
  <div class="main">
    <div class="pic">
    </div>
    <p>实名认证审核通过</p>
    <button class='sureButton' type="button" name="button">提交报名</button>
  </div>
</div>
</template>
<script type="text/javascript">
import {
  MessageBox,
  Header
} from 'mint-ui';
import Vue from 'vue'
Vue.component(Header.name, Header);
export default {
  data() {
    return {

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
            background-color: #ccc;
            margin: auto auto 0.99rem;
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
