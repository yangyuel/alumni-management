<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('login.title') }}</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <i class="iconfont iconuser" />
        </span>
        <el-input
          v-model="loginForm.username"
          placeholder="请输入账号"
          name="username"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <!-- <svg-icon icon-class="password" /> -->
          <i class="iconfont iconpassword" />
        </span>
        <el-input
          :type="passwordType"
          v-model="loginForm.password"
          placeholder="请输入密码"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>
      <!-- 登录 -->
      <el-form-item>
        <el-button type="warning" style="width:40%;margin-right:16%;" @click="register">注册</el-button>
        <el-button type="success" style="width:40%;" @click="loginIn">登录</el-button>
      </el-form-item>
      <el-dialog
        :append-to-body="true"
        :visible.sync="createDialog"
        :modal-append-to-body="false"
        title="注册"
        width="40%"
      >
        <!-- TODO 这里是插槽信息 -->
        <div class="create-cps">
          <el-form ref="registerInfo" :model="registerInfo" :rules="regRules" label-width="100px">
            <el-form-item label="账号：" prop="account">
              <el-input v-model="registerInfo.userName"/>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
              <el-input v-model="registerInfo.userCode"/>
            </el-form-item>
            <el-form-item label="姓名：" prop="userName">
              <el-input v-model="registerInfo.userName"/>
            </el-form-item>
            <el-form-item label="学号：" prop="userCode">
              <el-input v-model="registerInfo.userCode"/>
            </el-form-item>
            <el-form-item label="班级：" prop="userGrade">
              <el-input v-model="registerInfo.userGrade"/>
            </el-form-item>
            <el-form-item label="邮箱：" prop="userEmail">
              <el-input v-model="registerInfo.userEmail"/>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="compontentCancel">取 消</el-button>
          <el-button size="small" type="primary" @click="compontentSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </el-form>

    <!-- <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog" append-to-body>
      {{ $t('login.thirdpartyTips') }}
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>-->
  </div>
</template>

<script>
// import { isvalidUsername } from '@/utils/validate'
import SocialSign from './socialsignin'

export default {
  name: 'Login',
  components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位数'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: 'admin123'
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined,
      createDialog: false,
      registerInfo: {
        account: '',
        password: '',
        userName: '',
        userCode: '',
        userGrade: '',
        userEmail: ''
      },
      regRules: {
        account: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }],
        userName: [{ required: true, trigger: 'blur' }],
        userCode: [{ required: true, trigger: 'blur' }],
        userGrade: [{ required: true, trigger: 'blur' }],
        userEmail: [{ required: true, trigger: 'blur' }]
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  mounted() {
    // 请求通知权限
    if (Notification.permission === 'default') {
      Notification.requestPermission()
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('LoginByUsername', this.loginForm)
            .then(res => {
              if (!res) {
                this.loading = false
                this.$message.error('账号或者密码错误')
              } else {
                this.loading = false
                this.$router.push({ path: this.redirect || '/' })
              }
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      // }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #eee;
$light_gray: #eee;
$cursor: #d12844;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    &::first-line {
      color: #d12844;
    }
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #76c0e7;
$light_gray: #d12844;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgb(243, 224, 221);
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
