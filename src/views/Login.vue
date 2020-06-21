<template>
  <div id="login">
    <div class="H6Logo"><img src="@/assets/img/H6-logo.png" alt=""></div>
    <div class="loginMessage">
      <h2 class="title">
        {{pName}}&nbsp;
        <span style="font-size: 14px">{{SystemVersion}}</span>
      </h2>
      <div class="left LoginDiv">Log In</div>
      <div>
        <el-input
          prefix-icon="icon-user"
          placeholder="Windows ID"
          v-model="params.Name"
          autofocus="autofocus"/>
      </div>
      <div>
        <el-input
          placeholder="Password"
          prefix-icon="icon-key"
          :type="eye ? 'text':'password'"
          v-model="params.Password">
          <div slot="append" class="LoginRight" @click="EyeClick" :class="{active:eye}">
            <i class="fa fa-eye-slash" aria-hidden="true" v-if="!eye"></i>
            <i class="fa fa-eye" aria-hidden="true" v-if="eye"></i>
          </div>
        </el-input>
      </div>
      <div class="verificationDiv">
        <el-input
          placeholder="Verification code"
          prefix-icon="iconfont icon-yanzhengma"
          v-model="params.Code"
          @keyup.enter.native="successLogin"/>
        <span
          @click="toggleCode"
          class="VerificationCodeSpan"
          :style="{'background-image': inputCode}"/>
      </div>
      <div
        class="right"
        style="text-align:right;"
        @click="resetPassword">
        <span class="ForgotPassword">Forget password</span>
      </div>
      <div class="spaceBetween">
        <div style="position:relative">
          <el-button @click="goRegister" class="DefaultBtn">Sign up</el-button>
          <div style="display: inline-block;position:absolute;top: 6px;left: 73px;">
            <el-tooltip content="Help" placement="top">
              <i class="el-icon-question" @click="goPdf" style="cursor: pointer;color:#00677f;font-size:22px;"/>
            </el-tooltip>
          </div>
        </div>
        <div>
          <el-button @click="successLogin" class="SignUpBtn">Login</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { LoginApi } from '@/api'
import { userInfo, role } from '@/utils'
import { Component, Vue, Ref } from 'vue-property-decorator'
import { Input } from 'element-ui'
import $ccw from 'liu_qihao'

@Component
export default class Login extends Vue {
  eye = false
  inputCode = ''
  pName = 'System Name'
  SystemVersion = ''
  params = {
    Name: '',
    Password: '',
    Code: '',
    ECode: ''
  }

  @Ref('username') ref_username!: Input
  @Ref('password') ref_password!: Input

  mounted (): void {
    this.getSystemName()
    this.toggleCode()
    console.log($ccw.NumberRound(-100.52))
  }

  async getSystemName () {
    const res = await LoginApi.GetSystemName()
    if (res.data.Success) {
      this.SystemVersion = res.data.Data.Version || ''
      this.pName = res.data.Data.SystemNameEn || ''
    }
  }

  async toggleCode () {
    const res = await LoginApi.GetVCode()
    if (res.data.Success) {
      this.inputCode = 'url(' + res.data.Data.Img + ')'
      this.params.ECode = res.data.Data.Code
    }
  }

  goPdf () {
    window.open('/Help/Registration.pdf', 'new')
  }

  EyeClick () {
    this.eye = (!this.eye)
  }

  async successLogin () {
    if (!this.params.Name) {
      this.$message.error('Please enter your Windows ID')
    } else if (!this.params.Password) {
      this.$message.error('Please enter your password')
    } else if (!this.params.Code) {
      this.$message.error('Please enter the verification code')
    } else {
      const res = await LoginApi.login(this.params)
      if (res.data.Success) {
        userInfo.set(res.data)
        role.set(res.data.Menus)
        this.$router.push({ name: 'content' })
      } else {
        this.$message.error(res.data.Message)
        this.toggleCode()
      }
    }
  }

  resetPassword () {
    this.$router.push({ name: 'PasswordAd' })
  }

  goRegister () {
    this.$router.push({ name: 'RegisterAd' })
  }
}
</script>

<style lang="less" scoped>
  #login {
    height: 100vh;
    background: #000 url(../assets/img/Logo-bg3.jpg) no-repeat;
    background-size: 100% 100%;

    .el-input__prefix {
      i {
        font-size: 20px;

        &.iconfont {
          color: #262626;
          font-size: 22px !important;
        }
      }
    }

    .el-button {
      padding: 11px 10px;
    }

    .el-input__icon {
      line-height: 36px;
    }

    .el-input__inner {
      background: #010203;
      border: 1px solid #010203;
      color: #fff;
      border-radius: 2px;
    }

    i {
      width: 20px;
      color: #333333;
      font-size: 18px;
    }

    input::-webkit-input-placeholder {
      color: #666 !important;
      font-style: oblique;
    }

    .H6Logo {
      position: absolute;
      left: 80px;
      top: 50px;
      width: 200px;

      img {
        width: 100%;
      }
    }

    .LoginRight.active {
      i {
        color: #00ADEF;
      }
    }

    .el-input-group__append {
      background: #1A1A1A;
      border: none;
      cursor: pointer;
    }

    .footer {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      color: #9F9F9F;
      text-align: left;
      height: 50px;
      line-height: 50px;
      padding-left: 100px;
      background: rgba(0, 0, 0, 0.5);
      border-top: 1px solid #555657;
    }

    .LoginDiv {
      color: #F4F4F4;
      margin-top: 15px;
    }

    .loginMessage .spaceBetween {
      margin-bottom: 20px;
    }

    .spaceBetween {
      border-top: 1px solid #3A393A;
      padding-top: 16px;
      display: flex;
      justify-content: space-between;
      margin-top: 16px;

    }

    .ForgotPassword {
      color: #0384a8;
      cursor: pointer;
    }

    .verificationDiv {
      position: relative;

      .VerificationCodeSpan {
        cursor: pointer;
        position: absolute;
        display: inline-block;
        height: 34px;
        width: 60px;
        right: 10px;
        top: 1px;
        font-size: 0
      }

      .el-input__inner {
        padding-right: 80px;

      }
    }

    .el-input__inner {
      background: #010203;
      color: #fff;
      font-weight: normal !important;
    }

    .loginMessage {
      position: absolute;
      top: 50%;
      left: 75%;
      margin-left: -200px;
      margin-top: -287px;
      box-sizing: border-box;
      width: 400px;
      padding: 40px;
      background: rgba(0, 0, 0, 0.5);
      border-top: 2px solid #3D3D3D;

      > div {
        margin-bottom: 16px;
      }

      h2 {
        text-align: left;
        font-size: 40px;
        margin: 0;
        padding: 20px 0;
        font-weight: normal;
        color: #FFFFFF;
      }
    }
  }
</style>
