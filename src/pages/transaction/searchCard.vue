<template>
  <div>
    <div class="tranForm1" v-if="isFrom">
      <Form :model="model" ref="model" :rules="rule" :label-width="122">
        <FormItem prop="cardNumber" label="号牌号码">
          <Input v-model="model.cardNumber" maxlength="7" show-word-limit placeholder="请输入号牌号码"></Input>
        </FormItem>
        <FormItem prop="cardType" label="号牌种类">
          <Select v-model="model.cardType">
            <Option v-for="(item,index) in model.cardTypeList" :value="item.code" :key="index">
              {{item.name }}
            </Option>
          </Select>
        </FormItem>

        <FormItem prop="cardEngine" label="发动机号后六位">
          <Input v-model="model.cardEngine" maxlength="6" show-word-limit placeholder="请输入发动机号后六位"></Input>
        </FormItem>

        <FormItem prop="idCard" label="身份证后四位">
          <Input v-model="model.idCard" maxlength="4" show-word-limit placeholder="请输入身份证后四位"></Input>
        </FormItem>

        <Button type="primary" @click="submit">查询</Button>
      </Form>
    </div>
    <div class="tranTable" v-if="isTable">
      <Table :columns="columns" :data="data"></Table>
    </div>
  </div>
</template>
<script>
    import {carSearch} from '@/pages/api/car'

    export default {
        data() {
            return {
                isFrom: true,
                isTable: false,
                data: [{
                    rules_date: '-',
                    rules_address: '-',
                    rules_detail: '-',
                    fine: '-',
                    points: '-',
                    state: '-'
                }],
                columns: [{
                    title: '违章时间',
                    key: 'rules_date'
                },
                    {
                        title: '违章地点',
                        key: 'rules_address'
                    },
                    {
                        title: '违章行为',
                        key: 'rules_detail'
                    },
                    {
                        title: '罚款',
                        key: 'fine'
                    },
                    {
                        title: '计分',
                        key: 'points'
                    },
                    {
                        title: '处理状态',
                        key: 'state'
                    }],
                model: {
                    cardTypeList: [
                        {
                            name: "小型汽车",
                            code: '01'
                        },
                        {
                            name: "中型汽车",
                            code: '02'
                        },
                        {
                            name: "大型汽车",
                            code: '03'
                        },
                        {
                            name: "小型汽车新能源",
                            code: '04'
                        },
                        {
                            name: "中型汽车新能源",
                            code: '05'
                        },
                        {
                            name: "大型汽车新能源",
                            code: '06'
                        }
                    ],
                    cardType: '',
                    cardEngine: '',
                    idCard: '',
                    cardNumber: ''
                },
                rule: {
                    cardType: [
                        {required: true, message: '号牌种类不能为空', trigger: 'blur'}
                    ],
                    cardEngine: [
                        {required: true, message: '发动机号后六位不能为空', trigger: 'blur'}
                    ],
                    cardNumber: [
                        {required: true, message: '号牌号码不能为空', trigger: 'blur'}
                    ],
                    idCard: [
                        {required: true, message: '身份证后四位不能为空', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            cleanData(){
                this.model = {
                    cardTypeList: [
                        {
                            name: "小型汽车",
                            code: '01'
                        },
                        {
                            name: "中型汽车",
                            code: '02'
                        },
                        {
                            name: "大型汽车",
                            code: '03'
                        },
                        {
                            name: "小型汽车新能源",
                            code: '04'
                        },
                        {
                            name: "中型汽车新能源",
                            code: '05'
                        },
                        {
                            name: "大型汽车新能源",
                            code: '06'
                        }
                    ],
                        cardType: '',
                        cardEngine: '',
                        idCard: '',
                        cardNumber: ''
                }
            },
            submit() {
                let params = {
                    cardType: this.model.cardType,
                    cardEngine: this.model.cardEngine,
                    idCard: this.model.idCard,
                    cardNumber: this.model.cardNumber
                }
                this.$refs['model'].validate((valid) => {
                    if (valid) {
                        this.$Loading.start();
                        carSearch(params).then((res) => {
                            if (!res.data.data) {
                                this.$Message.warning("服务器正在维护中");
                                this.isTable = false
                                this.isFrom = true
                            } else {
                                this.isTable = true
                                this.isFrom = false
                                this.cleanData()
                            }
                            this.$Loading.finish();
                        }).catch(error => {
                            this.$Message.error("服务器正在维护中");
                        })
                    } else {
                        this.$Message.error('查询失败');
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
  .tranTable {
    width: 1000px;
    margin: 0 auto;
  }
  .tranForm1 {
    width: 400px;
    margin: 0 auto;
  }
</style>
