<template>
<div class="info">
  <div class="list">
    <ul class='listUl'>
      <li class='one'>
        <p>客户信息</p>
      </li>
      <li>客户名称：</i><input type="text" name="" value=""></li>
      <li class='special clearfix'>客户性别：
        <span>
          <my-select :options='option' @chooseOne='select' :place='place'></my-select>
        </span>

      </li>
    </ul>
  </div>
  <div class="list list2">
    <ul class='listUl'>
      <li class='special clearfix'>证件类型：
        <!-- <select class="" name="">
          <option value="">身份证</option>
          <option value="">护照</option>
        </select> -->
        <span class='most'>
          <my-select :options='options' @chooseOne='select' :place='places'></my-select>
        </span>
      </li>
      <li>证件号码：</i><input type="text" name="" value=""></li>
      <li>证件有效期起始时间：</i><input type="text" name="" value=""></li>
      <li>证件有效期结束时间：</i><input type="text" name="" value=""></li>
      <li>地址：</i><input type="text" name="" value=""></li>
      <li>出生日期：</i><input type="text" name="" value=""></li>
    </ul>

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
      option: [{
        text: '男'
      }, {
        text: '女'
      }],
      options: [{
        text: '护照'
      }, {
        text: '军官证'
      }, {
        text: '其他'
      }],
      text: '',
      place: '男',
      places: '身份证'

    }
  },
  methods: {
    select(item) {
      this.text = item.text
      console.log(this.text)
    },
  },
}
</script>
<style lang='less' scoped>
.info {
    font-size: 0.28rem;
    background: #F5F5F5;
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
    button {
        margin-top: 2.18rem;
        margin-bottom: 1.8rem;
        width: 6.5rem;
        height: 0.8rem;
        background: #B68458;
        border-radius: 10px;

    }
}
</style>
