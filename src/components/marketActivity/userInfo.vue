<template>
<div class="info">
  <mt-header class='title' title="实名认证">
    <router-link :to="{path:'uploadImg'}" slot="left">
      <mt-button icon="back"></mt-button>
    </router-link>
  </mt-header>
  <div class="list">
    <ul class='listUl'>
      <li class='one'>
        <p>客户信息</p>
      </li>
      <li>客户名称：</i><input type="text" name="" value="" v-model='name'></li>
      <li class='special clearfix'>客户性别：
        <span>
          <my-select :options='option' @chooseOne='select' :place='place' v-model='sex'></my-select>
        </span>
      </li>
    </ul>
  </div>
  <div class="list lists">
    <ul class='listUl'>
      <li class='special clearfix'>证件类型：
        <span class='most'>
          <my-select :options='options' @chooseTwo='selects' :place='places' v-model='type'></my-select>
        </span>
      </li>
      <li>证件号码：</i><input type="text" name="" value="" v-model='number'></li>
      <li>证件有效期起始时间：</i><input type="date" name="" value="" v-model='start_time'></li>
      <li>证件有效期结束时间：</i><input type="date" name="" value="" v-model='end_time'></li>
      <li>地址：</i><input type="text" name="" value="" v-model='adress'></li>
      <li>出生日期：</i><input type="date" name="" value="" v-model='birth'></li>
    </ul>
  </div>
  <button class='sureButton' type="button" name="button" @click='submit()'>提交</button>
</div>
</template>
<script type="text/javascript">
import mySelect from '@/components/common/select'
import {
  Header
} from 'mint-ui';
import Vue from 'vue'
Vue.component(Header.name, Header);
export default {
  name: 'uploadImg',
  components: {
    mySelect
  },
  data() {
    return {
      option: [{
        text: '男'
      }, {
        text: '女'
      }],
      options: [{
        text: '身份证',
        value: 0
      }, {
        text: '护照',
        value: 1
      }, {
        text: '军官证',
        value: 2
      }, {
        text: '其他',
        value: 3
      }],
      place: '男',
      places: '身份证',
      name: this.name,
      sex: this.sex,
      type: this.type,
      number: this.number,
      start_time: this.start_time,
      end_time: this.end_time,
      adress: this.adress,
      birth: this.birth,
    }
  },
  methods: {
    select(option) {
      this.sex = option.text
    },
    selects(options) {
      this.type = options.text
    },
    submit() {
      if (!this.sex) {
        this.sex = this.place
        this.type = this.type
      }
      if (!this.type) {
        this.sex = this.sex
        this.type = this.places
      }
      if (!this.sex && !this.type) {
        this.sex = this.place
        this.type = this.places
      }
      console.log(this.sex)
      console.log(this.type)
      // 转换时间戳
      let time = new Date(this.birth)
    }
  },
  mounted() {
    document.getElementsByTagName("body")[0].className = 'add_bg'

  },
  beforedestroy() {
    document.body.removeAttribute('class', 'add_bg')
  }
}
</script>
<style lang='less' scoped>
.info {
    font-size: 0.28rem;
    color: #333;
    .list {
        background: #fff;
        margin-bottom: 0.2rem;
        .listUl {
            > li {
                height: 0.88rem;
                border-bottom: 1px solid #D2D2D2;
                padding-left: 0.21rem;
                text-align: left;
                line-height: 0.88rem;
                span {
                    display: inline-block;
                    height: 100%;
                }
                select {
                    width: 5.61rem;
                    height: 0.6rem;
                    border: 1px solid #afafaf;
                    border-radius: 8px;
                    color: #666;
                }
                > p {
                    font-family: PingFangSC-Medium;
                    font-size: 0.3rem;
                    color: #333;
                }
            }
            li.one {
                height: 1.06rem;
            }
            li.special {
                box-sizing: border-box;
                line-height: 0.6rem;
                padding: 0.2rem 0 0.2rem 0.2rem;
                span {
                    margin-top: -0.1rem;
                    width: 5.4rem;
                    height: 0.6rem;
                    float: right;
                    margin-right: 0.4rem;
                    position: relative;
                }
                span.most {
                    position: relative;
                    z-index: 1;
                }
            }
        }
    }
    .lists {
        margin-bottom: 0;
    }
    .sureButton {
        margin-top: 1rem;
    }
    /* button {
        margin-top: 2.18rem;
        margin-bottom: 1.8rem;
        width: 6.5rem;
        height: 0.8rem;
        background: #B68458;
        border-radius: 10px;

    } */
}
</style>
