<template>
  <div>
    <Header></Header>
    <div class="myhome-personinfo" style="background-color:#AEDD81">
      <div class="wrapper">
        <div class="person-baseinfo">
          <!--头像信息-->
          <div class="photo">
            <img src="@/assets/img/widget-myphoto.jpg" alt="" class="person" />
          </div>
          <!--文字信息-->
          <div class="info">
            <h1>Web爱好者<span class="allinfo"><a href="./person-myfile.html" target="_blank">查看完整档案</a></span></h1>
            <ul class="fill">
              <li> <i class="fa fa-map-marker" aria-hidden="true"></i> <span class="edit-item"> 填写现居城市</span>
                <form action="" class="sui-form form-inline">
                  <input type="text" placeholder="现居城市" />
                  <button class="sui-btn btn-danger save-btn">保存</button>
                </form> </li>
              <li> <i class="fa fa-graduation-cap" aria-hidden="true"></i> <span class="edit-item"> 填写毕业院校</span>
                <form action="" class="sui-form form-inline">
                  <input type="text" placeholder="院校名称" />
                  <input type="text" placeholder="所学专业" />
                  <button class="sui-btn btn-danger save-btn">保存</button>
                </form> </li>
              <li> <i class="fa fa-shopping-bag" aria-hidden="true"></i> <span class="edit-item"> 填写所在公司/组织</span>
                <form action="" class="sui-form form-inline">
                  <input type="text" placeholder="公司/组织名称" />
                  <input type="text" placeholder="职位头衔" />
                  <button class="sui-btn btn-danger save-btn">保存</button>
                </form> </li>
              <li> <i class="fa fa-link" aria-hidden="true"></i> <span class="edit-item"> 填写个人网站</span>
                <form action="" class="sui-form form-inline">
                  <input type="text" placeholder="个人网站" />
                  <button class="sui-btn btn-danger save-btn">保存</button>
                </form> </li>
            </ul>
          </div>
        </div>
        <!--右侧编辑-->
        <div class="edit-info">
          <h4>个人简介<span class="addedit"><img src="@/assets/img/widget-edit.png" width="12" height="12" />编辑</span></h4>
          <div class="info-box">
            <div class="edit-intro">
              暂时没有个人简介
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
    <!--两列布局-->
    <div class="wrapper  myhome">
      <div class="left-list">
        <div class="myhome-list">
          <ul class="home-list">
            <li class="active"><a href="./person-homepage.html">我的主页</a></li>
            <li><a href="./person-myanswer.html">我的回答</a></li>
            <li><a href="./person-myquestion.html">我的提问</a></li>
            <li><a href="./person-myshare.html">我的分享</a></li>
          </ul>
          <ul class="home-list bottom">
            <li><a href="./person-dynamic.html">个人动态</a></li>
            <li><a href="./person-myfocus.html">我的关注</a></li>
            <li><a href="./person-mycollect.html">我的收藏</a></li>
            <li><a href="./person-myreaded.html">浏览记录</a></li>
            <li><a href="./person-account.html">账户设置</a></li>
          </ul>
        </div>
      </div>
      <div class="right-content">
        <div class="home-content">
          <ul class="sui-nav nav-tabs nav-large">
            <li class="active"><a href="#one" data-toggle="tab">我的提问</a></li>
            <li><a href="#two" data-toggle="tab">我的回答</a></li>
          </ul>
          <div class="tab-content tab-wraped">
            <div id="one" class="tab-pane active">
              <ul class="question-list">
                <li> <span class="fl good"><span class="num">12</span> 有用</span> <span class="title"><a href="#">有关PHP初级进阶的问题</a></span> <span class="fr date">4月6日</span> <span class="clearfix"></span> </li>
                <li> <span class="fl good"><span class="num">12</span> 有用</span> <span class="title"><a href="#">有关JAVA初级进阶的问题</a></span> <span class="fr date">4月6日</span> <span class="clearfix"></span> </li>
                <li> <span class="fl good"><span class="num">12</span> 有用</span> <span class="title"><a href="#">有关HTML5初级进阶的问题</a></span> <span class="fr date">4月6日</span> <span class="clearfix"></span> </li>
                <li> <span class="fl good"><span class="num">12</span> 有用</span> <span class="title"><a href="#">有关C++初级进阶的问题</a></span> <span class="fr date">4月6日</span> <span class="clearfix"></span> </li>
                <li> <span class="fl good"><span class="num">12</span> 有用</span> <span class="title"><a href="#">有关python初级进阶的问题</a></span> <span class="fr date">4月6日</span> <span class="clearfix"></span> </li>
              </ul>
            </div>
            <div id="two" class="tab-pane">
              <ul class="question-list">
                <li> <span class="fl good"> <span class="num">8</span> 有用</span> <span class="title"><a href="#">有关PHP初级进阶的问题</a></span> <span class="fr date">2017-07-05 15:08</span> <span class="clearfix"></span> </li>
                <li> <span class="fl good"> <span class="num">7</span> 有用</span> <span class="title"><a href="#">有关JAVA初级进阶的问题</a></span> <span class="fr date">2017-07-05 15:08</span> <span class="clearfix"></span> </li>
                <li> <span class="fl good"> <span class="num">6</span> 有用</span> <span class="title"><a href="#">有关HTML5初级进阶的问题</a></span> <span class="fr date">2017-07-05 15:08</span> <span class="clearfix"></span> </li>
                <li> <span class="fl good"> <span class="num">12</span> 有用</span> <span class="title"><a href="#">有关C++初级进阶的问题</a></span> <span class="fr date">2017-07-05 15:08</span> <span class="clearfix"></span> </li>
                <li> <span class="fl good"> <span class="num">12</span> 有用</span> <span class="title"><a href="#">有关python初级进阶的问题</a></span> <span class="fr date">2017-07-05 15:08</span> <span class="clearfix"></span> </li>
              </ul>
            </div>
          </div>
          <div class="activities">
            <h4 class="tit"><span>我的动态</span></h4>
            <ul class="activities-content">
              <li>
                <div class="index-title">
                  <span class="author">本杰明</span>
                  <span class="operate">关注了标签</span> &middot;
                  <span class="time">3小时前</span>
                </div>
                <div class="guanzhuname">
                  <span class="tag">php</span>
                  <span class="tagnum">100</span> 关注
                </div>
                <div class="intro">
                  PHP，是英文超文本预处理语言 Hypertext Preprocessor 的缩写。PHP 是一种开源的通用计算机脚本语言，尤其适用于网络开发并可嵌入HTML中使用。PHP 的语法借鉴吸收C语言、Java和Perl等流行计算机语言的特点，易于一般程序员学习。
                </div> </li>
              <li>
                <div class="index-title">
                  <span class="author">本杰明</span>
                  <span class="operate">回答了问题</span> &middot;
                  <span class="time">3小时前</span>
                </div>
                <div class="question">
                  <p class="title">网页链接如何直接打开微信，并进入公众号关注页面</p>
                  <p class="content">现在针对这个微信是屏蔽的，你可以选择通过连接到一个其他的公众号文章中进行关注。</p>
                </div>
                <div class="qa-num">
                  <span>关注<i>1</i></span>
                  <span>回答<i>2</i></span>
                </div> </li>
              <li>
                <div class="index-title">
                  <span class="author">本杰明</span>
                  <span class="operate">收藏了文章</span> &middot;
                  <span class="time">3小时前</span>
                </div>
                <div class="question">
                  <p class="title">网页链接如何直接打开微信，并进入公众号关注页面</p>
                </div>
                <div class="qa-num">
                  <span><a href="#">http://baidu.com</a></span>
                </div> </li>
              <li>
                <div class="index-title">
                  <span class="author">本杰明</span>
                  <span class="operate">收藏了文章</span> &middot;
                  <span class="time">3小时前</span>
                </div>
                <div class="question">
                  <p class="title">网页链接如何直接打开微信，并进入公众号关注页面</p>
                </div>
                <div class="qa-num">
                  <span><a href="#">http://baidu.com</a></span>
                </div> </li>
              <li>
                <div class="index-title">
                  <span class="author">本杰明</span>
                  <span class="operate">回答了问题</span> &middot;
                  <span class="time">3小时前</span>
                </div>
                <div class="question">
                  <p class="title">网页链接如何直接打开微信，并进入公众号关注页面</p>
                  <p class="content">现在针对这个微信是屏蔽的，你可以选择通过连接到一个其他的公众号文章中进行关注。</p>
                </div>
                <div class="qa-num">
                  <span>关注<i>1</i></span>
                  <span>回答<i>2</i></span>
                </div> </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>
<script>
    import Header from '@/components/Header'
    import '@/assets/css/page-sj-person-homepage.css'
    export default {
        data() {
            return {}
        },
        components:{
            Header
        }
    }
</script>
