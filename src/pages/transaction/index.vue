<template>
  <div>
    <Header></Header>

    <div class="box">
      <div class="transaction_box" v-if="isBox">
        <div class="back-img">
          <div style="width: 200px">
            <div :class="{'isBack':isBack}">
              <img style="width: 40px;height: 40px;cursor: pointer;"
                   src="http://cyq-test.oss-cn-beijing.aliyuncs.com/back.png"></div>
          </div>
        </div>
        <div class="transaction" @click="searchCard">
          <div class="tran_icon"></div>
          <span>驾照查询</span>
        </div>
        <div class="transaction" @click="recomment">
          <div class="tran_icon2"></div>
          <span>购车推荐</span>

        </div>
      </div>
      <div v-if="isSearchCard">
        <SearchCard></SearchCard>
      </div>

      <div v-if="isRecomment">
        <Recomment></Recomment>
      </div>
    </div>


  </div>
</template>
<script>
    import Header from '@/components/Header'
    import SearchCard from '@/pages/transaction/searchCard'
    import Recomment from '@/pages/transaction/recomment'

    export default {
        data() {
            return {
                isBack: true,
                isBox: true,
                isRecomment: false,
                isSearchCard: false,
                rule: {},
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
        methods: {
            searchCard() {
                this.isSearchCard = true
                this.isBox = false
                this.isBack = false
            },
            recomment() {
                this.isBox = false
                this.isBack = false
                this.isRecomment = true
            }
        },
        components: {
            SearchCard,
            Header,
            Recomment
        }
    }
</script>

<style lang="less" scoped>

  .isBack {
    opacity: 0
  }

  .box {
    width: 100%;
    height: 500px;
    background: #ffffff;
    padding: 100px 0;

    .transaction_box {
      width: 1200px;
      height: 300px;
      margin: 0 auto;

      .back-img {
        float: left;
      }

      .transaction {
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

        .tran_icon {
          width: 200px;
          height: 200px;
          margin: 0 auto;
          background: url("http://cyq-test.oss-cn-beijing.aliyuncs.com/mjiazhao.png");
        }

        .tran_icon2 {
          width: 200px;
          height: 200px;
          margin: 0 auto;
          background: url("http://cyq-test.oss-cn-beijing.aliyuncs.com/car.png");
        }
      }

      .transaction:hover {
        background: #00a8ff;
        color: #ffffff;

        .tran_icon {
          background: url("http://cyq-test.oss-cn-beijing.aliyuncs.com/jiazhao_actived.png")
        }

        .tran_icon2 {
          background: url("http://cyq-test.oss-cn-beijing.aliyuncs.com/car_actived.png")
        }
      }


    }

    .tranForm1 {
      width: 400px;
      margin: 0 auto;
    }
  }

</style>
