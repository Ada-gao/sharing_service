<template>
<div class="uploadImg">
  <!-- <mt-header class='title' title="实名认证">
    <router-link :to="{path:'activeRegister'}" slot="left">
      <mt-button icon="back"></mt-button>
    </router-link>
  </mt-header> -->
  <p class='txt'>证件信息</p>
  <div class="card">
    <!-- <span>证件类型：</span> -->
    证件类型：
    <span class='select' style='position:relative;'>
      <my-select :options='options' @chooseOne='select' @deleteSrc='deleteImg()' :place='place' v-model='type'></my-select>
      <i class='iconfont icon-gengduo' style='width:20px;height:20px;display:inline-block;position:absolute;top:3px;right:-17px;'></i>
    </span>
  </div>
  <div class="card photo">
    <span>上传证件照</span>
    <span class='select'>（请上传清晰的原件或复印件）</span>
  </div>
  <!-- <div class="select">
    <my-select :options='options' @chooseOne='select' @deleteSrc='deleteImg' :place='place' v-model='type'></my-select>
    <i class="iconfont icon-xialajiantou"></i>
  </div> -->
  <div class="img">
    <div class="box1">
      <label for="input"></label>
      <input ref='input' id='input' type='file' accept="image/*" @change="getImg(0)" />
      <img :src="imgsrc" alt=" ">
    </div>
    <p class='front'>正面</p>
    <div class="box2 " v-show='imgShow'>
      <div class="pic ">
        <div class="">
          <label for="inputer"></label>
          <input ref='inputer' id='inputer' type="file" accept="image/*" @change="getImg(1)" />
          <img :src="imgsrcs" alt=" ">
        </div>
        <p class='back'>背面</p>
      </div>
    </div>
  </div>
  <button class='sureButton ' type="button " name="button" @click='submit()'>提交</button>
</div>
</template>
<script type="text/javascript">
import mySelect from '@/components/common/select'
import {
  MessageBox,
  Header,
} from 'mint-ui';
import Vue from 'vue'
Vue.component(Header.name, Header);
import user from '@/http/api'
import {
  gett,
  sett,
} from '../../help'

import front from '../../assets/images/front.png'
import back from '../../assets/images/back.png'

