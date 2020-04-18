<template>
  <div>
    <header>
      <div class="activity-head">
        <div class="wrapper">
          <div class="sui-navbar">
            <div class="navbar-inner">
              <a href="#" class="sui-brand">
                <!--                <Icon type="ios-car-outline" size="30"/>-->
                <img style="width: 50px;height: 40px" src="http://cyq-test.oss-cn-beijing.aliyuncs.com/car.ico">
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
                <li><a @click="jumpAdd" class="notice" :href="hrefUrl" target="_blank">
                  <Icon type="ios-leaf-outline" size="30"/>
                  写文章 </a></li>
                <li>
                  <Dropdown @on-click="userInfo">
                    <span class="homego">
                      <Avatar :src="user.userImage"/>
                      <span style="font-size: 16px">{{user.userName}}</span>
                    </span>
                    <DropdownMenu slot="list">
                      <DropdownItem name="person" divided>个人信息</DropdownItem>
                      <DropdownItem name="logout" divided>退出登录</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </li>
              </div>
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
                hrefUrl: '',
                query: '',
                user: {
                    userName: '',
                    userId: '',
                    userImage: ''
                }
            }
        },
        methods: {
            clearQuery() {
                this.query = ''
            },
            doSearch() {
                this.$emit("backQueryHandel", this.query)
            },
            jumpAdd() {
                this.hrefUrl = 'http://localhost:10002/add'
            },
            userInfo(name) {
                if (name === 'person') {
                    window.open("http://localhost:10002/person","person_blank_" + Math.random())
                }
                if(name === 'logout'){
                    window.localStorage.removeItem('USER')
                    window.localStorage.removeItem('token')
                    window.location.href = 'http://localhost:10002/'
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
<style scoped>
  .wrapper {
    overflow: visible;
  }
</style>
