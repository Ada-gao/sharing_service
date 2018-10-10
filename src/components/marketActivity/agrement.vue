<template>
<div class="main">
  <div class="top">
    <ul class='clearfix'>
      <li v-for='(tab,index) in tabs' :class='{"cur":isCur == index}' @click='tabChange(index)'>{{tab.name}}</li>
    </ul>
  </div>
  <keep-alive>
    <component v-bind:is="tabView"></component>
  </keep-alive>
</div>
</template>
<script>
import userRegister from '@/components/agrements/userRegister'
import personal from '@/components/agrements/personal'
export default {
  name: 'agrement',
  components: {
    userRegister,
    personal
  },
  data() {
    return {
      tabs: [{
          name: '注册协议',
          com: 'userRegister',
        },
        {
          name: '隐私协议',
          com: 'personal',
        }
      ],
      tabView: 'userRegister',
      isCur: 0,
    }
  },
  methods: {
    tabChange: function(index) {
      this.isCur = index
      this.tabView = this.tabs[index].com;
    }

  },
}
</script>
<style lang='less' scoped>
.main {
    .top {
        width: 100%;

        ul {
            li {
                width: 49.8%;
                float: left;
                font-size: 0.3rem;
                line-height: 1rem;
                border-bottom: 1px solid #D2D3D5;
                border-right: 1px solid #D2D3D5;
            }
            li:last-child {
                border-right: none;
            }
            .cur {
                border-bottom: 1px solid #BD9D62;
                color: #BD9D62;
            }
        }
    }
}
</style>