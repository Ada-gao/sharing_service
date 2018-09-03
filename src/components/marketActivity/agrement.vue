<template id="">
<div class="argenment">
  <mt-header class='title' title="用户协议">
    <router-link :to="{path:'activeRegister'}" slot="left" tag='a'>
      <mt-button icon="back"></mt-button>
    </router-link>
  </mt-header>

</div>
</template>
<script type="text/javascript">
import Vue from 'vue'
import {
  Header,
  MessageBox,
} from 'mint-ui';


export default {
  data() {
    return {

    }
  },
  method: {
    go() {
      this.$router.go(-1)
    }
  },
  mounted() {},
}
</script>
<style media="screen" lang='less'>

</style>
