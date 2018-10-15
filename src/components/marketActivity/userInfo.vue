<template>
<div class="info">
  <!-- <mt-header class='title' title="实名认证">
    <router-link :to="{path:'uploadImg'}" slot="left">
      <mt-button icon="back"></mt-button>
    </router-link>
  </mt-header> -->
  <p class='txt'>客户信息</p>
  <div class="list">
    <ul class='listUl'>
      <li>客户姓名：</i><input type="text" name="" value="" v-model='name' @keyup='show(1)' placeholder='请输入客户姓名'></li>
      <li class='special clearfix'>客户性别：
        <span class='sex'>
          <input type="radio" ref='man' name="sex" value="man" id="man" checked>
          <label for="man">男</label>
          <input type="radio" ref='woman' name="sex" value="female" id="female">
          <label for="female">女</label>
          <!-- <input type="radio" name="sex" value="man">男
          <input type="radio" name="sex" value="woman">女 -->
          <!-- <my-select :options='option' @chooseOne='select' :place='place' v-model='sexVal'></my-select> -->
          <!-- <i class="iconfont icon-xialajiantou"></i> -->
        </span>
      </li>
    </ul>
  </div>
  <div class="list lists">
    <ul class='listUl'>
      <li class='special clearfix'>证件类型：
        <span class='most'>
          <!-- <span class='select'> -->
          <my-select :options='options' @chooseTwo='selects' :place='place' v-model='typeVal'></my-select>
          <!-- </span> -->
          <!-- <my-select :options='options' @chooseTwo='selects' :place='places' v-model='typeVal'></my-select>
          <i class="iconfont icon-xialajiantou"></i> -->
        </span>
      </li>
      <li>证件号码：<input type="text" name="" value="" v-model='number' @keyup='show(2)' placeholder='请输入证件号码'></li>
      <li>证件有效期起始时间：<input type="text" v-model='start_time' @keyup='show(3)' @click='openPicker()' placeholder='请选择有效起始时间 〉' readonly />
        <mt-datetime-picker v-model="pickerVisible" type="date" ref='picker' year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirm" :startDate='startDate' :endDate='endDate'>
        </mt-datetime-picker>
      </li>
      <li>证件有效期结束时间：<input type="text" v-model='end_time' @keyup='show(3)' @click='openEnd()' placeholder='请选择有效结束时间 〉' readonly />
        <mt-datetime-picker v-model="endPickerVisible" type="date" ref='end' year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleSuccess" :startDate='startDate' :endDate='endDate'>
        </mt-datetime-picker>
      </li>
      <li>出生日期：<input type="text" name="" value="" v-model='birth ' @keyup='show(3)' @click='openBirth()' placeholder='请选择出生日期 〉' readonly />
        <mt-datetime-picker v-model="birthPickerVisible" type="date" ref='birth' year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleBirth" :startDate='birthStart' :endDate='birthEnd'>
        </mt-datetime-picker>
      </li>
      <li>地址：
        <input type="text" name="" value="" v-model='adress ' @keyup='show(4)' placeholder='请输入地址'></li>
    </ul>
  </div>
  <div class="text">
    <p>{{this.codeMsg}}</p>
  </div>
  <button class='sureButton ' type="button" name="button" @click='submit() '>提交</button>
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
import {
  DatetimePicker
} from 'mint-ui';
Vue.component(DatetimePicker.name, DatetimePicker);

import user from '@/http/api'

import {
  fmtDate,
  gett,
  timetap
} from '../../help'

