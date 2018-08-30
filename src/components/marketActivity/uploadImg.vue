<template>
<div class="uploadImg">
  <mt-header class='title' title="实名认证">
    <router-link :to="{path:'activeRegister'}" slot="left">
      <mt-button icon="back"></mt-button>
    </router-link>
  </mt-header>
  <p>证件信息 (请上传清晰的证件图片)</p>
  <div class="select">
    <my-select :options='options' @chooseOne='select' @deleteSrc='deleteImg' :place='place' v-model='type'></my-select>
    <i class="iconfont icon-xialajiantou"></i>
  </div>
  <div class="img">
    <div class="box1">
      <label for="input"></label>
      <input id='input' type='file' accept="image/*" @change="getImg(0)" multiple />
      <img :src="imgsrc" alt=" ">
    </div>
    <div class="box2 ">
      <div class="pic " v-show='imgShow'>
        <label for="inputer"></label>
        <input id='inputer' type="file" accept="image/*" @change="getImg(1)" multiple/>
        <img :src="imgsrcs" alt=" ">
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
  Header
} from 'mint-ui';
import Vue from 'vue'
Vue.component(Header.name, Header);
import user from '@/http/api'
import {
  gett,
  sett,
} from '../../help'

export default {
  name: 'uploadImg',
  components: {
    mySelect
  },
  data() {
    return {
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
      place: '身份证',
      imgShow: true,
      imgsrc: '',
      imgsrcs: '',
      type: this.type,
      imgFiles: [],
    }
  },
  methods: {
    select(item) {
      this.type = item.text
      if (item.value != 0) {
        this.imgShow = false
      } else {
        this.imgShow = true
      }
    },
    // 切换select时清除图片路径
    deleteImg() {
      this.imgsrc = ''
      this.imgsrcs = ''
    },
    getImg(index) {
      var _this = this;
      var event = event || window.event;
      var file = event.target.files[0];
      var reader = new FileReader()
      if (typeof FileReader === 'undefined') {
        MessageBox('您的浏览器不支持图片上传，请升级您的浏览器');
        return false;
      }
      reader.onload = function(e) {
        let formData = new FormData()
        formData.append('file', file)
        let token = gett('token');
        let header = {
          'X-Token': token
        }
        _this.uploadImg(header, formData, index)
      }
      reader.onerror = function() {
        MessageBox('上传失败，请稍后再试');
      }
      reader.readAsDataURL(file);
    },
    uploadImg(header, data, index) {
      user.uploadImg(header, data)
        .then((res) => {
          if (res.status == 200) {
            this.imgFiles[index] = res.data.file_url
            this.imgsrc = this.imgFiles[0]
            this.imgsrcs = this.imgFiles[1]
            sett('id_front_url', this.imgsrc)
            sett('id_back_url', this.imgsrcs)
            console.log(this.imgFiles)
          } else {
            MessageBox('上传失败，请稍后再试');
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 开始认证
    submit() {
      let token = gett('token');
      let header = {
        'X-Token': token
      }
      user.certification(header)
        .then((res) => {
          console.log(res)
          if (gett('id_front_url', 1000 * 60 * 60 * 24) && gett('id_back_url', 1000 * 60 * 60 * 24)) {
            this.$router.push({
              name: 'userInfo',
              query: {
                client_certification_id: res.data.client_certification_id,
              }
            })
          } else {
            MessageBox('请先上传图片');
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  mounted() {
    document.body.removeAttribute('class', 'add_bg')
  },
}
</script>
<style lang='less' scoped>
.uploadImg {
    height: 100%;
    background-color: #fff;
    > p {
        padding-top: 0.35rem;
        text-align: center;
        font-size: 0.3rem;
        color: #666;
    }
    .add {
        border-radius: 8px;
    }
    .remove {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }
    .select {
        width: 6.25rem;
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
    }
    .img {
        width: 5.09rem;
        margin: 0.45rem auto auto;
        > div {
            width: 100%;
            height: 3.22rem;
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
            margin-bottom: 0.88rem;
            border: 1px solid #ccc;
        }
        .box2 {
            .pic {
                width: 100%;
                height: 100%;
                border: 1px solid #ccc;
            }
        }
    }
    .sureButton {
        margin-top: 1.4rem;
    }
}
</style>
