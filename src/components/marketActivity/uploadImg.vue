<template>
<div class="uploadImg">
  <p>证件信息 (请上传清晰的证件图片)</p>
  <div class="select">
    <my-select :options='options' @chooseOne='select' :place='place'></my-select>
  </div>
  <div class="img">
    <div class="box1">
      <label for="input"></label>
      <input id='input' type='file' accept="image/*" @change="getImg()" multiple />
      <img :src="imgsrc" alt=" ">
    </div>
    <div class="box2 ">
      <div class="pic " v-show='imgShow '>
        <label for="inputer"></label>
        <input id='inputer' type="file" accept="image/*" @change="getImgs()" multiple/>
        <img :src="imgsrcs" alt=" ">
      </div>
    </div>
  </div>
  <button class='sureButton ' type="button " name="button">提交</button>
</div>
</template>
<script type="text/javascript">
import mySelect from '@/components/common/select'
import {
  MessageBox
} from 'mint-ui';
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
      text: '',
      place: '身份证',
      imgShow: true,
      imgsrc: '',
      imgsrcs: '',
    }
  },
  methods: {
    select(item) {
      this.text = item.text
      console.log(item.value)
      if (item.value != 0) {
        this.imgShow = false
      } else {
        this.imgShow = true
      }
    },
    getImg() {
      var _this = this;
      var event = event || window.event;
      var file = event.target.files[0];
      var reader = new FileReader()
      if (typeof FileReader === 'undefined') {
        MessageBox('您的浏览器不支持图片上传，请升级您的浏览器');
        return false;
      }
      reader.onload = function(e) {
        _this.imgsrc = e.target.result;
      }
      reader.onerror = function() {
        MessageBox('上传失败，请稍后再试');
      }
      reader.readAsDataURL(file);
    },
    getImgs() {
      var _this = this;
      var event = event || window.event;
      var file = event.target.files[0];
      var reader = new FileReader()
      if (typeof FileReader === 'undefined') {
        MessageBox('您的浏览器不支持图片上传，请升级您的浏览器');
        return false;
      }
      reader.onload = function(e) {
        _this.imgsrcs = e.target.result;
      }
      reader.onerror = function() {
        MessageBox('上传失败，请稍后再试');
      }
      reader.readAsDataURL(file);
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
                width: 100%;
                height: 100%;
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
}
</style>
