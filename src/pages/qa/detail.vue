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
            <div class="carousel">
              <div class="sui-carousel slide">
                <div style="width: 100%; padding: 12px 15px;background: #ffffff;margin: 0px 0px 8px;font-size: 18px; font-weight: bolder;">{{info.title}}</div>
                <div style=" padding: 12px 15px;background: #ffffff;font-size: 18px;">{{info.content}}</div>
                <div class="dibulan">
                  <div class="art_mas">
                    <div class="art_img">
                      <img :src="info.userImage">
                    </div>
                    <div class="art_namebox">
                      <div class="art_name">
                        <span>{{info.userName}}</span>
                      </div>
                      <div class="art_dec">
                        <span>获赞{{info.thumbup}}</span>
                        <span>评论数{{info.replyTotal}}</span>
                      </div>
                    </div>
                  </div>

                  <div class="userdo">
                    <div class="userdo_item" @click="tothumbup">
                      <div class="icon">
                        <img src="http://cyq-test.oss-cn-beijing.aliyuncs.com/dianzan_activity.png"
                             v-if="init.isThumbup === '1'"/>
                        <img src="http://cyq-test.oss-cn-beijing.aliyuncs.com/dianzan.png"
                             v-if="init.isThumbup === '0'"/>
                      </div>
                      <span>点赞</span>
                    </div>
                    <div class="userdo_item" @click="isReply = !isReply">
                      <div class="icon">
                        <img src="http://cyq-test.oss-cn-beijing.aliyuncs.com/pinglun.png"/>
                      </div>
                      <span>评论</span>
                    </div>

                  </div>

                  <div class="pinglun" v-if="isReply">
                    <Input v-model="reply" type="textarea" :rows="4" placeholder="我也来说一句..."/>
                    <Button type="primary" @click="toReply()">发表评论</Button>
                  </div>
                </div>
              </div>
            </div>
            <div class="data-list">
              <ul id="data-list-down" class="headline loading">
                <li class="headline-item" v-for="(item,index)  in model.questionList" :key="index">

                  <div class="content">
                    <table>
                      <tr style="width: 100%;">
                        <td style="width: 600px"><span
                          style="text-decoration:none;color:#333">{{item.content}}</span></td>
                        <td style="width: 25px;float: right;cursor: pointer;" @click="replyThumbup(index,item)" >
                          <table>
                            <tr>
                              <td v-if="!item.isThumbup"><img style="width: 20px;height: 14px;"
                                                              src="http://cyq-test.oss-cn-beijing.aliyuncs.com/dianzan.png"/>
                              </td>
                              <td v-if="item.isThumbup"><img style="width: 20px;height: 14px;"
                                                             src="http://cyq-test.oss-cn-beijing.aliyuncs.com/dianzan_activi.png"/>
                              </td>
                              <td v-if="item.thumbup!==0">{{item.thumbup}}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div class="words">
                    <h5 class="author">
                      <div class="fl">
                        <span class="authorName"> <img :src="item.userImage" alt=""/>{{item.userName}}</span>
                        <span>{{item.createDate}}</span>
                      </div>
                      <div class="clearfix"></div>
                    </h5>
                  </div>
                </li>
              </ul>

            </div>
          </div>
          <Right/>
        </div>
      </div>
    </div>


  </div>
</template>


