<template>
  <div>
    <Modal
      v-model="modal1"
      title="欢迎您进入车友圈平台！"
      @on-ok="ok"
      @on-cancel="cancel">
      <div>
        <Form>
          <FormItem label="您的车龄是？">
            <Input v-model="model.carAge"></Input>
          </FormItem>
          <FormItem label="你最想了解哪个系列的车型">
            <Select v-model="model.categoryId" class="title_select"
                    :label-in-value="true"
                    placeholder="请选择系列">
              <Option v-for="item in model.categoryList" :value="item.categoryId" :key="item.categoryId">
                {{item.categoryName }}
              </Option>
            </Select>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>
<script>
    import {
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
                model: {
                    categoryName: '',
                    categoryId: '',
                    carAge: '',
                    categoryList: ''
                },
                modal1: true
            }
        },
        methods: {
            getCategory() {
                this.$Loading.start();
                getCategory().then((res) => { // 获取分类名
                    if (res) {
                        this.model.categoryList = res.data.data
                    }
                    this.$Loading.finish();
                }).catch(error => {
                    this.$Loading.error();
                })
            },
            showModal() {
                this.modal1 = true
            },
            ok() {
                this.$Message.info('提交成功');
            },
            cancel() {
                this.modal1 = false
            }
        },
        mounted() {
            this.getCategory()
        }
    }
</script>