export default {
  name: 'uploadImg',
  components: {
    mySelect
  },
  data() {
    return {
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
      place: '请选择证件类型',
      imgShow: true,
      imgsrc: front,
      imgsrcs: back,
      type: this.type,
      imgFiles: [],
      defaultImg: 'this.src="' + front + '"',
      defaultImgs: 'this.src="' + back + '"',
    }
  },
  methods: {
    select(item) {
      // this.$refs.input.setAttribute('type', 'file')
      // this.$refs.inputer.setAttribute('type', 'file')
      this.type = item.value
      if (item.value != 1) {
        this.imgShow = false
      } else {
        this.imgShow = true
      }
    },
    choose() {
      this.popupVisible = true
    },
    // 切换select时清除图片路径
    deleteImg() {
      this.imgFiles = []
      this.imgsrc = front
      this.imgsrcs = back
    },
    getImg(index) {
      var _this = this;
      var event = event || window.event;
      var file = event.target.files[0];
      var reader = new FileReader()
      if (typeof FileReader === 'undefined') {
        MessageBox('提示', '您的浏览器不支持图片上传，请升级您的浏览器');
        return false;
      }
      reader.onload = function(e) {
        // 压缩
        lrz(file, {
            quality: 0.5
          })
          .then(function(rst) {
            let formData = new FormData()
            formData.append('file', rst.file)
            let token = gett('token');
            let header = {
              'X-Token': token
            }
            _this.uploadImg(header, formData, index)
          }).catch(function(error) {
            console.log(error)
          })
      }
      reader.onerror = function() {
        MessageBox('提示', '上传失败，请稍后再试');
      }
      reader.readAsDataURL(file);
      if (index == 0) {
        this.$refs.input.value = null
        // _this.$refs.input.setAttribute('type', '')
      } else {
        this.$refs.inputer.value = null
        // _this.$refs.inputer.setAttribute('type', '')
      }
    },
    uploadImg(header, data, index) {
      user.uploadImg(header, data)
        .then((res) => {
          if (res.status == 200) {
            this.imgFiles[index] = res.data.file_url
            if (!this.imgFiles[0] && this.imgFiles[1]) {
              this.imgsrc = front
              this.imgsrcs = this.imgFiles[1]
            } else if (this.imgFiles[0] && !this.imgFiles[1]) {
              this.imgsrc = this.imgFiles[0]
              this.imgsrcs = back
            } else if (this.imgFiles[0] && this.imgFiles[1]) {
              this.imgsrc = this.imgFiles[0]
              this.imgsrcs = this.imgFiles[1]
            }
            sett('id_front_url', this.imgsrc)
            sett('id_back_url', this.imgsrcs)
          } else {
            MessageBox('提示', '上传失败，请稍后再试');
          }
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status == 504) {
              MessageBox.alert('登录信息已过期，请重新登录').then(action => {
                this.$router.push({
                  name: 'activeRegister'
                })
              });
            }
          }

        })
    },
    // 开始认证
    submit() {
      if (!this.type) {
        MessageBox('提示', '请选择证件类型')
      } else if (this.imgFiles.length == 0) {
        MessageBox('提示', '请先上传图片');
      } else {
        this.upload()
      }
    },
    upload() {
      let token = gett('token');
      let header = {
        'X-Token': token
      }
      user.certification(header)
        .then((res) => {
          // if (!this.type) {
          //   this.type = 0;
          // }
          if (this.imgFiles.length != 2 && this.type == 0) {
            MessageBox('请先上传完整的照片');
          } else {
            this.$router.push({
              name: 'userInfo',
              query: {
                id: res.data.client_certification_id,
              }
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted() {
    document.body.removeAttribute('class', 'add_bg')
    // if (!gett('token')) {
    //   MessageBox.alert('登录信息已过期，请重新登录').then(action => {
    //     this.$router.push({
    //       name: 'activeRegister'
    //     })
    //   });
    // }
  },
}
</script>
<style lang='less' scoped>
.uploadImg {
    height: 100%;
    background-color: #fff;
    .txt {
        padding-top: 0.48rem;
        padding-left: 0.2rem;
        text-align: left;
        font-size: 0.32rem;
        color: #4A4A4A;
        font-weight: 600;
    }
    .txt::before {
        content: '';
        display: inline-block;
        width: 0.06rem;
        height: 0.33rem;
        background: #C4902D;
        margin-right: 0.1rem;
        vertical-align: middle;
        margin-top: -0.05rem;
    }
    .add {
        border-radius: 8px;
    }
    .remove {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }
    .card {
        text-align: left;
        width: 100%;
        height: 0.95rem;
        line-height: 0.95rem;
        box-sizing: border-box;
        padding-left: 0.2rem;
        margin-top: 0.5rem;
        font-size: 0.3rem;
        color: #4A4A4A;
        border-bottom: 1px solid #E9E9E9;
        padding-bottom: 0.2rem;
        .select {
            width: 2.4rem;
            color: #DCDCDC;
            text-align: right;
            float: right;
            margin-right: 0.8rem;
            margin-top: -0.02rem;
        }
        .list {
            width: 100%;
        }
    }
    .photo {
        border: none;
        .select {
            float: none;
        }
    }
    .card::before {
        content: '*';
        display: inline-block;
        width: 0;
        height: 0;
        color: #E73838;
        margin-right: 0.2rem;
        vertical-align: top;
    }
    /* .select {
        width: 2.1rem;
        height: 0.6rem;
        margin: 0.35rem auto;
        position: relative;
        > .iconfont {
            width: 0.25rem;
            height: 0.16rem;
            font-size: 0.25rem;
            position: absolute;
            top: 0.2rem;
            right: 0;
        }
    } */
    .img {
        width: 4.2rem;
        margin: 0.45rem auto auto;
        > div {
            width: 100%;
            height: 2.7rem;
            position: relative;
            input {
                width: 100%;
                height: 100%;
                opacity: 0;
                display: none;
            }
            label {
                width: 100%;
                height: 3.22rem;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10;
            }
            .remove {
                display: none;
            }
            img {
                width: auto;
                height: auto;
                max-width: 100%;
                max-height: 100%;
            }
        }
        .box1 {
            border: 1px solid #ccc;
            /* background: url('../../assets/images/front.png') no-repeat center;
            background-size: 100%; */
        }
        .front {
            margin-bottom: 0.88rem;
            font-size: 0.24rem;
            color: #B0B0B0;
        }
        .back {
            margin-bottom: 1rem;
            font-size: 0.24rem;
            color: #B0B0B0;
        }
        .box2 {
            /* background: url('../../assets/images/back.png') no-repeat center;
          background-size: 100%; */
            .pic {
                width: 100%;
                height: 100%;
                border: 1px solid #ccc;
                > div {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    .sureButton {
        margin-top: 1rem;
    }
}
</style>
