<template>
<div class="detail">
  <div class="banner">
    <img :src="list.imgSrc" alt="">
  </div>
  <div class="infos">
    <p>{{list.activityName}}</p>
    <ul>
      <li>
        <span class='one'>活动编号： </span>
        <span class='two'>{{list.activityCode}}</span>
      </li>
      <li>
        <span class='one'>活动时间： </span>
        <span class='two'>{{list.activityTime}}</span>
      </li>
      <li>
        <span class='one'>报名时间： </span>
        <span class='two'>{{list.registrationTime}}</span>
      </li>
      <li>
        <span class='one'>活动人数： </span>
        <span class='two'>{{list.activityNumber}}</span>
      </li>
      <li>
        <span class='one '>活动负责人： {{list.man}}</span>
      </li>
      <li>
        <span class='one'>活动所属部门： {{list.dept}} </span>
      </li>
      <li>
        <span class='one'>活动地点： {{list.activitySite}}</span>
        <!-- <span class='two'>{{list.activitySite}}</span> -->
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
import {
  timetampToTime,
  gett,
  sett,
  getParameterByName
} from '../../help'
export default {
  name: 'activeDetail',
  data() {
    return {
      list: {},
    }
  },
  methods: {
    go() {
      this.$router.push({
        name: 'activeRegister'
      })
    },
    activeDetail() {
      let activity_id = getParameterByName('activity_id')
      // console.log(activity_id)
      sett('activity_id', activity_id)
      user.showActivity(activity_id)
        .then((res) => {
          if (res.status == 200) {
            this.list = {
              imgSrc: res.data.activityBannerUrl,
              activityName: res.data.activityName,
              activityCode: res.data.activityCode,
              activityTime: timetampToTime(res.data.activityStart) + '-' + timetampToTime(res.data.activityEnd),
              registrationTime: timetampToTime(res.data.registrationStart) + '-' + timetampToTime(res.data.registrationEnd),
              activityNumber: res.data.activityActivitiesNumber + '人',
              man: res.data.activityPrincipal,
              dept: res.data.activityDept,
              activitySite: res.data.activitySite,
              introduction: res.data.activityIntroduction
            }
          }
        })
        .catch((err) => {
          console.log(err.response.data)
        })
    }
  },
  created() {
    this.activeDetail()
  },
  mounted() {
    document.getElementsByTagName("body")[0].className = 'add_bg'
    let share_id = getParameterByName('shareId')
    let dept_id = getParameterByName('dept_id')
    sett('share_id', share_id)
    sett('dept_id', dept_id)
  },
  beforedestroy() {
    document.body.removeAttribute('class', 'add_bg')
  }
}
</script>
<style lang='less' scoped>
.detail {
    .banner {
        /* background: url("../../assets/images/banner.png") bottom center no-repeat;
      background-size: cover; */
        height: 3.1rem;
        img {
            height: 100%;
        }
    }
    .infos {
        background-color: #ffffff;
        padding: 0.6rem;
        > p {
            font-size: 0.32rem;
            color: #2E2E2E;
            text-align: left;
            font-weight: 700;
        }
        ul {
            padding: 0.3rem 0;

            li {
                height: 0.6rem;
                text-align: left;
                font-size: 0.28rem;
                color: #4A4A4A;
                .two {
                    margin-left: 0.3rem;
                    a {
                        font-size: 0.28rem;
                        padding: 0 0.1rem;
                    }
                }
                .dept {
                    margin-left: 0;
                }
                .man {
                    margin-left: 0.4rem;
                }
                .one {
                    float: left;
                }
            }
        }
    }
    .introduction {
        text-align: left;
        background-color: #ffffff;
        padding: 0.3rem;
        margin-top: 0.5rem;
        > p {
            font-size: 0.3rem;
            color: #4A4A4A;
        }
        .txt {
            font-weight: 700;
            margin-bottom: 0.2rem;
        }
    }
    .sureButton {
        margin: 0.8rem auto 0;
    }
}
</style>