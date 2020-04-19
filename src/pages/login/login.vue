<template>

  <div>
    <div class="left"></div>
    <div class="right">
      <div class="login_box">
        <Form ref="model" :model="model" :rules="rule" inline>
          <span>车友登录</span>
          <div class="inp_box">
            <div class="inp">
              <FormItem prop="text"><Input v-model="model.text" placeholder="账号" style="width: 300px"/></FormItem>
              <FormItem prop="password"><Input type="password" v-model="model.password" placeholder="密码"
                                               style="width: 300px"/></FormItem>
              <div class="register"><a> 没有账号？去注册</a></div>

            </div>

            <div class="login_btn">
              <Button type="primary" v-on:click="login">登录</Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>


<script>
    import {toLogin} from '@/pages/api/user'

    export default {
        name: '登录',
        data() {
            return {
                rule: {
                    text: [
                        {required: true, message: '账号不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ]
                },
                model: {
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
                    text: this.model.text,
                    password: this.model.password
                }
                this.$refs['model'].validate((valid) => {
                    if (valid) {
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
                            this.$Loading.error("账号或密码错误");
                        })
                    } else {
                        this.$Message.error('登录失败');
                    }
                })

            }
        }
    }
</script>
<style lang="less" scoped>
  .right {
    /deep/ .ivu-form-inline .ivu-form-item {
      display: block;
      margin-right: 0;
    }

    /deep/ .ivu-form-item-error-tip {
      padding-top: 0;
      margin-top: -8px;
    }

    /deep/ .ivu-form-item {
      margin-bottom: 0;
    }
  }

  .left {
    width: 50%;
    float: left;
    height: 640px;
    background: #00a8ff;
  }

  .right {
    width: 50%;
    float: left;
    margin-top: 200px;

    .login_box {
      width: 300px;
      margin: 0 auto;
      font-size: 30px;

      .inp {
        /deep/ Input {
          margin: 10px 0;
          height: 40px;
        }
      }

      .login_btn {
        /deep/ Button {
          margin-top: 10px;
          width: 300px;
          height: 40px;
        }
      }

      .register {
        font-size: 12px;
        text-align: right;
      }
    }

  }

</style>