export default {
  name: 'uploadImg',
  components: {
    mySelect
  },
  data() {
    return {
      // option: [{
      //   text: '男',
      //   value: 0
      // }, {
      //   text: '女',
      //   value: 1
      // }],
      options: [{
        text: '身份证',
        value: 1
      }, {
        text: '护照',
        value: 2
      }, {
        text: '军官证',
        value: 3
      }, {
        text: '其他',
        value: 4
      }],
      // place: '男',
      place: '请选择证件类型 〉',
      placeVal: 0,
      // places: '身份证',
      placesVal: 0,
      name: this.name,
      sexVal: 0,
      typeVal: this.typeVal,
      number: this.number,
      start_time: this.start_time,
      end_time: this.end_time,
      adress: this.adress,
      birth: this.birth,
      id: this.$route.query.id,
      codeMsg: '',
      pickerVisible: new Date(),
      endPickerVisible: new Date(),
      birthPickerVisible: new Date(),
      startDate: new Date('1910'),
      endDate: new Date('2050'),
      birthStart: new Date('1910'),
      birthEnd: new Date(),
    }
  },
  methods: {
    openPicker() {
      this.$refs.picker.open();
    },
    openEnd() {
      this.$refs.end.open();
    },
    openBirth() {
      this.$refs.birth.open();
    },
    handleConfirm() {
      this.start_time = fmtDate(this.pickerVisible)
    },
    handleSuccess() {
      this.end_time = fmtDate(this.endPickerVisible)
    },
    handleBirth() {
      this.birth = fmtDate(this.birthPickerVisible)
    },
    select(option) {
      this.sexVal = option.value
    },
    selects(options) {
      this.typeVal = options.value
      console.log(this.typeVal)
    },
    show(code) {
      switch (code) {
        case 1:
          if (!this.name) {
            this.codeMsg = '请输入您的名称'
          } else {
            this.codeMsg = ''
          }
          break
        case 2:
          const number_reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
          if (!number_reg.test(this.number)) {
            this.codeMsg = '请输入正确的证件号码'
          } else {
            this.codeMsg = ''
          }
          break
        case 3:
          if (!this.start_time || !this.end_time || !birth) {
            this.codeMsg = '请选择日期'
          } else {
            this.codeMsg = ''
          }
          break
        case 4:
          if (!this.adress) {
            this.codeMsg = '请输入地址'
          } else {
            this.codeMsg = ''
          }
          break
      }
    },
    submit() {
      if (this.$refs.man.checked) {
        this.sexVal = 0
      } else {
        this.sexVal = 1
      }
      var start_time = timetap(this.start_time)
      var end_time = timetap(this.end_time)
      const number_reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      if (!this.name) {
        this.codeMsg = '请输入您的名称'
      } else if (this.sexVal != 0 && this.sexVal != 1) {
        this.codeMsg = '请选择性别'
      } else if (!this.typeVal) {
        this.codeMsg = '请选择证件类型'
      } else if (!number_reg.test(this.number)) {
        this.codeMsg = '请输入正确的证件号码'
      } else if (!this.start_time || !this.end_time || !this.birth) {
        this.codeMsg = '请选择日期'
      } else if (start_time > end_time) {
        this.codeMsg = '请选择正确的证件有效期'
      } else if (!this.adress) {
        this.codeMsg = '请输入地址'
      } else {
        this.realName()
      }
    },
    realName() {
      let token = gett('token');
      let header = {
        'X-Token': token
      }
      let data = {
        "name": this.name,
        "gender": this.sexVal,
        "id_type": this.typeVal,
        "id_no": this.number,
        "id_start_date": fmtDate(this.start_time),
        "id_expiration": fmtDate(this.end_time),
        "address": this.address,
        "birthday": fmtDate(this.birth),
        "id_front_url": gett('id_front_url'),
        "id_back_url": gett('id_back_url')
      }
      user.realName(this.id, header, data)
        .then((res) => {
          console.log(res)
          if (res.data.code == 200) {
            this.$router.push({
              name: 'pass'
            })
          } else {
            this.$router.push({
              name: 'pass'
            })
            // MessageBox(res.data.message)
          }
        })
        .catch((err) => {
          if (err.response.status == 401) {
            MessageBox('请先登录');
          }
        })
    },
  },
  mounted() {
    document.getElementsByTagName("body")[0].className = 'add_bg'
    // if (!gett('token')) {
    //   MessageBox.alert('登录信息已过期，请重新登录').then(action => {
    //     this.$router.push({
    //       name: 'activeRegister'
    //     })
    //   });
    // }
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

    .txt {
        box-sizing: border-box;
        background-color: #fff;
        padding-top: 0.48rem;
        padding-left: 0.2rem;
        text-align: left;
        font-size: 0.32rem;
        color: #4A4A4A;
    }
    .txt::before {
        content: '';
        display: inline-block;
        width: 0.06rem;
        height: 0.3rem;
        background: #C4902D;
        margin-right: 0.1rem;
        vertical-align: middle;
    }
    .list {
        background: #fff;
        margin-bottom: 0.2rem;
        padding-top: 0.2rem;
        .listUl {

            > li {
                height: 1rem;
                border-bottom: 1px solid #E9E9E9;
                padding-left: 0.21rem;
                text-align: left;
                line-height: 1rem;
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
                input {
                    width: 3rem;
                    height: 0.88rem;
                    float: right;
                    font-size: 0.3rem;
                    /* text-align: right; */
                    margin-right: 0.2rem;
                }
                input::-webkit-input-placeholder {
                    color: #DCDCDC;
                    font-size: 0.3rem;
                }
                input[type="date"]::-webkit-clear-button {
                    display: none;
                }
                input[type=date]::-webkit-inner-spin-button {
                    visibility: hidden;
                }

                .sex {
                    label {
                        /* position: relative; */
                        /* top: 0.16rem;; */
                        font-size: 0.28rem;
                        color: #B7BABB;
                        line-height: 0.28rem;
                        margin-right: 0.4rem;
                    }
                    input[type="radio"] {
                        display: none;
                    }
                    input[type='radio']+label:before {
                        margin-top: -2px;
                        content: '';
                        display: inline-block;
                        width: 0.32rem;
                        height: 0.32rem;
                        margin-right: 0.2rem;
                        border-radius: 100%;
                        vertical-align: middle;
                        border: 1px solid #979797;
                        background: #FFFFFF;
                    }
                    input[type='radio']:checked+label:before {
                        border: 1px solid #3377FF;
                        background-color: #3377FF;
                        background-clip: content-box;
                        padding: 0.1em;
                        box-sizing: border-box;
                    }
                }
            }
            > li::before {
                content: '*';
                display: inline-block;
                width: 0;
                height: 0;
                color: #E73838;
                margin-right: 0.2rem;
                vertical-align: top;
            }
            /* li.one {
                height: 1.06rem;
            } */

            li.special {
                box-sizing: border-box;
                line-height: 1rem;
                /* padding: 0.2rem 0 0.2rem 0.2rem; */
                position: relative;
                span {
                    /* margin-top: -0.1rem; */
                    width: 2.7rem;
                    height: 1rem;
                    line-height: 1rem;
                    float: right;
                    margin-right: 0.5rem;
                    /* position: absolute; */
                }
                span.most {
                    width: 2.5rem;
                    /* position: relative; */
                    z-index: 1;
                    margin-right: 0.9rem;
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
}
</style>
