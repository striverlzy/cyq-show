<template>
  <div>
    <Header></Header>
    <div class="wrapper activities">
      <div class="activity-card-list">
        <div class="top-title">
          <h4 class="latest">最新活动</h4>
          <div class="clearfix"></div>
        </div>
        <div class="activity-list">
          <ul class="activity" style="text-align: left" v-for="(item,index)  in info.gatheringList" :key="index">
            <li class="activity-item">
              <div class="activity-inner">
                <a @click="getDetail(item)"></a>
                <div class="img" style="width: 277px;height: 181px">
                  <a :href="hrefUrl" @click="getDetail(item)" target="_blank"><img :src="item.gatheringImage" alt=""/></a>
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
            <!--            <li class="activity-item">-->
            <!--              <div class="activity-inner">-->
            <!--                <a href="http://"></a>-->
            <!--                <div class="img">-->
            <!--                  <a href="@/assets/activity-detail.html" target="_blank"><img src="@/assets/img/activity3.png" alt=""/></a>-->
            <!--                </div>-->
            <!--                <div class="text">-->
            <!--                  <p class="title">2020(第二届)海口国际新能源</p>-->
            <!--                  <div class="fl goin">-->
            <!--                    <p>时间：2020-01-10 周五</p>-->
            <!--                    <p>城市：广州</p>-->
            <!--                  </div>-->
            <!--                  <div class="fr btn">-->
            <!--                    <span class="sui-btn btn-bao">活动结束</span>-->
            <!--                  </div>-->
            <!--                  <div class="clearfix"></div>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </li>-->

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
                hrefUrl: '',
                info: {
                    gatheringList: [],
                    params: {
                        gatheringId: '',
                        gatheringTitle: '',
                        userId: '',
                        page: 1,
                        size: 3,
                        total: 0
                    }
                }
            }
        },
        methods: {
            getDetail(item){
                this.hrefUrl = 'http://localhost:10002/#/gathering/detail?gatheringId=' + item.gatheringId

                // this.$router.push({path: url})
            },
            getLoadData() {
                this.$Loading.start();
                let params = {
                    isHost: '0',
                    state: '',
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
                this.getLoadData()
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
