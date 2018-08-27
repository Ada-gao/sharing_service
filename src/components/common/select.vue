<template>
<div class="selectWrap">
  <div class="choose" :class="this.ulShow ?'remove':'add'">
    <input :class="this.ulShow ?'remove':'add'" type="text" name="" value="" readonly @click='select()' :placeholder='place' v-model='selected'>
    <i class="iconfont icon-xialajiantou"></i>
    <ul v-show='ulShow'>
      <li v-for='(item,index) in options' @click='choose(item, index)'>{{item.text}}</li>
    </ul>
  </div>
</div>
</template>
<script type="text/javascript">
export default {
  props: ['options', 'place'],
  data() {
    return {
      ulShow: false,
      selected: this.selected,
      imgShow: true,
    }
  },
  methods: {
    select() {
      this.ulShow = !this.ulShow
    },
    choose(item, index) {
      this.selected = item.text
      this.ulShow = !this.ulShow
      this.$emit('chooseOne', item)
      this.$emit('chooseTwo', item)
      this.$emit('deleteSrc')
    }
  },
}
</script>
<style lang='less' scoped>
.selectWrap {
    width: 100%;
    height: 0.6rem;
    .add {
        border-radius: 8px;
    }
    .remove {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }
    .choose {
        width: 100%;
        height: 100%;
        input {
            width: 100%;
            height: 100%;
            border: 1px solid #AFAFAF;
            padding-left: 0.2rem;
            color: #666;
            position: relative;
        }
        input::-webkit-input-placeholder {
            color: #666;
        }
        ul {
            width: 100%;
            box-sizing: border-box;
            position: relative;
            z-index: 9999;
            li {
                background: #FFF;
                width: 100%;
                height: 0.72rem;
                border: 1px solid #979797;
                border-top: none;
                line-height: 0.72rem;
                font-size: 0.28rem;
                color: #666;
                text-align: left;
                padding-left: 0.2rem;
            }
        }
        i {
            width: 0.25rem;
            display: inline-block;
            position: absolute;
            top: 0;
            right: 0.2rem;
        }
    }
}
</style>
