<template>
  <div>
    <Header></Header>
    <div class="wrapper activities" style="text-align: left">
      <h1>{{params.title}}</h1>
      <div class="img-text">
        <div class="left-img">
          <img style="width: 700px;height: 350px"
               :src="params.gatheringImage" alt=""/>
        </div>
        <div class="right-txt">
          <p>开始时间： {{params.startDate}} {{startWeek}}</p>
          <p>结束时间： {{params.endDate}} {{endWeek}}</p>
          <p>举办地点： {{params.address}}</p>
          <p>报名人数：{{params.signNum}} </p>
          <p>报名截止：
            <span v-if="!isSignEnd">
          <span class="big">{{days}}</span>天 <span class="big">{{hours}}</span>时 <span
              class="big">{{minutes}}</span>分 <span
              class="big">{{seconds}}</span>秒
            </span>
            <span v-else>{{params.signEnd}}</span>
          </p>
          <div class="join">
            <button class="sui-btn btn-danger" v-if="!isSignEnd && !isSignUp" @click="signUp">立即报名</button>
            <button class="sui-btn btn-danger" v-if="isSignUp" disabled>已报名</button>
            <button class="sui-btn btn-danger" v-if="isSignEnd && !isSignUp" disabled>立即报名</button>
            <span class="will" v-if="!isEnd && !isSignEnd">火热进行中</span>
            <span class="will" v-if="!isEnd && isSignEnd">报名已截止</span>
            <span class="will" v-if="isEnd">活动已截止</span>
          </div>
        </div>
      </div>
      <div class="simple-text">
        <div class="left-content">
          <div class="content-item">
            <div class="tit">
              <span>大会介绍</span>
            </div>
            <div class="text">
              {{params.introduction}}
            </div>
          </div>
          <div class="content-item">
            <div class="tit">
              <span>大会详情</span>
            </div>
            <div class="text">
              {{params.detail}}
            </div>

          </div>
        </div>
        <div class="right-intro">
          <div class="content-item">
            <div class="tit">
              <span>活动组织者</span>
            </div>
            <div class="text">
              <p>主办方： {{params.sponsor}}</p>
            </div>
          </div>
          <div class="content-item">
            <div class="tit">
              <span>相关链接</span>
            </div>
            <div class="text">
              <p>活动官网：{{params.internetUrl}}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>

    import Header from '@/components/Header'
    import {findGathingById, signUp, findRecord} from '@/pages/api/gathering'
    import '@/assets/css/page-sj-activity-detail.css'

    export default {
        data() {
            return {
                isSignUp: false,
                isEnd: false,
                isSignEnd: false,
                gatheringId: '',
                params: {},
                startWeek: '',
                endWeek: '',
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                signEnd: '',
                endDate: '',
                userId: ''
            }
        },
        methods: {
            //倒计时
            countTime() {
                // 定义结束时间戳
                const signEnd = Date.parse(new Date(this.signEnd.replace(/-/, "/")))
                const end = Date.parse(new Date(this.endDate.replace(/-/, "/")))
                // 定义当前时间戳
                const now = Date.parse(new Date())
                // 做判断当倒计时结束时都为0
                if (now >= signEnd) {
                    this.isSignEnd = true
                    return
                }
                if (now >= end) {
                    this.isEnd = true
                    return
                }
                // 用结束时间减去当前时间获得倒计时时间戳
                const msec = end - now
                let days = parseInt(msec / 1000 / 60 / 60 / 24) //算出天数
                let hours = parseInt(msec / 1000 / 60 / 60 % 24)//算出小时数
                let minutes = parseInt(msec / 1000 / 60 % 60)//算出分钟数
                let seconds = parseInt(msec / 1000 % 60)//算出秒数
                //给数据赋值
                this.days = days
                this.hours = hours > 9 ? hours : '0' + hours
                this.minutes = minutes > 9 ? minutes : '0' + minutes
                this.seconds = seconds > 9 ? seconds : '0' + seconds
                //定义this指向
                const that = this
                // 使用定时器 然后使用递归 让每一次函数能调用自己达到倒计时效果
                setTimeout(function () {
                    that.countTime()
                }, 1000)
            },
            signUp() {
                this.$Loading.start();
                let params = {
                    gatheringId: this.params.gatheringId,
                    gatheringTitle: this.params.title,
                    userId: this.userId || '',
                    page: 1,
                    size: 1
                }
                signUp(params).then((res) => {
                    if (res.data.code === 20000) {
                        this.$Message.success('报名成功');
                        this.isSignUp = true
                        this.loadData()
                    }
                    this.$Loading.finish();
                })
            },
            getRecord() {
                let params = {
                    gatheringId: this.gatheringId,
                    gatheringTitle: "",
                    userId: this.userId || '',
                    page: 1,
                    size: 1
                }
                findRecord(params).then((res) => {
                    if (res.data.data.content.length > 0) {
                        this.isSignUp = true
                    }
                })
            },
            async loadData() {
                this.$Loading.start();
                await this.getRecord()
                await findGathingById(this.gatheringId).then((res) => {
                    this.params = res.data.data[0]
                    let day = ["日", "一", "二", "三", "四", "五", "六"]
                    let startWeek = new Date(this.params.startDate.replace(/-/, "/")).getDay()
                    let endWeek = new Date(this.params.endDate.replace(/-/, "/")).getDay()
                    this.startWeek = "周" + day[startWeek]
                    this.endWeek = "周" + day[endWeek]
                    this.endDate = this.params.endDate
                    this.signEnd = this.params.signEnd
                    this.$Loading.finish();
                })
                this.countTime()
            }
        },
        mounted() {
            this.loadData()
            // this.countTime()
        },
        created() {
            this.gatheringId = this.$route.query.gatheringId
            let userInfo = window.localStorage.getItem('USER')
            let userList = JSON.parse(userInfo)
            this.userId = userList.userId
        },
        components: {
            Header
        }
    }

</script>
