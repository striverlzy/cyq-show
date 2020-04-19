<template>
  <div>

    <Header></Header>
    <div class="sui-container wrapper">
      <div class="sj-content">
        <div class="left-nav">
          <div class="float-nav" id="float-nav">
            <ul class="sui-nav nav-tabs nav-xlarge tab-navbar tab-vertical">
            </ul>
          </div>
        </div>
        <div class="right-content">
          <div class="fl middle">
            <Form ref="model" :model="model" :rules="rule" inline>
              <div class="carousel">
                <div class="sui-carousel slide" style=" margin-top: 15px;">


                  <div class="qa-css">
                    <table style="width: 100%">
                      <tr style="width: 100%">
                        <td style="width: 65%">
                          <FormItem prop="title"><Input v-model="model.title" placeholder="标题"/></FormItem>
                        </td>
                        <td style="width: 35%">
                          <FormItem prop="categoryId"><Select v-model="model.categoryId" @on-change="selectHandel"
                                                              :label-in-value="true"
                                                              placeholder="请选择标签">
                            <Option v-for="item in info.categoryList" :value="item.categoryId" :key="item.categoryId">
                              {{item.categoryName }}
                            </Option>
                          </Select></FormItem>
                        </td>
                      </tr>
                    </table>
                  </div>

                  <div class="qa-input">
                    <FormItem prop="content">
                      <Input v-model="model.content" type="textarea" :rows="9"
                             placeholder="请描述您的问题..."/></FormItem>
                  </div>

                </div>
              </div>
              <div class="data-list">
                <FormItem>
                  <Button style="float: right" type="primary" @click="submit(model)">发表问答</Button>
                </FormItem>
              </div>
            </Form>
          </div>

          <!--          <Right></Right>-->
          <div class="fl rights">
            <div class="question-list">
              <h3 class="title">热门回答</h3>
              <div class="lists">
                <ul>
                  <li class="list-item" v-for="(item,index) in info.questionList" :key="index">
                    <p class="list-title">
                      {{item.title}}</p>
                    <p class="authorInfo"><span class="authorName"><img :src="item.userImage"
                                                                        alt=""/>{{item.userName}}</span> <span style="color: #a8a8a8;">{{item.createDate}}</span></p>
                  </li>
                </ul>
                <a class="sui-btn btn-block btn-bordered btn-more" @click="refreshQuestionList()">{{isRefreshQuestiontitle}}
                  <Spin v-if="isRefreshQuestion" style="display: inline-block;"></Spin></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Header from '@/components/Header'
    import {publishQuestion,getQuestion} from '@/pages/api/question'
    import {getCategory} from '@/pages/api/article'

    export default {
        data() {
            return {
                user: {},
                rule: {
                    title: [
                        {required: true, message: '标题不能为空', trigger: 'blur'}
                    ],
                    categoryId: [
                        {required: true, message: '标签不能为空', trigger: 'blur'}
                    ],
                    content: [
                        {required: true, message: '问题不能为空', trigger: 'blur'}
                    ]
                },
                model: {
                    content: '',
                    title: '',
                    categoryId: '',
                    categoryName: '',
                },
                isRefreshQuestion: false,
                isRefreshQuestiontitle: "查看更多",
                info: {
                    questionList: [],
                    categoryList: [],
                    questionParams: {
                        userId: '',
                        userName: '',
                        title: '',
                        content: '',
                        searchState: '2',
                        page: 1,
                        size: 3,
                        total: 0
                    }
                }

            }
        },
        methods: {
            refreshQuestionData(){
                this.isRefreshQuestion = true
                this.isRefreshQuestiontitle = "加载中"
                let total = this.info.questionParams.total
                let size = this.info.questionParams.size
                let index = Math.ceil(total / size)
                let page = this.info.questionParams.page
                if (page < index) {
                    page++
                    this.info.questionParams.page = page
                } else {
                    this.info.questionParams.page = 1
                }
            },
            async refreshQuestionList() {
                await this.refreshQuestionData()
                this.getQuestion()
            },
            getQuestion() {
                this.$Loading.start();
                let params = {
                    searchState: this.info.questionParams.searchState,
                    page: this.info.questionParams.page,
                    size: this.info.questionParams.size
                }
                getQuestion(params).then((res) => {
                    this.info.questionList = res.data.data.rows
                    this.isRefreshQuestion = false
                    this.info.questionParams.total = res.data.data.total
                    this.isRefreshQuestiontitle = "查看更多"
                    this.$Loading.finish();
                })
            },
            selectHandel(item) {
                if (item) {
                    this.model.categoryId = item.value
                    let data1 = item.label.replace(/<[^>]+>/g, "")
                    if (data1) {
                        this.model.categoryName = data1.replace(/\s*/g, "")
                    }
                }
            },
            getLoadData() {
                this.$Loading.start();
                getCategory().then((res) => { // 获取分类名
                    if (res) {
                        this.info.categoryList = res.data.data
                    }
                    this.$Loading.finish();
                }).catch(error => {
                    this.$Loading.error();
                })
            },
            cleanData() {
                this.model = {
                    content: '',
                    title: '',
                    categoryId: '',
                    categoryName: '',
                }
            },
            submit() {
                this.$refs['model'].validate((valid) => {
                    if (valid) {
                        let params = {
                            userId: this.user.userId,
                            userName: this.user.userName,
                            userImage: this.user.userImage,
                            categoryId: this.model.categoryId,
                            categoryName: this.model.categoryName,
                            title: this.model.title,
                            content: this.model.content,
                        }
                        this.$Loading.start()
                        publishQuestion(params).then((res) => {
                            if (res.data.code === 20000) {
                                this.$Message.success('发布成功');
                            }
                            this.cleanData()
                            this.$Loading.finish();
                        })

                    } else {
                        this.$Message.error('发布失败');
                    }
                })
            },

        },
        created() {
            this.getLoadData()
            this.getQuestion()
            if (window.localStorage.getItem('USER')) {
                let userInfo = window.localStorage.getItem('USER')
                this.user = JSON.parse(userInfo)
            }
        },
        components: {
            Header
        }
    }
</script>
<style lang="less" scoped>
  .qa-css {
    height: 80px;
    margin-bottom: 8px;
    width: 100%;
    padding: 12px 15px;
    background: #ffffff;
  }

  .right-content {
    /deep/ .ivu-form-inline .ivu-form-item {
      display: block;
      margin-right: 0;
    }

    /deep/ .ivu-form-item {
      margin-bottom: 0;
    }
  }

  .qa-input {
    height: 243px;
    width: 100%;
    padding: 12px 15px;
    background: #ffffff;
  }
</style>
