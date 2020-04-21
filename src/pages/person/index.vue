<template>
  <div>
    <Header></Header>
    <div class="myhome-personinfo" style="background-color:rgb(206, 247, 238)">
      <div class="wrapper">
        <div class="person-baseinfo">
          <!--头像信息-->
          <div class="photo">
            <img style="width: 120px;height: 120px;border-radius: 60px;" :src="user.userImage" alt="" class="person"/>
          </div>
          <!--文字信息-->
          <div class="info">
            <h1>{{user.userName}}</h1>
            <ul class="fill">
              <li><i class="fa fa-map-marker" aria-hidden="true"></i> <span class="edit-item"> 填写现居城市</span>
                <form action="" class="sui-form form-inline">
                  <input type="text" placeholder="现居城市"/>
                  <button class="sui-btn btn-danger save-btn">保存</button>
                </form>
              </li>
              <li><i class="fa fa-shopping-bag" aria-hidden="true"></i> <span class="edit-item"> 填写您的车龄</span>
                <form action="" class="sui-form form-inline">
                  <input type="text" placeholder="公司/组织名称"/>
                  <input type="text" placeholder="职位头衔"/>
                  <button class="sui-btn btn-danger save-btn">保存</button>
                </form>
              </li>
            </ul>
          </div>
        </div>
        <!--右侧编辑-->
        <div class="edit-info">
          <h4>个人简介<span class="addedit"><img src="@/assets/img/widget-edit.png" width="12" height="12"/>编辑</span></h4>
          <div class="info-box">
            <div class="edit-intro">
              暂时没有个人简介
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
    <!--两列布局-->
    <div class="wrapper  myhome">
      <div class="left-list">
        <div class="myhome-list">
          <ul class="home-list">
            <li v-for="(item,index) in menus" :key="index"
                :class="{ active:index==isActive}"
                @click="menuClickHandel(index,item.label)"
            >
              <a>{{item.name}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="right-content" style="width: 982px;text-align: left">
        <div class="mycollect-list" style="width: 982px">
          <ul class="sui-nav nav-tabs nav-large">
            <li class="active"><a href="#one" data-toggle="tab">{{toptitle}}</a></li>

          </ul>
          <div class="tab-content tab-wraped">
            <div id="one" class="tab-pane active">
              <ul class="collect-list">
                <li class="collect-item" v-for="(item,index) in resList" :key="index">
                  <div class="intro">
                    <div class="fl border" v-if="toptitle ==='发表的文章' || toptitle ==='发布的问题'">
                      <span class="fa fa-thumbs-up" aria-hidden="true">{{item.thumbup}}</span>
                      <span class="usenum"></span>
                      <span class="fa fa-star" aria-hidden="true">{{item.collectionTotal}}</span>
                    </div>
                    <div class="fl content">
                      <p class="title" style="cursor: pointer" @click="toDetail(item)">{{item.title}}</p>
                      <div class="link" style="color: black;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" v-if="item.content">{{item.content}}</div>
                      <p class="link" style="color: #999">{{item.createDate}}</p>
                    </div>
                    <div class="fr info" v-if="item.userName">
                      <img :src="item.userImage" style="width: 39px;height: 39px" alt=""/>
                      <span class="author" style="color: #999">{{item.userName}}</span>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </li>
                <div style="line-height: 36px;">
                  <Page v-if="params.total !==0" :total="params.total" :page-size="params.size" show-total
                        @on-change="changePage"/>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>
<script>
    import Header from '@/components/Header'
    import '@/assets/css/page-sj-person-homepage.css'
    import '@/assets/css/page-sj-person-mycollect.css'
    import {
        getCategory,
        findSearchArticle,
        collectionArticle,
        unCollection,
        thumbup,
        unthumbup,
        searchCollection
    } from '@/pages/api/article'
    import {getGathering, findRecord} from '@/pages/api/gathering'
    import {getQuestion} from '@/pages/api/question'
    import {replySearch} from '@/pages/api/reply'

    export default {
        data() {
            return {
                item: '',
                user: {},
                isActive: "",
                params: {
                    title: '',
                    page: 1,
                    size: 3,
                    total: 0
                },
                toptitle: '',
                resList: [],
                menus: [
                    {
                        name: "我的文章",
                        label: "article"
                    },
                    {
                        name: "我的收藏",
                        label: "collection"
                    },
                    {
                        name: "我的提问",
                        label: "question"
                    },
                    {
                        name: "活动报名",
                        label: "signUp"
                    }
                ],
            }
        },
        methods: {
            changePage(item) {
                this.params.page = item
                this.getLoadData(this.item, true)
                console.log("item", item)
            },
            menuClickHandel(index, item) {
                this.isActive = index
                this.getLoadData(item, false)
            },
            clearData() {
                this.params = {
                    title: '',
                    page: 1,
                    size: 3,
                    total: 0
                }
                this.resList = []
            },
            getArticle() {
                this.toptitle = "发表的文章"
                this.$Loading.start();
                let params = {
                    userId: this.user.userId,
                    page: this.params.page,
                    size: this.params.size
                }
                findSearchArticle(params).then((res) => {
                    let resList = res.data.data.rows
                    let list = []
                    for (let i = 0; i < resList.length; i++) {
                        const {filterContent, createDate, articleId, title, collectionTotal, thumbup, commentTotal} = resList[i]
                        list.push({
                            title, collectionTotal,
                            content: filterContent,
                            createDate,
                            id: articleId,
                            thumbup, commentTotal
                        })
                    }
                    this.resList = list
                    this.params.total = Number(res.data.data.total)
                    this.$Loading.finish();
                })
            },
            getCollection() {
                this.toptitle = "收藏的文章"
                this.$Loading.start();
                let params = {
                    userId: this.user.userId,
                    page: this.params.page,
                    size: this.params.size
                }
                searchCollection(params).then((res) => {
                    let resList = res.data.data.rows
                    let list = []
                    for (let i = 0; i < resList.length; i++) {
                        const {userImage, userId, userName, createDate, articleId, articleTitle, content} = resList[i]
                        list.push({
                            content,
                            title: articleTitle,
                            createDate,
                            id: articleId,
                            userImage,
                            userId,
                            userName,
                        })
                    }
                    this.resList = list
                    this.params.total = res.data.data.total
                    this.$Loading.finish();
                })
            },
            getQuestion() {
                this.toptitle = "发布的问题"
                this.$Loading.start();
                let params = {
                    userName: '',
                    title: '',
                    content: '',
                    searchState: '',
                    userId: this.user.userId,
                    page: this.params.page,
                    size: this.params.size
                }
                getQuestion(params).then((res) => {
                    let resList = res.data.data.rows
                    let list = []
                    for (let i = 0; i < resList.length; i++) {
                        const {userImage, userId, userName, createDate, title, questionId, content} = resList[i]
                        list.push({
                            content,
                            title,
                            createDate,
                            id: questionId,
                            userImage,
                            userId,
                            userName
                        })
                    }
                    this.resList = list
                    this.params.total = res.data.data.total
                    this.$Loading.finish();
                })
            },
            getAnswer() {
                this.toptitle = "回答的问题"
                this.$Loading.start();
                let params = {
                    userId: this.user.userId,
                    page: this.params.page,
                    size: this.params.size
                }
                replySearch(params).then((res) => {
                    let resList = res.data.data.rows
                    let list = []
                    for (let i = 0; i < resList.length; i++) {
                        const {userImage, userId, userName, createDate, questionId, content} = resList[i]
                        list.push({
                            content,
                            createDate,
                            id: questionId,
                            userImage,
                            userId,
                            userName
                        })
                    }
                    this.resList = list
                    this.params.total = res.data.data.total
                    this.$Loading.finish();
                })
            },
            toDetail(item) {
                if (this.toptitle === '发表的文章' || this.toptitle === '收藏的文章') {
                    let url = 'http://localhost:10002/articleDetail?articleId=' + item.id
                    window.open(url, '_blank');
                }
                if (this.toptitle === '报名的活动') {
                    let url = 'http://localhost:10002/gathering/detail?gatheringId=' +  item.id
                    window.open(url, '_blank');
                }
                if (this.toptitle === '发布的问题') {
                    let url = 'http://localhost:10002/question/detail?questionId=' + item.id
                    window.open(url, '_blank');
                }
            },
            getSignUp() {
                this.toptitle = "报名的活动"
                this.$Loading.start();
                let params = {
                    userId: this.user.userId,
                    page: this.params.page,
                    size: this.params.size
                }
                console.log("params", params)
                findRecord(params).then((res) => {
                    let resList = res.data.data.content
                    let list = []
                    for (let i = 0; i < resList.length; i++) {
                        const {createDate, gatheringTitle, gatheringId} = resList[i]
                        list.push({
                            title: gatheringTitle,
                            createDate,
                            id: gatheringId,
                        })
                    }
                    this.resList = list
                    this.params.total = res.data.data.totalElements
                    this.$Loading.finish();
                })
            },
            async getLoadData(item, isPage = false) {
                this.item = item
                if (!isPage) {
                    await this.clearData()
                }
                if (item === "article") {
                    this.getArticle()
                }
                if (item === "collection") {
                    this.getCollection()
                }
                if (item === "question") {
                    this.getQuestion()
                }
                if (item === "signUp") {
                    this.getSignUp()
                }
            },
            loadData() {
                this.getLoadData("article", false)
            }
        },
        components: {
            Header
        },
        created() {
            this.loadData()
            if (window.localStorage.getItem('USER')) {
                let userInfo = window.localStorage.getItem('USER')
                this.user = JSON.parse(userInfo)
            }
        }
    }
</script>
