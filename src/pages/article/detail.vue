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
                <div class="ql-editor" v-html="info.content">{{info.content}}</div>
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
                        <span>收藏{{info.collectionTotal}}</span>
                        <span>获赞{{info.thumbup}}</span>
                        <span>评论数{{info.commentTotal}}</span>
                      </div>
                    </div>
                  </div>

                  <div class="userdo">
                    <div class="userdo_item" @click="tocollection">
                      <div class="icon">
                        <img src="http://cyq-test.oss-cn-beijing.aliyuncs.com/shoucang.png"
                             v-if="info.isCollection === '0'"/>
                        <img src="http://cyq-test.oss-cn-beijing.aliyuncs.com/shoucang_activity.png"
                             v-if="info.isCollection === '1'"/>
                      </div>
                      <span>收藏</span>
                    </div>
                    <div class="userdo_item" @click="tothumbup">
                      <div class="icon">
                        <img src="http://cyq-test.oss-cn-beijing.aliyuncs.com/dianzan_activity.png"
                             v-if="info.isThumbup === '1'"/>
                        <img src="http://cyq-test.oss-cn-beijing.aliyuncs.com/dianzan.png"
                             v-if="info.isThumbup === '0'"/>
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
                    <Button type="primary" @click="toComment()">发表评论</Button>
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
                        <td style="width: 25px;float: right">
                          <img style="cursor: pointer;width: 20px;height: 14px;"
                               src="http://cyq-test.oss-cn-beijing.aliyuncs.com/dianzan.png"/>
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
    import {
        getArticleById,
        getCategory,
        findSearchArticle,
        collectionArticle,
        unCollection,
        thumbup,
        unthumbup,
        searchCollection,
        findCommentByArticleId,
        commentArticle
    } from '@/pages/api/article'

    import {getQuestion, replySearch} from '@/pages/api/question'

    export default {
        data() {
            return {
                user: {},
                isReply: false,
                content: '',
                articleId: '',
                info: {},
                model: {
                    params: {
                        categoryId: '',
                        filterContent: '',
                        title: '',
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
            toComment() {
                this.$Loading.start();
                let params = {
                    articleId: this.articleId,
                    content: this.reply || '',
                    userId: this.user.userId,
                    userImage: this.user.userImage,
                    userName: this.user.userName
                }
                commentArticle(params).then((res) => {
                    if (res.data.code === 20000) {
                        this.$Message.success('评论成功');
                        this.info.commentTotal++
                        this.getComment()
                        this.reply = ''
                    }
                    this.$Loading.finish();
                }).catch(error => {
                    this.$Message.error('评论失败');
                    this.$Loading.error();
                })
            },
            tothumbup() {
                if (this.info.isThumbup === '0') {
                    this.thumbup()
                }
                if (this.info.isThumbup === '1') {
                    this.unThumbup()
                }
            },
            tocollection() {
                if (this.info.isCollection === '0') {
                    this.collection()
                }
                if (this.info.isCollection === '1') {
                    this.unCollection()
                }
            },
            thumbup() {
                this.$Loading.start();
                thumbup(this.info.articleId).then((res) => {
                    if (res.data.code === 20000) {
                        this.$Message.success('点赞成功');
                        this.info.isThumbup = "1"
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
                unthumbup(this.info.articleId).then((res) => {
                    if (res.data.code === 20000) {
                        this.$Message.success('已取消点赞');
                        this.info.isThumbup = "0"
                        this.info.thumbup--
                    }
                    this.$Loading.finish();
                }).catch(error => {
                    this.$Message.error('取消点赞失败');
                    this.$Loading.error();
                })
            },
            collection() {
                this.$Loading.start();
                let params = {
                    articleId: this.info.articleId,
                    articleTitle: this.info.articleTitle || '',
                    userId: this.user.userId || '',
                    userImage: this.user.userImage || '',
                    userName: this.user.userName || ''
                }
                collectionArticle(params).then((res) => {
                    if (res.data.code === 20000) {
                        this.$Message.success('收藏成功');
                        this.info.isCollection = "1"
                        this.info.collectionTotal++
                    }
                    this.$Loading.finish();
                }).catch(error => {
                    this.$Message.error('收藏失败');
                    this.$Loading.error();
                })
            },
            unCollection() {
                this.$Loading.start();
                unCollection(this.info.articleId).then((res) => {
                    if (res.data.code === 20000) {
                        this.$Message.success('已取消收藏');
                        this.info.isCollection = "0"
                        this.info.collectionTotal--
                    }
                    this.$Loading.finish();
                }).catch(error => {
                    this.$Message.error('取消收藏失败');
                    this.$Loading.error();
                })
            },
            getLoadData() {
                getArticleById(this.articleId).then((res) => {
                    this.info = res.data.data
                    this.content = res.data.data.content
                })
            },
            getComment() {
                this.$Loading.start();
                findCommentByArticleId(this.articleId).then((res) => { // 根据分类名查询信息
                    let data = res.data.data
                    if (data) {
                        let list = []
                        const _this = this
                        for (let i = 0; i < data.length; i++) {
                            const {commentDate, commentId, articleId, userId, userName, userImage, thumbup, content} = data[i]
                            list.push({
                                thumbup,
                                userId, userName, userImage,
                                content,
                                commentId, articleId,
                                createDate: commentDate
                            })
                        }
                        this.model.questionList = list
                    }
                    this.$Loading.finish();
                }).catch(error => {
                    this.$Loading.error();
                })
            },
            loadData() {

                this.clearData()
                this.getGathering()
            },
        },
        components: {
            Header,
            Right
        },
        mounted() {
            this.getLoadData()
            this.getComment()
            // this.countTime()
        },
        created() {
            this.articleId = this.$route.query.articleId
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


