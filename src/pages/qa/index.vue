<template>
  <div>
    <Header ref="setQueryHandel" @backQueryHandel="doSearch"></Header>
    <div class="wrapper qa-content">
      <div class="fl left-list">
        <div class="tab-content">
          <div id="index" class="tab-pane active">
            <div class="tab-bottom-line">
              <ul class="sui-nav nav-tabs">
                <li
                  :class="{ active:index==isActive }"
                  v-for="(item,index) in menus"
                  :key="index"
                  @click="menuClickHandel(index,item.state)"
                ><a href="#">{{item.name}}</a>
                </li>
              </ul>
              <div class="qa-list">
                <div class="tab-content">
                  <div id="new" class="tab-pane active">
                    <ul class="detail-list">
                      <li class="qa-item" v-for="(item,index) in info.questionList" :key="index">
                        <div class="fl record">
                          <div class="number">
                            <div class="border useful">
                              <p class="usenum">{{item.thumbup}}</p>
                              <p>有用</p>
                            </div>
                            <div class="border answer">
                              <p class="ansnum">{{ item.replyTotal}}</p>
                              <p>回答</p>
                            </div>
                          </div>
                        </div>
                        <div class="fl info">
                          <div class="question">
                            <p class="author"><span class="name"> </span><span> </span> </p>
                            <p class="title">
                            <div style="font-size: 16px;width: 600px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                              <span style="cursor: pointer;" @click="toQuestionDetail(item.questionId)">
                                {{item.content}}</span></div></p>
                          </div>
                          <div class="other">
                            <ul class="fl sui-tag">
                              <li>{{item.categoryName}}</li>
                            </ul>
                            <div class="fr brower">
                              <span><img style="width: 15px;height: 15px;border-radius: 4px;" :src="item.userImage"></span> <span>{{item.userName}} </span><span>  {{item.createDate}}</span>
                            </div>
                          </div>
                        </div>
                        <div class="clearfix"></div>
                      </li>
                      <div style="line-height: 36px;">
                        <Page v-if="params.total !==0" :total="params.total" :page-size="params.size" show-total @on-change="changePage"/>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fl right-tag">
        <div class="block-btn">
          <p>今天，有什么好东西要和大家分享么?</p>
          <a class="sui-btn btn-block btn-share" href="/addQuestion" target="_blank">发布问题</a>
        </div>
        <div class="hot-tags">
          <div class="head">
            <h3 class="title">热门标签</h3>
          </div>
          <div class="tags">
            <ul class="sui-tag">
              <li>国产专区</li>
              <li>日系专区</li>
              <li>美系专区</li>
              <li>德系专区</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>
<script>
    import Header from '@/components/Header'
    import {getQuestion} from '@/pages/api/question'
    import '@/assets/css/page-sj-qa-logined.css'

    export default {
        data() {
            return {
                isActive: 0,
                menus: [
                    {state: "1", name: "最新问答"},
                    {state: "2", name: "最热回答"},
                    {state: "3", name: "等待回答"}
                ],
                info: {
                    questionList: []
                },
                params: {
                    userId: '',
                    userName: '',
                    title: '',
                    content: '',
                    searchState: '',
                    page: 1,
                    size: 5,
                    total: 0
                }
            }
        },
        methods: {
            toQuestionDetail(questionId){
                let url = 'http://localhost:10002/question/detail?questionId=' + questionId
                window.open(url, '_blank');
            },
            async doSearch(query) {
                await this.changeContent(query)
                this.getLoadData(this.isActive+1, true)
            },
            changeContent(query){
                this.params.content = query
            },
            changePage(item) {
                this.params.page = item
                this.getLoadData(this.isActive+1, true)
            },
            menuClickHandel(index, item) {
                this.$refs.setQueryHandel.clearQuery()
                this.isActive = index
                this.getLoadData(item, false)
            },
            clearData() {
                this.params = {
                    userId: '',
                    userName: '',
                    title: '',
                    content: '',
                    page: 1,
                    size: 5,
                    total: 0
                }
                this.info.questionList = []
            },
          async getLoadData(index, isPage = false) {
              this.$Loading.start();
                if (!isPage) {
                    await this.clearData()
                }
                let params = {
                    userId: '',
                    userName: '',
                    title: this.params.title,
                    content: this.params.content,
                    searchState: index,
                    page: this.params.page,
                    size: this.params.size
                }
                getQuestion(params).then((res) => {
                    this.info.questionList = res.data.data.rows
                    this.params.total = res.data.data.total
                    this.$Loading.finish();
                })
            },
            loadData() {
                this.getLoadData("1", false)
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
