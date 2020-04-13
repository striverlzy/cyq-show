<template>
  <div>
    <header>
      <div class="activity-head">
        <div class="wrapper">
          <div class="sui-navbar">
            <div class="navbar-inner">
              <a href="index-logined.html" class="sui-brand">
                <!--                <Icon type="ios-car-outline" size="30"/>-->
                <img style="width: 50px;height: 40px" src="static/car.ico">
              </a>
              <ul class="sui-nav">
                <router-link to="/" tag="li" active-class="active" exact><a>车友圈</a>
                </router-link>
                <router-link to="/qa" tag="li" active-class="active"><a>问答</a>
                </router-link>
                <router-link to="/gathering" tag="li" active-class="active"><a>活动
                </a></router-link>
                <router-link to="/transaction" tag="li" active-class="active"><a>车务</a>
                </router-link>
              </ul>
              <form class="sui-form sui-form pull-left" style="padding: 3px">

                <Input search placeholder="输入关键词.." v-model="query" @on-search="doSearch"/>
                <!--                                <span class="btn-search fa fa-search"></span>-->
              </form>
              <div class="sui-nav pull-right info">
                <li><a @click="jumpAdd" class="notice">
                  <Icon type="ios-leaf-outline" size="30"/>
                  写文章 </a></li>
                <li>
                  <Dropdown>
                    <a href="javascript:void(0)" target="_blank" class="homego">
                      <Avatar :src="user.userImage"/>
                      <span style="font-size: 16px">{{user.userName}}</span>
                      <Icon type="ios-arrow-down"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                      <!--                      <DropdownItem divided>个人信息</DropdownItem>-->
                      <DropdownItem divided>退出登录</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <!--                  <Dropdown>-->
                  <!--                    <a href="javascript:void(0)">-->
                  <!--                      下拉菜单-->
                  <!--                      <Icon type="ios-arrow-down"></Icon>-->
                  <!--                    </a>-->
                  <!--                    <DropdownMenu slot="list">-->
                  <!--                      <DropdownItem>驴打滚</DropdownItem>-->
                  <!--                      <DropdownItem>炸酱面</DropdownItem>-->
                  <!--                      <DropdownItem disabled>豆汁儿</DropdownItem>-->
                  <!--                      <DropdownItem>冰糖葫芦</DropdownItem>-->
                  <!--                      <DropdownItem divided>北京烤鸭</DropdownItem>-->
                  <!--                    </DropdownMenu>-->
                  <!--                  </Dropdown>-->
                </li>
              </div>
              <!--              <div class="sui-nav pull-right info" v-if="user.name!==undefined">-->
              <!--                <li><a href="/manager" target="_blank" class="notice">{{user.name}}</a></li>-->
              <!--                <li><a @click="logout" class="notice">退出登录</a></li>-->
              <!--                <li><a href="/manager" class="homego"><img :src="user.avatar" width="50px" height="50px" :alt="user.name"></a>-->
              <!--                </li>-->
              <!--              </div>-->
              <!--              <div class="sui-nav pull-right info" v-if="user.name===undefined">-->
              <!--                <router-link to="/login">登录</router-link>-->
              <!--              </div>-->
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
    import '@/assets/plugins/normalize-css/normalize.css'
    import '@/assets/plugins/yui/cssgrids-min.css'
    import '@/assets/plugins/sui/sui.min.css'
    import '@/assets/plugins/sui/sui-append.min.css'
    import '@/assets/plugins/font-awesome/css/font-awesome.min.css'
    import '@/assets/css/widget-base.css'
    import '@/assets/css/page-sj-activity-index.css'
    import '@/assets/css/widget-head-foot.css'
    import '@/assets/css/page-sj-headline-login.css'
    import {getUserById} from '@/pages/api/user'

    export default {
        data() {
            return {
                isShowAdd: true,
                query:'',
                user: {
                    userName: '',
                    userId: '',
                    userImage: ''
                }
            }
        },
        methods: {
            clearQuery(){
                this.query = ''
            },
            doSearch(){
              this.$emit("backQueryHandel",this.query)
            },
            jumpAdd() {
                const path = this.$route.path
                // console.log(path)
                if (path !== '/add') {
                    this.$router.push({path: '/add'})
                }
            },
            loadData() {
                if (window.localStorage.getItem('USER')) {
                    let userInfo = window.localStorage.getItem('USER')
                    this.user = JSON.parse(userInfo)
                }
            }
        },
        created() {
            this.loadData()
        }
    }
</script>
