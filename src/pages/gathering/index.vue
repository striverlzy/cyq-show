<template>
  <div>
    <Header ref="setQueryHandel" @backQueryHandel="doSearch"></Header>
    <div class="wrapper activities">
      <div class="activity-card-list">
        <div class="top-title">
          <ul class="gatheringMenu">
            <li v-for="(item,index) in menus"
                :key="index"
                class="latest"
                @click="changeState(index,item)"
                :class="{ active:index==isActive }">{{item.name}}
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>
        <div class="activity-list" style="text-align: left">
          <ul class="activity">
            <li class="activity-item" v-for="(item,index)  in info.gatheringList" :key="index">
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
                    <button class="sui-btn btn-danger" v-if="!item.isSignUp" @click="signUp(item,index)">立即报名</button>
                    <button class="sui-btn btn-danger" v-if="item.isSignUp" disabled>已报名</button>
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
    import {getGathering, signUp, findRecord} from '@/pages/api/gathering'
    import '@/assets/css/page-sj-activity-index.css'

    export default {
        data() {
            return {
                isSignUp: false,
                isActive: 0,
                hrefUrl: '',
                userId: '',
                menus: [
                    {
                        id: '1',
                        name: "最新活动",
                        isHost: '0',
                        state: '0'
                    },
                    {
                        id: '2',
                        name: "最热活动",
                        isHost: '1',
                        state: '0'
                    },
                    {
                        id: '3',
                        name: "已结束活动",
                        isHost: '0',
                        state: '1'
                    }
                ],
                info: {
                    gatheringList: [],
                    params: {
                        detail: '',
                        isHost: '0',
                        gatheringId: '',
                        title: '',
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
            signUp(item, index) {
                this.$Loading.start();
                let params = {
                    gatheringId: item.gatheringId,
                    gatheringTitle: item.title,
                    userId: this.userId || '',
                    page: 1,
                    size: 1
                }

                signUp(params).then((res) => {
                    if (res.data.code === 20000) {
                        this.$Message.success('报名成功');
                        this.info.gatheringList[index].isSignUp = true
                        this.getLoadData()
                    }
                    this.$Loading.finish();
                })
            },
            async changeState(index, item) {
                this.$refs.setQueryHandel.clearQuery()
                this.isActive = index
                await this.changeParam(item.isHost, item.state)
                this.getLoadData()
            },
            changeContent(query) {
                this.info.params.detail = query
            },
            async doSearch(query) {
                await this.changeContent(query)
                this.getLoadData()
            },
            getDetail(item) {
                this.hrefUrl = 'http://localhost:10002/gathering/detail?gatheringId=' + item.gatheringId
            },
            changeParam(isHost, state) {
                this.info.params.detail = ''
                this.info.params.isHost = isHost
                this.info.params.state = state
            },
            getLoadData() {
                this.$Loading.start();
                let params = {
                    detail: this.info.params.detail,
                    isHost: this.info.params.isHost,
                    state: this.info.params.state,
                    page: this.info.params.page,
                    size: this.info.params.size
                }
                getGathering(params).then((res) => {
                    let resList = res.data.data.rows
                    let gatheringList = []
                    for (let i = 0; i < resList.length; i++) {
                        let isSignUp = false
                        const {signIds, startDate, gatheringId,gatheringImage, title, address} = resList[i]
                        if(signIds){
                            if (signIds.indexOf(this.userId) != -1) {
                                isSignUp = true
                            } else {
                                isSignUp = false
                            }
                        }
                        gatheringList.push({
                            gatheringImage,
                            startDate, gatheringId, title, address,
                            isSignUp
                        })
                    }
                    this.info.gatheringList = gatheringList
                    this.info.params.total = res.data.data.total

                    this.$Loading.finish();
                })
            },
            loadData() {
                this.getLoadData()
            }
        },
        mounted() {
            this.loadData()
        },
        created() {
            let userInfo = window.localStorage.getItem('USER')
            let userList = JSON.parse(userInfo)
            this.userId = userList.userId
        },
        components: {
            Header
        }
    }
</script>
<style scoped>
  .gatheringMenu li {
    list-style-type: none;
  }

  .active {
    border-bottom: 2px solid #e64620;
    padding-left: 30px;
    margin-right: 10px;
    cursor: pointer;
    /*border-bottom: 2px solid #e64620;*/
    font-size: 16px;
  }
</style>
