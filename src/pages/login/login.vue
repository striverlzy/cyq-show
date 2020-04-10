<template>

  <Form class="login-container" ref="formInline" inline>
    <h3 class="login_title">系统登录</h3>
    <FormItem prop="user">
      <Input type="text" v-model="loginForm.text" placeholder="账号">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="loginForm.password" placeholder="密码">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <Button type="primary" v-on:click="login">登录</Button>
    </FormItem>
  </Form>
  <!--  <el-form class="login-container" label-position="left"-->
  <!--           label-width="0px">-->
  <!--    <h3 class="login_title">系统登录</h3>-->
  <!--    <el-form-item>-->
  <!--      <el-input type="text" v-model="loginForm.mobile"-->
  <!--                auto-complete="off" placeholder="账号"></el-input>-->
  <!--    </el-form-item>-->
  <!--    <el-form-item>-->
  <!--      <el-input type="password" v-model="loginForm.password"-->
  <!--                auto-complete="off" placeholder="密码"></el-input>-->
  <!--    </el-form-item>-->
  <!--    <el-form-item style="width: 100%">-->
  <!--      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>-->
  <!--    </el-form-item>-->
  <!--  </el-form>-->
</template>


<script>
    import {toLogin} from '@/pages/api/user'

    export default {
        name: '登录',
        data() {
            return {
                // ruleInline:{
                //     user: [
                //         { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                //     ],
                //     password: [
                //         { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                //         { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                //     ]
                // },
                loginForm: {
                    text: '',
                    password: ''
                },
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
<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

</style>


