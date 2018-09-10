<template>
  <div class="detail">
    <div class="banner">
      <img src="../../assets/images/banner.png" alt="">
    </div>
    <div class="infos">
      <p>解码未来“2018年独角兽企业投资经济投资经济投资经济</p>
      <ul>
        <li>
          <span class='one'>活动编号：</span>
          <span class='two'>H000021</span>
        </li>
        <li>
          <span class='one'>活动编号：</span>
          <span class='two'>H000021</span>
        </li>
      </ul>
    </div>
    <div class="introduction">
      <p>活动简介：</p>
      <p>1111111111111111111111111111111111111111111</p>
    </div>
    <button class='sureButton' type="button" name="button" @click='go'>立即报名</button>
  </div>
</template>
<script type="text/javascript">
  export default{
    name:'activeDetail',
    data(){
      return{
        
      }
    },
    methods:{
      go(){
        this.$router.push({
          name:'activeRegister'
        })
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
  .detail{
    .banner{
      /* background: url("../../assets/images/banner.png") bottom center no-repeat;
      background-size: cover; */
      height: 3.1rem;
      img{
        height:100%;
      }
    }
    .infos{
      background-color: #ffffff;
      padding:0.3rem;
      >p{
        font-size: 0.32rem;
        color: #2E2E2E;
        text-align:left;
      }
      ul{
        padding:0.3rem 0;
      
        li{
          text-align:left;
          font-size: 0.3rem;;
          color: #4A4A4A;
          .one{
            magrin-right:0.58rem;
          }
          
        }
      }
    }
    .introduction{
      text-align:left;
      background-color: #ffffff;
      padding:0.3rem;
      margin-top: 0.5rem;
      >p{
        font-size: 0.3rem;
        color: #4A4A4A;
      }
    }
    .sureButton{
      margin: 0 auto;
      margin-top: 1.64rem;
    }
  }
</style>