<script>
    import Right from '@/components/Right'
    import Header from '@/components/Header'

    import {getQuestion, questionThumbup, unQuestionThumbup, findByQuestionId} from '@/pages/api/question'
    import {replySearch, replyQuestion, replyThumbup, unReplyThumbup} from '@/pages/api/reply'

    export default {
        data() {
            return {
                user: {},
                isReply: false,
                content: '',
                questionId: '',
                info: {},
                init: {
                    isThumbup: '0'
                },
                model: {
                    params: {
                        questionId: '',
                        userImage: '',
                        title: '',
                        userId: '',
                        userName: '',
                        content: '',
                        page: 1,
                        size: 3,
                        total: 0
                    },
                    questionList: [],
                    articleList: []
                },
                reply: '',
            }
        },
        methods: {
            replyThumbup(index, item) {
                console.log("index",index)
                if(!item.isThumbup){
                    this.$Loading.start();
                    replyThumbup(item.replyId).then((res) => {
                        if(res.data.code === 20000){
                            this.$Message.success('点赞成功');
                            this.model.questionList[index].isThumbup = true
                            this.model.questionList[index].thumbup++
                        }
                        this.$Loading.finish();
                    })
                }else {
                    this.$Message.success('您已经点赞过啦！');
                }

            },
            toReply() {
                this.$Loading.start();
                let params = {
                    questionId: this.questionId,
                    content: this.reply || '',
                    userId: this.user.userId,
                    userImage: this.user.userImage,
                    userName: this.user.userName
                }
                replyQuestion(params).then((res) => {
                    if (res.data.code === 20000) {
                        this.$Message.success('评论成功');
                        this.info.replyTotal++
                        this.getReply()
                        this.reply = ''
                    }
                    this.$Loading.finish();
                }).catch(error => {
                    this.$Message.error('评论失败');
                    this.$Loading.error();
                })
            },
            tothumbup() {
                if (this.init.isThumbup === '0') {
                    this.thumbup()
                }
                if (this.init.isThumbup === '1') {
                    this.unThumbup()
                }
            },
            thumbup() {
                this.$Loading.start();
                questionThumbup(this.questionId).then((res) => {
                    if (res.data.code === 20000) {
                        this.$Message.success('点赞成功');
                        this.init.isThumbup = "1"
                        this.info.thumbup++
                    }
                    this.$Loading.finish();
                }).catch(error => {
                    this.$Message.error('点赞失败');
                    this.$Loading.error();
                })
            },
            unThumbup() {
                this.$Loading.start();
                unQuestionThumbup(this.questionId).then((res) => {
                    if (res.data.code === 20000) {
                        this.$Message.success('已取消点赞');
                        this.init.isThumbup = "0"
                        this.info.thumbup--
                    }
                    this.$Loading.finish();
                }).catch(error => {
                    this.$Message.error('取消点赞失败');
                    this.$Loading.error();
                })
            },
            getLoadData() {
                findByQuestionId(this.questionId).then((res) => {
                    this.init.isThumbup === '0'
                    this.info = res.data.data
                })
            },
            getReply() {
                this.$Loading.start();
                let params = {
                    questionId: this.questionId,
                    userImage: '',
                    title: '',
                    userId: '',
                    userName: '',
                    content: '',
                    page: this.model.params.page,
                    size: this.model.params.size
                }
                replySearch(params).then((res) => { // 根据分类名查询信息
                    let qaList = res.data.data.rows
                    let list = []
                    for (let i = 0; i < qaList.length; i++) {
                        const {content, questionId, replyDate, replyId, thumbup, userId, userImage, userName} = qaList[i]
                        list.push({
                            content,
                            questionId,
                            replyDate,
                            replyId,
                            thumbup,
                            userId,
                            userImage,
                            userName,
                            isThumbup: false
                        })
                    }
                    this.model.questionList = list
                    this.info.replyTotal = res.data.data.total
                    this.$Loading.finish();
                })
            }
        },
        components: {
            Header,
            Right
        },
        mounted() {
            this.getLoadData()
            this.getReply()
        },
        created() {
            this.questionId = this.$route.query.questionId
            if (window.localStorage.getItem('USER')) {
                let userInfo = window.localStorage.getItem('USER')
                this.user = JSON.parse(userInfo)
            }
        }
    }
</script>
<style lang="less" scoped>
  .data-list .headline .headline-item {
    padding: 30px 25px;
  }

  .data-list .headline .headline-item .content {
    margin-top: 0;
  }

  .author {
    float: right;
  }

  .ql-editor {
    background: #ffffff;
  }

  .dibulan {
    width: 100%;
    overflow: hidden;
    padding: 12px 15px;
    background: #ffffff;

    .art_mas {
      border-top: solid 1px #aaaaaa;
      height: 60px;
      overflow: hidden;
      width: 100%;

      .art_img {
        width: 50px;
        float: left;
        border-radius: 50%;
        margin: 10px 15px 0 0;
        overflow: hidden;

        img {
          width: 100%;
        }
      }

      .art_namebox {
        margin: 10px 15px 0 0;
        float: left;

        .art_name {
          margin-top: 5px;
          font-size: 20px;
          font-weight: bolder;
        }

        .art_dec {
          color: #666666;
          margin-top: 10px;

          span {
            margin-right: 10px;
          }
        }

      }
    }

    .userdo {
      width: 100%;
      overflow: hidden;
      background: #eeeeee;
      padding: 5px 10px;
      margin-top: 15px;
      border-radius: 5px;

      .userdo_item {
        float: left;
        margin-right: 20px;
        cursor: pointer;
        height: 40px;
        width: 70px;
        text-align: center;
        line-height: 40px;
        border-radius: 5px;

        .icon {
          width: 20px;
          height: 20px;
          display: inline-block;
          /*float: left;*/

          img {
            width: 100%;
          }
        }
      }

      .userdo_item:hover {
        background: #aaaaaa;
      }
    }

    .pinglun {
      margin: 10px 0;

      /deep/ Button {
        float: right;
        margin-top: 5px;
      }
    }
  }

</style>


