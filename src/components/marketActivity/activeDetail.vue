<template>
  <div class="detail">
    <div class="banner">
      <img src="../../assets/images/banner.png" alt="">
    </div>
    <div class="infos">
      <p>{{list.activityName}}</p>
      <ul>
        <li>
          <span class='one'>活动编号: </span>
          <span class='two'>{{list.activityCode}}</span>
        </li>
        <li>
          <span class='one'>活动时间: </span>
          <span class='two'>{{list.activityTime}}</span>
        </li>
        <li>
          <span class='one'>报名时间: </span>
          <span class='two'>{{list.registrationTime}}</span>
        </li>
        <li>
          <span class='one'>活动人数: </span>
          <span class='two'>{{list.activityNumber}}</span>
        </li>
        <li>
          <span class='one '>活动负责人: </span>
          <span class='two man'>
            <a v-for='i in list.man'>{{i.val}}</a>
          </span>
        </li>
        <li>
          <span class='one'>活动所属部门: </span>
          <span class='two dept'>
            <a v-for='item in list.dept'>{{item.val}}</a>
          </span>
        </li>
        <li>
          <span class='one'>活动地点: </span>
          <span class='two'>{{list.activitySite}}</span>
        </li>
      </ul>
    </div>
    <div class="introduction">
      <p class='txt'>活动简介：</p>
      <p>{{list.introduction}}</p>
    </div>
    <router-link tag='button' class='sureButton' :to="{ path: 'activeRegister' }">立即报名</router-link>
  </div>
</template>
<script type="text/javascript">
import user from '@/http/api'
import {timetampToTime} from '../../help'
  export default{
    name:'activeDetail',
    data(){
      return{
        id:'4',
        list:{},
      }
    },
    methods:{
      go(){
        this.$router.push({
          name:'activeRegister'
        })
      },
      activeDetail(){
        let id = this.id
        user.showActivity(id)
        .then((res)=>{
          if(res.status == 200){
            console.log(res.data)
            this.list = {
              activityName : res.data.activityName,
              activityCode : res.data.activityCode,
              activityTime : timetampToTime(res.data.activityStart) +'--'+timetampToTime(res.data.activityEnd),
              registrationTime : timetampToTime(res.data.registrationStart) +'--'+timetampToTime(res.data.registrationEnd),
              activityNumber : res.data.activityActivitiesNumber + '人',
              man : res.data.activityForeendPictureList,
              dept : res.data.activityRangeDeptList,
              activitySite : res.data.activitySite,
              introduction:res.data.activityIntroduction
            }
          }
        })
        .catch((err)=>{
          console.log(err.response)
        })
      }
    },
    created(){
      this.activeDetail()
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
          height:0.6rem;
          text-align:left;
          font-size: 0.3rem;;
          color: #4A4A4A;
          .two{
            margin-left: 0.7rem;
            a{
              font-size:0.3rem;
              padding:0 0.1rem;
            }
          }
          .dept{
              margin-left: 0;
          }
          .man{
            margin-left: 0.4rem;
          }
          .one{
            float: left;
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
      .txt{
        margin-bottom: 0.2rem;
      }
    }
    .sureButton{
      margin: 0 auto;
      margin-top: 1.4rem;
    }
  }
</style>