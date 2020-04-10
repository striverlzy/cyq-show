<template>
  <div>

    <Header></Header>
    <div style="width: 50rem"
    >
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
        @change="onEditorChange($event)"
      ></quill-editor>
    </div>
    <button @click="submit">发表</button>
  </div>
</template>

<script>
    import {toSubmit} from '@/pages/api/article'
    import Header from '@/components/Header'
    import {quillRedefine} from 'vue-quill-editor-upload'

    export default {
        data() {
            return {
                content: `<p>hello world</p>`,
                filterContent: '',
                url: '',
                editorOption: {
                    modules: {
                        toolbar: [
                            ['bold'],    //加粗，斜体，下划线，删除线

                            [{'header': 1}],    // 标题，键值对的形式；1、2表示字体大小

                            [{'align': []}],    //对齐方式

                            ['image']    //上传图片
                        ]
                    },
                }
            }
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill;
            },
        },
        methods: {
            submit() {
                let params = {
                    userId: '1219873111349006336',
                    categoryId: '1220319659312680960', // 日系
                    title: '测试富文本编辑器',
                    content: this.content,
                    filterContent: this.filterContent
                }
                toSubmit(params)
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
                this.content = html
                let data1 = html.replace(/<[^>]+>/g, "")
                if (data1) {
                    this.filterContent = data1.replace(/\s*/g, "")
                }
                // console.info("editor change quill",quill.editor.delta.ops)
                console.info("editor change html", html)
                // console.info("editor change text",text)
            }
        },
        created() {
            this.editorOption = quillRedefine(
                {
                    // 图片上传的设置
                    uploadConfig: {
                        action: 'http://localhost:3000/upload',  // 必填参数 图片上传地址
                        res: (respnse) => {
                            this.url = respnse.info
                            console.info("this.url", this.url)
                            return respnse.info //return图片url
                        },
                        name: 'img'  // 图片上传参数名
                    },
                    toolOptions: ['bold', 'image', {'header': 1}, {'align': []}]
                })
        },
        components: {
            Header
        }
    }
</script>
<style>
  .quill-editor {
    min‐height: 200px;
    max‐height: 400px;
    overflow‐y: auto;
  }
</style>
