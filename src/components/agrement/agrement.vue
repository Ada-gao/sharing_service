<template id="">
<div class="argenment">
  <mt-header class='title' title="用户协议">
    <router-link :to="{path:'activeResiter'}" slot="left">
      <mt-button icon="back"></mt-button>
    </router-link>
  </mt-header>
  <mt-navbar>
    <mt-tab-item id="1">注册协议</mt-tab-item>
    <mt-tab-item id="2">隐私协议</mt-tab-item>
    <!-- <mt-tab-item id="3">选项三</mt-tab-item> -->
  </mt-navbar>

  <!-- tab-container -->
  <mt-tab-container>
    <mt-tab-container-item id="1">
      <mt-cell v-for="n in 10" :title="'内容 ' + n" />
    </mt-tab-container-item>
    <mt-tab-container-item id="2">
      <mt-cell v-for="n in 4" :title="'测试 ' + n" />
    </mt-tab-container-item>
  </mt-tab-container>
</div>
</template>
<script type="text/javascript">
import Vue from 'vue'
import {
  Header,
  MessageBox,

} from 'mint-ui';

import {
  Navbar,
  TabItem
} from 'mint-ui';

Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);


export default {
  data() {
    return {
      active: this.active,
    }
  }
}
</script>
<style media="screen" lang='less'>

</style>
