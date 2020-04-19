<template>
  <div>
    <div class="tranForm1">
      <Form :label-width="122">
        <div v-if="isShow">
          <FormItem label="请选择车型">
            <Select v-model="model.cardType">
              <Option v-for="(item,index) in model.cardTypeList" :value="item.code" :key="index">
                {{item.name }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="请选择系列">
            <Select v-model="model.categoryId">
              <Option v-for="(item,index) in model.categoryList" :value="item.categoryId" :key="index">
                {{item.categoryName }}
              </Option>
            </Select>
          </FormItem>

          <FormItem label="价格区间">
            <Select v-model="model.priceCode">
              <Option v-for="(item,index) in model.priceList" :value="item.code" :key="index">
                {{item.price }}
              </Option>
            </Select>
          </FormItem>


          <Button type="primary" @click="submit">查询</Button>
        </div>

        <div v-if="isResult">
          <FormItem label="根据您的描述">
            本田适合您
          </FormItem>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
    import {carRecommend} from '@/pages/api/car'
    import {getCategory} from '@/pages/api/article'

    export default {
        data() {
            return {
                isResult: false,
                isShow: true,
                model: {
                    priceCode: '',
                    priceList: [
                        {
                            price: "10万-20万",
                            code: "01"
                        },
                        {
                            price: "20万-30万",
                            code: "02"
                        },
                        {
                            price: "30万-40万",
                            code: "03"
                        },
                        {
                            price: "40万-50万",
                            code: "04"
                        },
                        {
                            price: "50万以上",
                            code: "05"
                        },
                    ],
                    categoryList: [],
                    cardTypeList: [
                        {
                            name: "轿车",
                            code: '01'
                        },
                        {
                            name: "SUV",
                            code: '02'
                        },
                        {
                            name: "新能源汽车",
                            code: '03'
                        }
                    ],
                    categoryId: '',
                    categoryName: '',
                    carType: '',
                    price: '',
                }
            }
        },
        methods: {
            submit() {
                let params = {
                    cagetoryName: this.model.cagetoryName,
                    carType: this.model.carType,
                    price: this.model.price
                }
                // carRecommend(params).then((res) => {
                //     console.log("res", res.data.data)
                //     if (res.data.data === 20000) {
                //         this.isShow = false
                //         this.isResult = true
                //     } else {
                //         this.isResult = false
                //         this.isShow = true
                //     }
                // })
                this.isShow = false
                this.isResult = true
            },
            cleanData() {
                this.model = {
                    priceCode: '',
                    priceList: [
                        {
                            price: "10万-20万",
                            code: "01"
                        },
                        {
                            price: "20万-30万",
                            code: "02"
                        },
                        {
                            price: "30万-40万",
                            code: "03"
                        },
                        {
                            price: "40万-50万",
                            code: "04"
                        },
                        {
                            price: "50万以上",
                            code: "05"
                        },
                    ],
                    categoryList: [],
                    categoryId: '',
                    cardTypeList: [
                        {
                            name: "轿车",
                            code: '01'
                        },
                        {
                            name: "SUV",
                            code: '02'
                        },
                        {
                            name: "新能源汽车",
                            code: '03'
                        }
                    ],
                    categoryName: '',
                    carType: '',
                    price: '',
                }
                this.getCategory()
            },
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
        },
        mounted() {
            this.getCategory()
        }
    }
</script>
<style lang="less" scoped>
  .tranForm1 {
    width: 400px;
    margin: 0 auto;
  }
</style>
