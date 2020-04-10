<template>
  <div>

    <Header ref="setQueryHandel" @backQueryHandel="doSearch"></Header>
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
              ><a href="#">{{item.categoryName}}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="right-content">
          <div class="fl middle">
            <div class="carousel">
              <div class="sui-carousel slide">
                <!--              <ol class="carousel-indicators">-->
                <!--                <li data-target="#myCarousel" data-slide-to="0" ></li>-->
                <!--                <li data-target="#myCarousel" data-slide-to="1" class="active"></li>-->
                <!--                <li data-target="#myCarousel" data-slide-to="2"></li>-->
                <!--              </ol>-->
                <div class="carousel-inner" style="min-width: 100%;max-width: 100%">
                  <!--                <div class="active item">-->
                  <!--                  <img src="@/assets/img/lunbo2.png"/>-->
                  <!--                </div>-->
                  <!--                <div class="item">-->
                  <!--                  <img src="@/assets/img/lunbo2.png"/>-->
                  <!--                </div>-->
                  <!--                <div class="item">-->
                  <!--                  <img src="@/assets/img/lunbo2.png"/>-->
                  <!--                </div>-->
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
              <!--            <List item-layout="vertical"  class="headline loading">-->
              <!--              <ListItem v-for="item in data" :key="item.title" class="headline-item">-->
              <!--                <ListItemMeta :avatar="item.avatar" :title="item.title" :description="item.description" />-->
              <!--                {{ item.content }}-->
              <!--                <template slot="action">-->
              <!--                  <li>-->
              <!--                    <Icon type="ios-star-outline" /> 123-->
              <!--                  </li>-->
              <!--                  <li>-->
              <!--                    <Icon type="ios-thumbs-up-outline" /> 234-->
              <!--                  </li>-->
              <!--                  <li>-->
              <!--                    <Icon type="ios-chatbubbles-outline" /> 345-->
              <!--                  </li>-->
              <!--                </template>-->
              <!--                <template slot="extra">-->
              <!--                  <img src="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large" style="width: 280px">-->
              <!--                </template>-->
              <!--              </ListItem>-->
              <!--            </List>-->
              <!--            <div class="stop">-->
              <!--              <a href="javascript:;">加载更多 <i class="fa fa-refresh" aria-hidden="true"></i></a>-->
              <!--            </div>-->
              <ul id="data-list-down" class="headline loading">
                <li class="headline-item" v-for="(item,index)  in info.articleList" :key="index">

                  <div class="fl indexImg">
                    <img src=""/>
                  </div>
                  <div class="words">
                    <h3>{{item.title}}<span><img src="" class="vip"/></span></h3>
                    <h5 class="author">
                      <div class="fl">
                        <span class="authorName"> <img :src="item.userImage" alt=""/>{{item.userName}}</span>
                        <span>{{item.createDate}}</span>
                      </div>
                      <div class="fr attention">
                        <span class="attentionText">收藏</span>
                        <span class="beforeclose">  <Icon type="ios-thumbs-up" size="20"/></span>
                      </div>
                      <div class="clearfix"></div>
                    </h5>
                  </div>
                  <p class="content">
                    <a style="text-decoration:none;color:#333">{{item.filterContent}}</a></p>
                </li>
                <div class="stop">
                  <a @click="refreshList()">{{isRefreshtitle}}
                    <Spin v-if="isRefresh" style="display: inline-block;"></Spin>
                  </a>
                </div>

                <!--                <li class="headline-item">-->
                <!--                  <div class="fl indexImg">-->
                <!--                    <img src=""/>-->
                <!--                  </div>-->
                <!--                  <div class="words">-->
                <!--                    <h3>红旗H9全球首发 <span><img src="" class="vip"/></span></h3>-->
                <!--                    <h5 class="author">-->
                <!--                      <div class="fl">-->
                <!--                        <span class="authorName"> <img src="@/assets/img/widget-photo.png" alt=""/> 玻璃通 </span>-->
                <!--                        <span>1月8日 13:34</span>-->
                <!--                      </div>-->
                <!--                      <div class="fr attention">-->
                <!--                        <span class="attentionText">收藏</span>-->
                <!--                        <span class="beforeclose"> <i class="fa fa-times delete" aria-hidden="true"></i> <i-->
                <!--                          class="nolike">不感兴趣</i> </span>-->
                <!--                      </div>-->
                <!--                      <div class="clearfix"></div>-->
                <!--                    </h5>-->
                <!--                  </div>-->
                <!--                  <p class="content">-->
                <!--                    作为一汽红旗品牌全新的行政级轿车，H9整体造型庄重典雅，前脸采用。。。作为一汽红旗品牌全新的行政级轿车，H9整体造型庄重典雅，前脸采用。。。-->
                <!--                    作为一汽红旗品牌全新的行政级轿车，H9整体造型庄重典雅，前脸采用。。。</p></li>-->
                <!--              <li class="headline-item">-->
                <!--                <div class="fl indexImg">-->
                <!--                  <img src=""/>-->
                <!--                </div>-->
                <!--                <div class="words">-->
                <!--                  <h3>红旗H9全球首发 <span><img src="@/assets/img/widget-vip.png" class="vip"/></span></h3>-->
                <!--                  <h5 class="author">-->
                <!--                    <div class="fl">-->
                <!--                      <span class="authorName"> <img src="@/assets/img/widget-photo.png" alt=""/> 玻璃通 </span>-->
                <!--                      <span>6月12日 13：34</span>-->
                <!--                    </div>-->
                <!--                    <div class="fr attention">-->
                <!--                      <span class="attentionText">收藏</span>-->
                <!--                      <span class="beforeclose"> <i class="fa fa-times delete" aria-hidden="true"></i> <i-->
                <!--                        class="nolike">不感兴趣</i> </span>-->
                <!--                    </div>-->
                <!--                    <div class="clearfix"></div>-->
                <!--                  </h5>-->
                <!--                </div>-->
                <!--                <p class="content">-->
                <!--                  作为一汽红旗品牌全新的行政级轿车，H9整体造型庄重典雅，前脸采用。。。</p></li>-->
                <!--              <li class="headline-item">-->
                <!--                <div class="fl indexImg">-->
                <!--                  <img src="@/assets/img/H9.png"/>-->
                <!--                </div>-->
                <!--                <div class="words">-->
                <!--                  <h3>红旗H9全球首发 <span><img src="@/assets/img/widget-vip.png" class="vip"/></span></h3>-->
                <!--                  <h5 class="author">-->
                <!--                    <div class="fl">-->
                <!--                      <span class="authorName"> <img src="@/assets/img/widget-photo.png" alt=""/> 玻璃通 </span>-->
                <!--                      <span>6月12日 13：34热门回答</span>-->
                <!--                    </div>-->
                <!--                    <div class="fr attention">-->
                <!--                      <span class="attentionText">收藏</span>-->
                <!--                      <span class="beforeclose"> <i class="fa fa-times delete" aria-hidden="true"></i> <i-->
                <!--                        class="nolike">不感兴趣</i> </span>-->
                <!--                    </div>-->
                <!--                    <div class="clearfix"></div>-->
                <!--                  </h5>-->
                <!--                </div>-->
                <!--                <p class="content"></p></li>-->
                <!--              <li class="headline-item">-->
                <!--                <div class="fl indexImg">-->
                <!--                  <img src=""/>-->
                <!--                </div>-->
                <!--                <div class="words">-->
                <!--                  <h3>红旗H9全球首发 <span><img src="@/assets/img/widget-vip.png" class="vip"/></span></h3>-->
                <!--                  <h5 class="author">-->
                <!--                    <div class="fl">-->
                <!--                      <span class="authorName"> <img src="@/assets/img/widget-photo.png" alt=""/> 玻璃通 </span>-->
                <!--                      <span>6月7日 10：34</span>-->
                <!--                    </div>-->
                <!--                    <div class="fr attention">-->
                <!--                      <span class="attentionText">收藏</span>-->
                <!--                      <span class="beforeclose"> <i class="fa fa-times delete" aria-hidden="true"></i> <i-->
                <!--                        class="nolike">不感兴趣</i> </span>-->
                <!--                    </div>-->
                <!--                    <div class="clearfix"></div>-->
                <!--                  </h5>-->
                <!--                </div>-->
                <!--                <p class="content">-->
                <!--                  作为一汽红旗品牌全新的行政级轿车，H9整体造型庄重典雅，前脸采用。。。</p></li>-->
                <!--              <li class="headline-item">-->
                <!--                <div class="fl indexImg">-->
                <!--                  <img src="@/assets/img/H9.png"/>-->
                <!--                </div>-->
                <!--                <div class="words">-->
                <!--                  <h3>红旗H9全球首发 <span><img src="@/assets/img/widget-vip.png" class="vip"/></span></h3>-->
                <!--                  <h5 class="author">-->
                <!--                    <div class="fl">-->
                <!--                      <span class="authorName"> <img src="@/assets/img/widget-photo.png" alt=""/> 玻璃通 </span>-->
                <!--                      <span>6月12日 13：34</span>-->
                <!--                    </div>-->
                <!--                    <div class="fr attention">-->
                <!--                      <span class="attentionText">收藏</span>-->
                <!--                      <span class="beforeclose"> <i class="fa fa-times delete" aria-hidden="true"></i> <i-->
                <!--                        class="nolike">不感兴趣</i> </span>-->
                <!--                    </div>-->
                <!--                    <div class="clearfix"></div>-->
                <!--                  </h5>-->
                <!--                </div>-->
                <!--                <p class="content"></p></li>-->
                <!--              <li class="headline-item">-->
                <!--                <div class="fl indexImg">-->
                <!--                  <img src=""/>-->
                <!--                </div>-->
                <!--                <div class="words">-->
                <!--                  <h3>红旗H9全球首发 <span><img src="@/assets/img/widget-vip.png" class="vip"/></span></h3>-->
                <!--                  <h5 class="author">-->
                <!--                    <div class="fl">-->
                <!--                      <span class="authorName"> <img src="@/assets/img/widget-photo.png" alt=""/> 玻璃通 </span>-->
                <!--                      <span>6月7日 10：34</span>-->
                <!--                    </div>-->
                <!--                    <div class="fr attention">-->
                <!--                      <span class="attentionText">收藏</span>-->
                <!--                      <span class="beforeclose"> <i class="fa fa-times delete" aria-hidden="true"></i> <i-->
                <!--                        class="nolike">不感兴趣</i> </span>-->
                <!--                    </div>-->
                <!--                    <div class="clearfix"></div>-->
                <!--                  </h5>-->
                <!--                </div>-->
                <!--                <p class="content">-->
                <!--                  作为一汽红旗品牌全新的行政级轿车，H9整体造型庄重典雅，前脸采用。。。</p></li>-->
              </ul>
              <ul id="loaded" class="headline">
              </ul>
            </div>
            <!-- <script src="@/assets/data-list.js" type="text/javascript"></script> -->
          </div>
          <div class="fl right">
            <div class="activity">
              <div class="acti">
                <a> <img src="@/assets/img/activity2.png" alt="活动一"/></a>
              </div>
              <div class="acti">
                <a><img src="@/assets/img/activity3.png" alt="活动一"/></a>
              </div>
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
                  <li class="list-item"><p class="list-time"> 2017/06/30 北京</p>
                    <div class="list-content clearfix">
                      <div class="fl img">
                        <img src="@/assets/img/widget-simple.png" alt=""/>
                      </div>
                      <div>
                        <p>在线峰会 | 前端开发重难点技术剖析与创新实践</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-item"><p class="list-time"> 2017/06/30 北京</p>
                    <div class="list-content clearfix">
                      <div class="fl img">
                        <img src="@/assets/img/widget-simple.png" alt=""/>
                      </div>
                      <div>
                        <p>在线峰会 | 前端开发重难点技术剖析与创新实践</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-item"><p class="list-time"> 2017/06/30 北京</p>
                    <div class="list-content clearfix">
                      <div class="fl img">
                        <img src="@/assets/img/widget-simple.png" alt=""/>
                      </div>
                      <div>
                        <p>在线峰会 | 前端开发重难点技术剖析与创新实践</p>
                      </div>
                    </div>
                  </li>
                  <li class="list-item"><p class="list-time"> 2017/06/30 北京</p>
                    <div class="list-content clearfix">
                      <div class="fl img">
                        <img src="@/assets/img/widget-simple.png" alt=""/>
                      </div>
                      <div>
                        <p>在线峰会 | 前端开发重难点技术剖析与创新实践</p>
                      </div>
                    </div>
                  </li>
                </ul>
                <a class="sui-btn btn-block btn-bordered btn-more">查看更多</a>
              </div>
            </div>

            <!-- <link rel="import" href=".@/assets/.@/assets/modules/ui-modules/footer/footer.html?__inline"> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import Header from '@/components/Header'
    import '@/assets/css/page-sj-headline-login.css'
    import {getCategory, findSearchArticle, getArticleByCategoryId} from '@/pages/api/article'

    export default {
        data() {
            return {
                isRefresh: false,
                isRefreshtitle: "换一批",
                carouselImage: 0,
                isActive: false,
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
                    articleList: []
                },
            }
        },
        methods: {
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
            loadData() {
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
            refreshData() {
                this.isRefresh = true
                this.isRefreshtitle = "加载中"
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
            async refreshList() {
                await this.refreshData()
                this.getLoadData()
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
                    this.$Loading.finish();
                    this.isRefresh = false
                    this.isRefreshtitle = "换一批"
                    let data = res.data.data.rows
                    this.info.params.total = res.data.data.total
                    if (data) {
                        let list = []
                        const _this = this
                        for (let i = 0; i < data.length; i++) {
                            const {createDate, articleId, userId, userName, userImage, filterContent, title} = data[i]
                            list.push({
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
                }).catch(error => {
                    this.$Loading.error();
                })
            }
        },
        components: {
            Header
        },
        created() {
            this.loadData()
        }
    }
</script>

