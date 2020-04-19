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
                <div class="sui-carousel slide">
                  <div style="margin-bottom: 15px">
                    <table style="width: 100%">
                      <tr style="width: 100%">
                        <td style="width: 65%">
                          <FormItem prop="title"><Input v-model="model.title" placeholder="标题"/></FormItem>
                        </td>
                        <td style="width: 35%">
                          <FormItem prop="categoryId">
                            <Select v-model="model.categoryId" class="title_select"
                                    @on-change="selectHandel"
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
                  <div>
                    <FormItem prop="content">
                      <quill-editor
                        v-model="model.content"
                        ref="myQuillEditor"
                        :options="editorOption"
                        placeholder="测试"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @ready="onEditorReady($event)"
                        @change="onEditorChange($event)"
                      ></quill-editor>
                    </FormItem>
                  </div>
                </div>
              </div>
              <div class="data-list">

                <Button style="float: right" type="primary" @click="submit">发表</Button>
              </div>
            </Form>
          </div>
          <Right></Right>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    import Right from '@/components/Right'
    import {toSubmit} from '@/pages/api/article'
    // import *  as '@/utils/filesUtils'
    import Header from '@/components/Header'
    import {quillRedefine} from 'vue-quill-editor-upload'
    import {getCategory, getArticleById, getArticleByCategoryId} from '@/pages/api/article'

    export default {
        data() {
            return {
                rule: {
                    title: [
                        {required: true, message: '标题不能为空', trigger: 'blur'}
                    ],
                    categoryId: [
                        {required: true, message: '标签不能为空', trigger: 'blur'}
                    ],
                    content: [
                        {required: true, message: '内容不能为空', trigger: 'blur'}
                    ]
                },
                model: {
                    categoryId: '',
                    title: '',
                    categoryName: '',
                    content: ``,
                    filterContent: '',
                    url: '',
                },
                info: {
                    categoryList: []
                },
                editorOption: {
                    placeholder: '编辑文章内容',
                    modules: {
                        toolbar: [
                            ['bold'],    //加粗，斜体，下划线，删除线

                            [{'header': 1}],    // 标题，键值对的形式；1、2表示字体大小

                            [{'align': []}],    //对齐方式

                            ['image']    //上传图片
                        ]
                    }
                    ,
                }
            }
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill;
            },
        },
        methods: {
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
            submit() {
                this.$refs['model'].validate((valid) => {
                    if (valid) {
                        let userInfo = window.localStorage.getItem('USER')
                        let userList = JSON.parse(userInfo)
                        let params = {
                            userId: userList.userId || '',
                            userImage: userList.userImage || '',
                            userName: userList.userName || '',
                            categoryId: this.model.categoryId,
                            categoryName: this.model.categoryName,
                            title: this.model.title,
                            content: this.model.content,
                            filterContent: this.model.filterContent
                        }
                        this.$Loading.start();
                        toSubmit(params).then((res) => {
                            if (res.data.code === 20000) {
                                this.$Message.success('发表成功');
                            }
                            this.$Loading.finish();
                        })
                    } else {
                        this.$Message.error('发布失败');
                    }
                })

            },
            onEditorBlur(quill) {
                // console.log('editor blur!', quill)
                // console.log(quill.container.firstChild.innerHTML)//获得html格式文本,岂不美哉
            },
            onEditorFocus(quill) {
                // console.log('editor focus!', quill)
            },
            onEditorReady(quill) {
                // console.log('editor ready!', quill)
            },
            onEditorChange({quill, html, text}) {
                // console.log('editor change!', quill, html, text)
                this.model.content = html
                console.log("html", html)
                let data1 = html.replace(/<[^>]+>/g, "")
                if (data1) {
                    this.model.filterContent = data1.replace(/\s*/g, "")
                }
            }
        },
        created() {
            this.getLoadData()
            this.editorOption = quillRedefine(
                {
                    // 图片上传的设置
                    uploadConfig: {
                        action: 'http://localhost:3000/upload',  // 必填参数 图片上传地址
                        res: (respnse) => {
                            this.model.url = respnse.info
                            console.info("this.url", this.model.url)
                            return respnse.info //return图片url
                        },
                        name: 'img'  // 图片上传参数名
                    },
                    placeholder: '编辑文章内容',
                    toolOptions: ['bold', 'image', {'header': 1}, {'align': []}]
                })
        },
        components: {
            Header,
            Right
        }
    }
</script>
<style lang="less" scoped>
  .quill-editor {
    /deep/ .ql-container {
      height: 700px;
      background-color: #ffffff;
    }
  }

  .title_input {
    /deep/ .ivu-input {
      display: inline;
      width: 65%;
    }

    .title_select {
      /deep/ .ivu-select-selection {
        display: inline;
        width: 35%;
      }
    }

  }

  .right-content {
    /deep/ .ivu-form-inline .ivu-form-item {
      display: block;
      margin-right: 0;
    }

    /deep/ .ivu-form-item-error-tip{
      padding-top: 1px;
    }

    /deep/ .ivu-form-item {
      margin-bottom: 0;
    }
  }

</style>
