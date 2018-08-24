<template>
<div class="uploadImg">
  <p>证件信息 (请上传清晰的证件图片)</p>
  <div class="select">
    <my-select :options='options' @chooseOne='select' :place='place'></my-select>
  </div>
  <div class="img">
    <div class="box1">
    </div>
    <div class="box2" v-show='imgShow'>
    </div>
  </div>
  <button type="button" name="button">提交</button>
</div>
</template>
<script type="text/javascript">
import mySelect from '@/components/common/select'
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
    }
  },
  methods: {
    select(item) {
      this.text = item.text
      console.log(item.value)
      if (item.value != 0) {
        this.imgShow = false
      }
    },
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
            background-color: #ccc;
        }
        .box1 {
            margin-bottom: 0.88rem;
        }
    }
    button {
        margin-top: 1.4rem;
        width: 6.5rem;
        height: 0.8rem;
        background-color: #B68458;
        color: #fff;
        border-radius: 10px;
    }
}
</style>
