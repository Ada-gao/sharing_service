<template id="">
<div class="argenment">
  <mt-header class='title' title="用户协议">
    <!-- <router-link :to="{path:''}" slot="left" tag='a'>
      <mt-button icon="back"></mt-button>
    </router-link> -->
  </mt-header>
  <mt-navbar v-model="active">
    <mt-tab-item id="1">注册协议</mt-tab-item>
    <mt-tab-item id="2">隐私协议</mt-tab-item>
    <!-- <mt-tab-item id="3">选项三</mt-tab-item> -->
  </mt-navbar>

  <!-- tab-container -->

  <mt-tab-container v-model="active">
    <mt-tab-container-item id="1">
      <mt-cell v-for="n in 10" :title="'内容 ' + n" />
    </mt-tab-container-item>
    <mt-tab-container-item id="2">
      <mt-cell v-for="n in 4" :title="'测试 ' + n" />
    </mt-tab-container-item>
    <mt-tab-container-item id="3">
      <mt-cell v-for="n in 6" :title="'选项 ' + n" />
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

import {
  TabContainer,
  TabContainerItem
} from 'mint-ui';

Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);


export default {
  data() {
    return {
      active: this.active,
    }
  },
  method: {
    go() {
      this.$router.go(-1)
    }
  }
}
</script>
<style media="screen" lang='less'>

</style>
