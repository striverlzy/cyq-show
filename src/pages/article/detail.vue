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
                <div class="ql-editor" v-html="content">{{content}}</div>
                <div class="dibulan">
                  <div class="art_mas">
                    <div class="art_img">
                      <img src="http://cyq-test.oss-cn-beijing.aliyuncs.com/car.png">
                    </div>
                    <div class="art_namebox">
                      <div class="art_name">
                        <span>名字</span>
                      </div>
                      <div class="art_dec">
                        <span>原创文章</span>
                        <span>获赞</span>
                        <span>访问量</span>
                      </div>
                    </div>
                  </div>

                  <div class="userdo">
                    <div class="userdo_item">
                      <div class="icon">
                        <img src="http://cyq-test.oss-cn-beijing.aliyuncs.com/car.png">
                      </div>
                      <span>点赞</span>
                    </div>
                    <div class="userdo_item">
                      <div class="icon">
                        <img src="http://cyq-test.oss-cn-beijing.aliyuncs.com/car.png">
                      </div>
                      <span>评论</span>
                    </div>
                    <div class="userdo_item">
                      <div class="icon">
                        <img src="http://cyq-test.oss-cn-beijing.aliyuncs.com/car.png">
                      </div>
                      <span>收藏</span>
                    </div>
                  </div>

                  <div class="pinglun" >
                    <Input v-model="value6" type="textarea" :rows="4" placeholder="Enter something..." />
                    <Button type="primary">Primary</Button>
                  </div>
                </div>
              </div>
            </div>
            <div class="data-list">
              <ul id="data-list-down" class="headline loading">
                <li class="headline-item" v-for="(item,index)  in model.articleList" :key="index">
                  <div class="fl indexImg">
                    <img src=""/>
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
                  <p class="content">
                    <span style="text-decoration:none;color:#333">{{item.filterContent}}</span></p>
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
        searchCollection
    } from '@/pages/api/article'

    export default {
        data() {
            return {
                content: '',
                articleId: '',
                model: {
                    params: {
                        categoryId: '',
                        filterContent: '',
                        title: '',
                        page: 1,
                        size: 3,
                        total: 0
                    },
                    articleList: []
                },
                value6: '',
            }
        },
        methods: {
            getLoadData() {
                getArticleById(this.articleId).then((res) => {
                    this.content = res.data.data.content
                })
            },
            getReply(){
                this.$Loading.start();
                let params = {
                    categoryId: this.model.params.categoryId,
                    filterContent: this.model.params.filterContent,
                    title: '',
                    page: this.model.params.page,
                    size: this.model.params.size
                }
                findSearchArticle(params).then((res) => { // 根据分类名查询信息
                    let data = res.data.data.rows
                    this.model.params.total = Number(res.data.data.total)
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
                        this.model.articleList = list
                        console.info("this.model.articleList",this.model.articleList)
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
            this.getReply()
            // this.countTime()
        },
        created() {
            this.articleId = this.$route.query.articleId
        }
    }
</script>
<style lang="less" scoped>
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
    .pinglun{
      margin: 10px 0;

      /deep/Button{
        float: right;
        margin-top: 5px;
      }
    }
  }

</style>


