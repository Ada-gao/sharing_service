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
          <my-select :options='option' @chooseOne='select' :place='place' v-model='sexVal'></my-select>
        </span>
      </li>
    </ul>
  </div>
  <div class="list lists">
    <ul class='listUl'>
      <li class='special clearfix'>证件类型：
        <span class='most'>
          <my-select :options='options' @chooseTwo='selects' :place='places' v-model='typeVal'></my-select>
        </span>
      </li>
      <li>证件号码：</i><input type="text" name="" value="" v-model='number' @keyup='test()'></li>
      <li>证件有效期起始时间：</i><input type="date" name="" value="" v-model='start_time'></li>
      <li>证件有效期结束时间：</i><input type="date" name="" value="" v-model='end_time' '></li>
      <li>地址：</i><input type="text" name="" value="" v-model='adress ''></li>
      <li>出生日期：</i><input type="date" name="" value="" v-model='birth'></li>
    </ul>
  </div>
  <div class="text">
    <p>{{this.codeMsg}}</p>
  </div>
  <button class='sureButton' type="button" name="button" @click='submit()'>提交</button>
</div>
</template>
<script type="text/javascript">
import mySelect from '@/components/common/select'
import {
  Header,
  MessageBox
} from 'mint-ui';
import Vue from 'vue'
Vue.component(Header.name, Header);
import user from '@/http/api'

import {
  fmtDate,
  get
} from '../../help'
export default {
  name: 'uploadImg',
  components: {
    mySelect
  },
  data() {
    return {
      option: [{
        text: '男',
        value: 0
      }, {
        text: '女',
        value: 1
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
      placeVal: 0,
      places: '身份证',
      placesVal: 0,
      name: this.name,
      sexVal: this.sexVal,
      typeVal: this.typeVal,
      number: this.number,
      start_time: this.start_time,
      end_time: this.end_time,
      adress: this.adress,
      birth: this.birth,
      id_front_url: this.$route.query.list[0],
      id_back_url: this.$route.query.list[1],
      id: this.$route.query.client_certification_id,
      codeMsg: '',
    }
  },
  methods: {
    select(option) {
      this.sexVal = option.value
    },
    selects(options) {
      this.typeVal = options.value
    },
    test() {
      let rule = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/
      if (!this.number || rule.test(this.numbe)) {
        this.codeMsg = '请输入正确的证件号码'
      } else {
        this.codeMsg = ''
      }
    },
    submit() {
      if (!this.sexVal) {
        this.sexVal = this.placeVal
        this.typeVal = this.typeVal
      } else if (!this.typeVal) {
        this.sexVal = this.sexVal
        this.typeVal = this.placesVal
      }
      if (!this.sexVal && !this.typeVal) {
        this.sexVal = this.placeVal
        this.typeVal = this.placesVal
      }

      if (!this.name) {
        this.codeMsg = '请输入您的名称'
      } else if (!this.number) {
        this.codeMsg = '请输入正确的证件号码'
      } else if (!this.start_time || !this.end_time || !birth) {
        this.codeMsg = '请选择日期'
      } else if (!adress) {
        this.codeMsg = '请输入地址'
      } else {
        this.realName()
      }
    },
    realName() {
      let token = get('token');
      let header = {
        'X-Token': JSON.parse(token)
      }
      let data = {
        "id_type": this.typeVal,
        "id_no": this.number,
        "id_start_date": fmtDate(this.start_time),
        "id_expiration": fmtDate(this.end_time),
        "address": this.address,
        "birthday": fmtDate(this.birth),
        "id_front_url": this.id_front_url,
        "id_back_url": this.id_back_url
      }
      user.realName(this.id, header, data)
        .then((res) => {
          comsole.log(res)
          if (res.data.code == 200) {
            MessageBox(res.data.message)
          } else {
            MessageBox(res.data.message)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
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
    .text {
        height: 1rem;
        p {
            color: red;
            padding-top: 0.4rem;
        }
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
