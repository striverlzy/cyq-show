<template>

  <div>
    <div class="left"></div>
    <div class="right">
      <div class="login_box">
        <span>车友登录</span>
        <div class="inp_box">
          <div class="inp">
            <Input v-model="loginForm.text" placeholder="账号" style="width: 300px" />
            <Input type="password" v-model="loginForm.password" placeholder="密码" style="width: 300px" />
            <div class="register"><a> 没有账号？去注册</a></div>

          </div>

          <div class="login_btn">
            <Button type="primary" v-on:click="login">登录</Button>
          </div>
        </div>
      </div>
    </div>
  </div>

<!--  <Form class="login-container" ref="formInline" inline>-->
<!--    <h3 class="login_title">系统登录</h3>-->
<!--    <FormItem prop="user">-->
<!--      <Input type="text" v-model="loginForm.text" placeholder="账号">-->
<!--        <Icon type="ios-person-outline" slot="prepend"></Icon>-->
<!--      </Input>-->
<!--    </FormItem>-->
<!--    <FormItem prop="password">-->
<!--      <Input type="password" v-model="loginForm.password" placeholder="密码">-->
<!--        <Icon type="ios-lock-outline" slot="prepend"></Icon>-->
<!--      </Input>-->
<!--    </FormItem>-->
<!--    <FormItem>-->
<!--      <Button type="primary" v-on:click="login">登录</Button>-->
<!--    </FormItem>-->
<!--  </Form>-->

</template>


<script>
    import {toLogin} from '@/pages/api/user'

    export default {
        name: '登录',
        data() {
            return {

                loginForm: {
                    text: '',
                    password: ''
                },
                value: '',
                responseResult: []
            }
        },
        methods: {
            login() {
                let params = {
                    text: this.loginForm.text,
                    password: this.loginForm.password
                }
                this.$Loading.start();
                toLogin(params).then((res) => {
                    if (res.data.code === 20000) {
                        let userInfo = res.data.data
                        this.$store.commit('$_setToken', userInfo.token);
                        let userMessage = {
                            userId: userInfo.userId,
                            userName: userInfo.userName,
                            userImage: userInfo.userImage
                        }
                        window.localStorage.setItem('USER', JSON.stringify(userMessage))
                        this.$router.push({path: '/'})
                    }
                    this.$Loading.finish();
                }).catch(error => {
                    this.$Loading.error();
                })
            }
        }
    }
</script>
<style lang="less" scoped>
  /*.login-container {*/
  /*  border-radius: 15px;*/
  /*  background-clip: padding-box;*/
  /*  margin: 90px auto;*/
  /*  width: 350px;*/
  /*  padding: 35px 35px 15px 35px;*/
  /*  background: #fff;*/
  /*  border: 1px solid #eaeaea;*/
  /*  box-shadow: 0 0 25px #cac6c6;*/
  /*}*/

  /*.login_title {*/
  /*  margin: 0px auto 40px auto;*/
  /*  text-align: center;*/
  /*  color: #505458;*/
  /*}*/

  .left{
    width: 50%;
    float: left;
    height: 640px;
    background: #00a8ff;
  }

  .right{
    width: 50%;
    float: left;
    margin-top: 200px;
    .login_box{
      width: 300px;
      margin: 0 auto;
      font-size: 30px;
      .inp {
     /deep/ Input{
       margin: 10px 0;
        height: 40px;
      }
      }
      .login_btn{
      /deep/ Button{
        margin-top:10px;
        width: 300px;
        height: 40px;
      }
      }
      .register{
        font-size: 12px;
        text-align: right;
      }
    }

  }

</style>


