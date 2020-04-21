<template>

  <div>
    <div class="left"></div>
    <div class="right">
      <div class="login_box">
        <Form ref="model" :model="model" :rules="rule" inline>
          <span>车友注册</span>
          <div class="inp_box">
            <div class="inp">
              <FormItem prop="username" label="用户名"><Input v-model="model.username" placeholder="请输入用户名"
                                                           style="width: 300px"/>
              </FormItem>
              <FormItem prop="mobile" label="手机"><Input v-model="model.mobile" placeholder="请输入手机号码"
                                                        style="width: 300px"/>
              </FormItem>
              <FormItem prop="password" label="密码"><Input type="password" v-model="model.password" placeholder="请输入密码"
                                                          style="width: 300px"/></FormItem>
              <FormItem prop="code" label="短信验证码">
                <table style="width: 300px">
                  <tr style="width: 100%">
                    <td style="width: 70%">
                      <Input v-model="model.code" placeholder="请输入短信验证码"/>
                    </td>
                    <td style="width: 30%">
                      <Button :style="buttonOk" type="primary" v-if="!canClick" disabled> {{content}}</Button>
                      <Button @click="countDown" :style="buttonOk" type="primary" v-if="canClick"> {{content}}</Button>
                    </td>

                  </tr>
                </table>
              </FormItem>
              <FormItem prop="userImage" label="头像">
                <div style="width: 300px">
                  <table>
                    <tr>
                      <td style="width: 70%">  <Upload :before-upload="handleUpload" action="/upload">
                        <Button icon="ios-cloud-upload-outline">上传</Button>
                      </Upload></td>
                      <td style="width: 30%" v-if="model.userImage">
                        <img style="width: 30px;height: 30px;margin-top: 1px;border-radius: 30px" :src="model.userImage">
                      </td>
                    </tr>
                  </table>

                </div>
              </FormItem>
              <div class="register"><a href="/login" target="_blank">去登录</a></div>

            </div>

            <div class="login_btn">
              <Button type="primary" v-on:click="login">注册</Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
    <Modal ref="setModal" @backHandle="backHandle" v-if="showModal"></Modal>
  </div>
</template>


<script>
    import {put, remove} from '@/pages/api/upload'
    import {toRegister, toSendsms} from '@/pages/api/user'
    import Modal from '@/components/Modal'


    export default {
        name: '登录',
        data() {
            return {
                canClick: true, // 添加canClick
                buttonOk: {},
                content: '点击发送',
                showModal: false,
                rule: {
                    username: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'}
                    ],
                    mobile: [
                        {required: true, message: '手机不能为空', trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '验证码不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ]
                },
                model: {
                    username: '',
                    mobile: '',
                    code: '',
                    password: '',
                    userImage: ''
                },
                value: '',
                responseResult: [],
                totalTime: 60
            }
        },
        components: {
            Modal
        },
        methods: {
            handleUpload(item) {
                let fileName = item.name  // 当前本地上传的这张图片的名称(没有时间日期)
                let date = new Date()
                let year = date.getFullYear()
                let month = date.getMonth() + 1
                month = (month < 10 ? '0' + month : month)
                let mydate = date.getDate()
                mydate = (mydate < 10 ? '0' + mydate : mydate)
                // 这里是把时间+图片名称拼接起来形成一个新的图片上传至oss，目的是区别于本地图片的名称，避免名称相同会误删，同时便于查看oss上最新上传图片的时间点
                let filePath = year + month + mydate + '-' + fileName


                put(filePath, item).then(result => {  // 调oss api 上传图片
                    // 文件上传成功后，获取返回值中的文件名name，并把其放入fileList数组中，表示当前已上传的文件
                    this.model.userImage = result.url
                })
            },
             countDown() {
                if (this.model.mobile) {
                    this.$Loading.start();
                    toSendsms(this.model.mobile).then((res) => {
                        this.$Message.success('发送成功');
                        if (res) {
                            if (!this.canClick) return
                            this.canClick = false
                            let clock = window.setInterval(() => {
                                this.totalTime--
                                this.content = '重新获取' + '(' + this.totalTime + 's' + ')'
                                if (this.totalTime < 1) {
                                    window.clearInterval(clock)
                                    this.content = '点击获取'
                                    this.canClick = true
                                    this.buttonOk = {
                                        color: '#fff',
                                        background: '#3e97df'
                                    }
                                }
                            }, 1000)
                        }
                    })
                    this.$Loading.finish();
                } else {
                    this.$Message.success('请输入手机号');
                }
            },
            backHandle() {
                this.$router.push({path: '/'})
            },
            showModals() {
                this.showModal = true
            },
            login() {
                this.$refs['model'].validate((valid) => {
                    if (valid) {
                        this.$Loading.start();
                        let params = {
                            username: this.model.username,
                            mobile: this.model.mobile,
                            code: this.model.code,
                            password: this.model.password,
                            age: '',
                            userImage: this.model.userImage || 'http://cyq-test.oss-cn-beijing.aliyuncs.com/car-person.png',
                            sex: ''
                        }
                        toRegister(params).then((res) => {
                            this.$Message.success('注册成功');
                            this.$router.push({path: '/login'})
                            this.$Loading.finish();
                        }).catch(error => {
                            this.$Loading.error("账号或密码错误");
                        })
                    } else {
                        this.$Message.error('注册失败');
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
    margin-top: 20px;

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
        font-size: 13px;
        text-align: right;
      }
    }

  }

</style>


