<template>
  <div>
    <Header ref="setQueryHandel" @backQueryHandel="doSearch"></Header>
    <Modal  ref="setModal" v-if="showModal"></Modal>
    <div class="sui-container wrapper">
      <div class="sj-content">
        <div class="left-nav">
          <div class="float-nav" id="float-nav">
            <ul class="sui-nav nav-tabs nav-xlarge tab-navbar tab-vertical">
              <li
                :class="{ active:index==isActive }"
                v-for="(item,index) in info.categoryList"
                :key="index"
                @click="categoryClickHandel(index,item.categoryId)"
              ><a>{{item.categoryName}}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="right-content">
          <div class="fl middle">
            <div class="carousel">
              <div class="sui-carousel slide">
                <div class="carousel-inner" style="min-width: 100%;max-width: 100%">
                  <Carousel autoplay v-model="carouselImage" loop>
                    <CarouselItem>
                      <a>
                        <div class="demo-carousel"><img style="width: 675px;height: 410px"
                                                        src="@/assets/img/lunbo2.png"/></div>
                      </a>
                    </CarouselItem>
                    <CarouselItem>
                      <a>
                        <div class="demo-carousel"><img style="width: 675px;height: 410px" src="@/assets/img/timg.jpg"/>
                        </div>
                      </a>
                    </CarouselItem>
                    <CarouselItem>
                      <a>
                        <div class="demo-carousel"><img style="width: 675px;height: 410px"
                                                        src="@/assets/img/lunbo2.png"/></div>
                      </a>
                    </CarouselItem>
                    <CarouselItem>
                      <a>
                        <div class="demo-carousel"><img style="width: 675px;height: 410px"
                                                        src="@/assets/img/lunbo2.png"/></div>
                      </a>
                    </CarouselItem>
                  </Carousel>
                </div>
              </div>
            </div>
            <div class="data-list">
              <ul id="data-list-down" class="headline loading">
                <li class="headline-item" v-for="(item,index)  in info.articleList" :key="index">
                  <div class="fl indexImg">
                    <img src=""/>
                  </div>
                  <div class="words">
                    <span style="cursor: pointer" @click="toArticleDetail(item.articleId)"><h3>{{item.title}}</h3><img
                      src="" class="vip"/></span>
                    <h5 class="author">
                      <div class="fl">
                        <span class="authorName"> <img :src="item.userImage" alt=""/>{{item.userName}}</span>
                        <span>{{item.createDate}}</span>
                      </div>
                      <div class="fr attention">
                        <span class="attentionText" v-if="item.isCollection === '0'"
                              @click="collection(item,index)">收藏</span>
                        <span class="attentionText" v-if="item.isCollection === '1'"
                              @click="unCollection(item.articleId,index)">取消收藏</span>
                        <span class="beforeclose" style="cursor: pointer;" v-if="item.isThumbup === '1'"
                              @click="unThumbup(item,index)"><Icon
                          type="ios-thumbs-up" size="20"/></span>
                        <span class="beforeclose" style="cursor: pointer;" v-if="item.isThumbup === '0'"
                              @click="thumbup(item,index)"><Icon type="ios-thumbs-up-outline" size="20"/></span>
                      </div>
                      <div class="clearfix"></div>
                    </h5>
                  </div>
                  <p class="content">
                    <span style="text-decoration:none;color:#333">{{item.filterContent}}</span></p>
                </li>
                <div class="stop">
                  <a @click="refreshArticleList()">{{isRefreshArticletitle}}
                    <Spin v-if="isRefreshArticle" style="display: inline-block;"></Spin>
                  </a>
                </div>
              </ul>
              <ul id="loaded" class="headline">
              </ul>
            </div>
          </div>
          <Right></Right>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import Right from '@/components/Right'
    import Modal from '@/components/Modal'
    import Header from '@/components/Header'
    import '@/assets/css/page-sj-headline-login.css'
    import {
        getCategory,
        findSearchArticle,
        collectionArticle,
        unCollection,
        thumbup,
        unthumbup,
        searchCollection
    } from '@/pages/api/article'
    import {getGathering} from '@/pages/api/gathering'

    export default {
        data() {
            return {
                showModal: false,
                hrefUrl: '',
                isRefreshArticle: false,
                isRefreshGatering: false,
                isRefreshQuestion: false,
                isRefreshQuestiontitle: "查看更多",
                isRefreshArticletitle: "换一批",
                isRefreshGatheringtitle: "查看更多",
                carouselImage: 0,
                isActive: "",
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
                },
            }
        },
        methods: {
            toArticleDetail(articleId) {
                let url = 'http://localhost:10002/articleDetail?articleId=' + articleId
                window.open(url, '_blank');
            },
            thumbup(item, index) {
                this.$Loading.start();
                thumbup(item.articleId).then((res) => {
                    if (res.data.code === 20000) {
                        this.$Message.success('点赞成功');
                        this.info.articleList[index].isThumbup = "1"
                    }
                    this.$Loading.finish();
                }).catch(error => {
                    this.$Message.error('点赞失败');
                    this.$Loading.error();
                })
            },
            unThumbup(item, index) {
                this.$Loading.start();
                unthumbup(item.articleId).then((res) => {
                    if (res.data.code === 20000) {
                        this.$Message.success('已取消点赞');
                        this.info.articleList[index].isThumbup = "0"
                    }
                    this.$Loading.finish();
                }).catch(error => {
                    this.$Message.error('取消点赞失败');
                    this.$Loading.error();
                })
            },
            collection(item, index) {
                this.$Loading.start();
                let params = {
                    articleId: item.articleId,
                    articleTitle: item.title || '',
                    userId: item.userId || '',
                    userImage: item.userImage || '',
                    userName: item.userName || ''
                }
                collectionArticle(params).then((res) => {
                    if (res.data.code === 20000) {
                        this.$Message.success('收藏成功');
                        this.info.articleList[index].isCollection = "1"
                    }
                    this.$Loading.finish();
                }).catch(error => {
                    this.$Message.error('收藏失败');
                    this.$Loading.error();
                })
            },
            unCollection(articleId, index) {
                this.$Loading.start();
                unCollection(articleId).then((res) => {
                    if (res.data.code === 20000) {
                        this.$Message.success('已取消收藏');
                        this.info.articleList[index].isCollection = "0"
                    }
                    this.$Loading.finish();
                }).catch(error => {
                    this.$Message.error('取消收藏失败');
                    this.$Loading.error();
                })
            },
            clearData() {
                this.info.params.filterContent = ''
                this.info.params.page = 1
                this.info.params.size = 3
            },
            changeContent(query) {
                this.info.params.filterContent = query
            },
            async doSearch(query) {
                await this.changeContent(query)
                this.getLoadData()
            },
            categoryHandel(index, id) {
                this.isActive = index
                this.info.params.categoryId = id
                this.clearData()
                this.$refs.setQueryHandel.clearQuery()
            },
            async categoryClickHandel(index, id) {
                await this.categoryHandel(index, id)
                this.getLoadData()
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
            getCategory() {
                this.$Loading.start();
                this.clearData()
                getCategory().then((res) => { // 获取分类名
                    if (res) {
                        this.info.categoryList = res.data.data
                        for (let i = 0; i < this.info.categoryList.length; i++) {
                            if (this.info.categoryList[0]) {
                                this.info.params.categoryId = this.info.categoryList[0].categoryId
                                this.getLoadData()
                                break
                            }
                        }
                    }
                    this.$Loading.finish();
                }).catch(error => {
                    this.$Loading.error();
                })
            },
            loadData() {
                this.showModal = true
                this.clearData()
                this.getCategory()
                this.getGathering()
            },
            refreshArticleData() {
                this.isRefreshArticle = true
                this.isRefreshArticletitle = "加载中"
                let total = this.info.params.total
                let size = this.info.params.size
                let index = Math.ceil(total / size)
                let page = this.info.params.page
                if (page < index) {
                    page++
                    this.info.params.page = page
                } else {
                    this.info.params.page = 1
                }
            },
            async refreshArticleList() {
                await this.refreshArticleData()
                this.getLoadData()
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
            getLoadData() {
                this.$Loading.start();
                let params = {
                    categoryId: this.info.params.categoryId,
                    filterContent: this.info.params.filterContent,
                    title: '',
                    page: this.info.params.page,
                    size: this.info.params.size
                }
                findSearchArticle(params).then((res) => { // 根据分类名查询信息
                    this.isRefreshArticle = false
                    this.isRefreshArticletitle = "换一批"
                    let data = res.data.data.rows
                    this.info.params.total = Number(res.data.data.total)
                    if (data) {
                        let list = []
                        const _this = this
                        for (let i = 0; i < data.length; i++) {
                            const {createDate, articleId, userId, userName, userImage, filterContent, title, isCollection, isThumbup} = data[i]
                            list.push({
                                isThumbup: isThumbup,
                                userId: userId,
                                isCollection: isCollection,
                                userName: userName,
                                userImage: userImage,
                                createDate: createDate.substring(5, 11),
                                filterContent: filterContent,
                                title: title,
                                articleId: articleId
                            })
                        }
                        this.info.articleList = list
                    }
                    this.$Loading.finish();
                }).catch(error => {
                    this.$Loading.error();
                })
            }
        },
        components: {
            Right,
            Header,
            Modal
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
