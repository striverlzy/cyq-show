<template>
  <div>
    <Header></Header>
    <div class="wrapper activities">
      <div class="activity-card-list">
        <div class="top-title">
          <h4 class="latest">最新活动</h4>
          <div class="clearfix"></div>
        </div>
        <div class="activity-list">
          <ul class="activity" style="text-align: left">
            <li class="activity-item">
              <div class="activity-inner">
                <a href="http://"></a>
                <div class="img">
                  <a href="/" target="_blank"><img src="@/assets/img/activity2.png" alt="" /></a>
                </div>
                <div class="text">
                  <p class="title">2020(春季)广州国际车展览会</p>
                  <div class="fl goin">
                    <p>时间：2020-02-15 周六</p>
                    <p>城市：广州</p>
                  </div>
                  <div class="fr btn">
                    <span class="sui-btn btn-bao">立即报名</span>
                  </div>
                  <div class="clearfix"></div>
                </div>
              </div> </li>
            <li class="activity-item">
              <div class="activity-inner">
                <a href="http://"></a>
                <div class="img">
                  <a href="@/assets/activity-detail.html" target="_blank"><img src="@/assets/img/activity3.png" alt="" /></a>
                </div>
                <div class="text">
                  <p class="title">2020(第二届)海口国际新能源暨智能网联汽车展览会</p>
                  <div class="fl goin">
                    <p>时间：2020-01-10 周五</p>
                    <p>城市：广州</p>
                  </div>
                  <div class="fr btn">
                    <span class="sui-btn btn-bao">活动结束</span>
                  </div>
                  <div class="clearfix"></div>
                </div>
              </div> </li>

          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import Header from '@/components/Header'
    import '@/assets/css/page-sj-activity-index.css'
    export default {
        data() {
            return {}
        },
        components:{
            Header
        }
    }
</script>
