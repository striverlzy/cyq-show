<template>
  <div>
    <Header></Header>

    <div class="box">
      <div class="transaction_box">
        <div class="transaction">
          <div class="tran_icon"></div>
            <span>驾照查询</span>
        </div>
        <div class="transaction">
          <div class="tran_icon2"></div>
          <span>购车推荐</span>

        </div>
      </div>

      <div class="tranForm1">
        <Form :model="formItem" :label-width="80">
        <FormItem label="Input">
          <Input v-model="formItem.input" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="Select">
          <Select v-model="formItem.select">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>

          <FormItem label="Input">
            <Input v-model="formItem.input" placeholder="Enter something..."></Input>
          </FormItem>

          <FormItem label="Input">
            <Input v-model="formItem.input" placeholder="Enter something..."></Input>
          </FormItem>

          <Button type="primary">Primary</Button>
          </Form>
    </div>





      <div class="tranForm1">

      </div>
    </div>




  </div>
</template>
<script>
    import Header from '@/components/Header'
    export default {
        data() {
            return {
                formItem: {
                    input: '',
                    select: '',
                    radio: 'male',
                    checkbox: [],
                    switch: true,
                    date: '',
                    time: '',
                    slider: [20, 50],
                    textarea: ''
                }
            }
        },
        components:{
            Header
        }
    }
</script>

<style lang="less" scoped>

  .box{
    width: 100%;
    height: 500px;
    background: #ffffff;
    padding: 100px 0;
    .transaction_box{
      width: 800px;
      height: 300px;
      margin: 0 auto;
      display: none;
      .transaction{
        margin: 0 50px;
        width: 300px;
        height: 300px;
        float: left;
        border-radius: 10px;
        box-shadow: 0px 0px 15px #aaaaaa;
        cursor: pointer;
        text-align: center;
        /*line-height: 450px;*/
        font-size: 30px;
        .tran_icon{
          width: 200px;
          height: 200px;
          margin: 0 auto;
          background: url("http://cyq-test.oss-cn-beijing.aliyuncs.com/mjiazhao.png");
        }
        .tran_icon2{
          width: 200px;
          height: 200px;
          margin: 0 auto;
          background: url("http://cyq-test.oss-cn-beijing.aliyuncs.com/car.png");
        }
      }
      .transaction:hover{
        background: #00a8ff;
        color: #ffffff;
        .tran_icon{
          background: url("http://cyq-test.oss-cn-beijing.aliyuncs.com/jiazhao_actived.png")
        }
        .tran_icon2{
          background: url("http://cyq-test.oss-cn-beijing.aliyuncs.com/car_actived.png")
        }
      }


    }
    .tranForm1{
      width: 400px;
      margin: 0 auto;
    }
  }

</style>
