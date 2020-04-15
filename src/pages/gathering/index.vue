<template>
  <div>
    <Header></Header>
    <div class="wrapper activities">
      <div class="activity-card-list">
        <div class="top-title">
          <h4 class="latest" @click="cnewState()" :style="newState">最新活动</h4>
          <h4 class="latest" @click="chotState()" :style="hotState">最热活动</h4>
          <h4 class="latest" @click="cstopState()" :style="stopState">已结束活动</h4>
          <div class="clearfix"></div>
        </div>
        <div class="activity-list">
          <ul class="activity" style="text-align: left" v-for="(item,index)  in info.gatheringList" :key="index">
            <li class="activity-item">
              <div class="activity-inner">
                <a @click="getDetail(item)"></a>
                <div class="img" style="width: 277px;height: 181px">
                  <a :href="hrefUrl" @click="getDetail(item)" target="_blank"><img :src="item.gatheringImage"
                                                                                   alt=""/></a>
                </div>
                <div class="text">
                  <p class="title">{{item.title}}</p>
                  <div class="fl goin">
                    <p>时间：{{item.startDate}}</p>
                    <p>城市：{{item.address}}</p>
                  </div>
                  <div class="fr btn">
                    <span class="sui-btn btn-bao">立即报名</span>
                  </div>
                  <div class="clearfix"></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import Header from '@/components/Header'
    import {getGathering, signUp} from '@/pages/api/gathering'
    import '@/assets/css/page-sj-activity-index.css'

    export default {
        data() {
            return {
                newState: '',
                hotState: '',
                stopState: '',
                hrefUrl: '',
                info: {
                    gatheringList: [],
                    params: {
                        isHost: '0',
                        gatheringId: '',
                        state: '',
                        gatheringTitle: '',
                        userId: '',
                        page: 1,
                        size: 100,
                        total: 0
                    }
                }
            }
        },
        methods: {
           async cnewState() { // 最新活动
                this.newState = 'border-bottom: 2px solid #e64620;'
                this.hotState = ''
                this.stopState = ''
                await this.changeParam("0","0");
                this.getLoadData()
            },
            async chotState() { // 最热活动
                this.newState = ''
                this.hotState = 'border-bottom: 2px solid #e64620;'
                this.stopState = ''
                await this.changeParam("1","0");
                this.getLoadData()
            },
            async cstopState() { // 已结束活动
                this.newState = ''
                this.hotState = ''
                this.stopState = 'border-bottom: 2px solid #e64620;'
                await this.changeParam("0","1");
                this.getLoadData()
            },
            getDetail(item) {
                this.hrefUrl = 'http://localhost:10002/#/gathering/detail?gatheringId=' + item.gatheringId
            },
            changeParam(isHost,state){
                this.info.params.isHost = isHost
                this.info.params.state = state
            },
            getLoadData() {
                this.$Loading.start();
                let params = {
                    isHost: this.info.params.isHost,
                    state: this.info.params.state,
                    page: this.info.params.page,
                    size: this.info.params.size
                }
                getGathering(params).then((res) => {
                    if (res) {
                        this.info.gatheringList = res.data.data.rows
                        this.info.params.total = res.data.data.total
                    }
                    this.$Loading.finish();
                })
            },
            loadData() {
                this.cnewState()
            }
        },
        created() {
            this.loadData()
        },
        components: {
            Header
        }
    }
</script>
