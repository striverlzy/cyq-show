<template>
  <div>
    <div class="fl rights">
      <div class="activity">
        <ul class="gatheringList">
          <li class="acti" v-for="(item,index) in info.gatheringList" :key="index">
            <a v-if="index<2" :href="hrefUrl" @click="viewGathering(item.gatheringId)" target="_blank"><img
              style="width: 300px;height: 196px;" :src="item.gatheringImage"/></a>
          </li>
        </ul>
      </div>
      <div class="question-list">
        <h3 class="title">热门回答</h3>
        <div class="lists">
          <ul>
            <li class="list-item"><p class="list-title">红旗H9值得入手吗？大家怎么看？</p>
              <p class="authorInfo"><span class="authorName"><img src="@/assets/img/widget-photo.png"
                                                                  alt=""/>于无声处</span> <span>1月8日 20:19</span></p>
            </li>
            <li class="list-item"><p class="list-title">20万居家SUV大家有什么推荐吗？</p>
              <p class="authorInfo"><span class="authorName"><img src="@/assets/img/widget-myphoto.jpg"
                                                                  alt=""/>白菜白了又菜</span> <span>1月6日 10:28</span>
              </p>
            </li>
            <li class="list-item"><p class="list-title">雨刮器多久换一次比较合适？</p>
              <p class="authorInfo"><span class="authorName"><img src="@/assets/img/widget-movie.png"
                                                                  alt=""/>清风小神童</span> <span>1月7日 14:43</span></p>
            </li>
            <li class="list-item"><p class="list-title">汽车下了个杀毒软件删完东西之后360全息影像不好使怎么回事？</p>
              <p class="authorInfo"><span class="authorName"><img src="@/assets/img/widget-photo.png"
                                                                  alt=""/>玻璃筒</span> <span>1月8日 13:34</span></p>
            </li>
            <li class="list-item"><p class="list-title">汽车下了个杀毒软件删完东西之后360全息影像不好使怎么回事？</p>
              <p class="authorInfo"><span class="authorName"><img src="@/assets/img/widget-photo.png"
                                                                  alt=""/>玻璃筒</span> <span>1月8日 13:34</span></p>
            </li>
          </ul>
          <a class="sui-btn btn-block btn-bordered btn-more">查看更多</a>
        </div>
      </div>
      <div class="activity-list">
        <h3 class="title">活动日历</h3>
        <div class="list">
          <ul>
            <li class="list-item" v-for="(item,index) in info.gatheringList" :key="index">
              <p class="list-time"> {{item.startDate}} {{item.address}}</p>
              <div class="list-content clearfix">
                <div class="fl img">
                  <img style="width: 60px;height: 34px;" :src="item.gatheringImage" alt=""/>
                </div>
                <div>
                  <p>{{item.title}}</p>
                </div>
              </div>
            </li>
          </ul>
          <a class="sui-btn btn-block btn-bordered btn-more" @click="refreshGatheingList()">{{isRefreshGatheringtitle}}
            <Spin v-if="isRefreshGatering" style="display: inline-block;"></Spin>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import '@/assets/css/page-sj-headline-login.css'
    import {getGathering} from '@/pages/api/gathering'

    export default {
        data() {
            return {
                hrefUrl: '',
                isRefreshArticle: false,
                isRefreshGatering: false,
                isRefreshQuestion: false,
                isRefreshQuestiontitle: "查看更多",
                isRefreshArticletitle: "换一批",
                isRefreshGatheringtitle: "查看更多",
                info: {
                    params: {
                        categoryId: '',
                        filterContent: '',
                        title: '',
                        page: 1,
                        size: 3,
                        total: 0
                    },
                    categoryList: [],
                    articleList: [],
                    gatheringList: [],
                    gatheringParams: {
                        isHost: '0',
                        state: '',
                        page: 1,
                        size: 5,
                        total: 0
                    },
                }
            }
        },
        methods: {
            clearData() {
                this.info.params.filterContent = ''
                this.info.params.page = 1
                this.info.params.size = 3
            },
            refreshGatheingData() {
                this.isRefreshGatering = true
                this.isRefreshGatheringtitle = "加载中"
                let total = this.info.gatheringParams.total
                let size = this.info.gatheringParams.size
                let index = Math.ceil(total / size)
                let page = this.info.gatheringParams.page
                if (page < index) {
                    page++
                    this.info.gatheringParams.page = page
                } else {
                    this.info.gatheringParams.page = 1
                }
            },
            async refreshGatheingList() {
                await this.refreshGatheingData()
                this.getGathering()
            },
            getGathering() {
                this.$Loading.start();
                let params = {
                    isHost: '1',
                    state: '',
                    page: this.info.gatheringParams.page,
                    size: this.info.gatheringParams.size
                }
                getGathering(params).then((res) => {
                    if (res) {
                        let rowList = res.data.data.rows
                        let gatheringList = []
                        for (let i = 0; i < rowList.length; i++) {
                            const {gatheringId, title, startDate, gatheringImage, address} = rowList[i]
                            gatheringList.push({
                                address: address,
                                gatheringId: gatheringId,
                                title: title,
                                startDate: startDate,
                                gatheringImage: gatheringImage
                            })
                        }
                        this.info.gatheringList = gatheringList
                        this.info.gatheringParams.total = res.data.data.total
                    }
                    this.isRefreshGatering = false
                    this.isRefreshGatheringtitle = "查看更多"
                    this.$Loading.finish();
                })
            },
            loadData() {
                this.clearData()
                this.getGathering()
            }
        },
        created() {
            this.loadData()
        }
    }
</script>
<style>
  .gatheringList li {
    list-style-type: none
  }
</style>
