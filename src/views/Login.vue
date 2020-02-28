<template>
  <div class="login">
    <div class="wrap">
      <div class="showLogo">
        <img class="logo" src="@/assets/img/Logo.jpg" alt=""/>
        <div class="text">
          <p>Welcome to </p>
          <p>Siemens SFLL</p>
        </div>
      </div>
      <div class="loginBox">
        <p>LOGIN</p>
        <p>It’s so nice to see you！</p>
        <el-input
          class="item"
          ref="username"
          v-model.trim="params.Name"
          placeholder="UserName"
          autofocus="autofocus"
        />
        <el-input
          class="item"
          ref="password"
          v-model.trim="params.Password"
          type="Password"
          placeholder="Password"
          @keyup.enter="login"
        />
        <el-button v-if="clickedLogin" class="btn" icon="el-icon-loading" disabled>Login</el-button>
        <el-button v-else class="btn" @click="beforeLogin">Login</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { LoginApi } from '@/api/index.ts'
import { Component, Vue, Ref } from 'vue-property-decorator'
import { Input } from 'element-ui'

interface BaseObject {
  Language: string;

  [propName: string]: string | number | boolean;
}

@Component
export default class Login extends Vue {
  clickedLogin = false
  params: BaseObject = {
    Language: 'zh',
    Name: '',
    Password: ''
  }

  @Ref('username') ref_username!: Input
  @Ref('password') ref_password!: Input

  mounted (): void {
    console.log(Input)
    console.log(this)
  }

  beforeLogin () {
    this.clickedLogin = true
    if (!this.params.Name) {
      this.$message.warning('Please  enter UserName')
      this.clickedLogin = false
      this.ref_username.focus()
      console.log(this.ref_username)
    } else if (!this.params.Password) {
      this.$message.warning('Please  enter Password')
      this.clickedLogin = false
      this.ref_password.focus()
    } else {
      this.login()
    }
  }

  async login () {
    try {
      const res = await LoginApi.SFLLLogin(this.params)
      if (res.data.Success) {
        window.localStorage.setItem('userInfo', JSON.stringify(res.data))
        window.localStorage.setItem('role', res.data.role)
        this.$router.push({ name: 'Welcome' })
      } else {
        this.$message.error(res.data.Message)
        this.clickedLogin = false
      }
    } catch (e) {
      this.clickedLogin = false
    }
  }
}
</script>

<style lang="less" scoped>
  .login {
    height: 100vh;
    background-image: url(../assets/img/bg1.jpg);
    background-size: 100% 100%;

    .wrap {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 1440px;

      .showLogo {
        float: left;
        position: relative;
        width: 742px;
        height: 540px;
        margin-right: 1px;
        background-image: url(../assets/img/login-show.png);

        .logo {
          position: absolute;
          top: 22px;
          left: 28px;
        }

        .text {
          position: absolute;
          top: 311px;
          left: 53px;
          color: #fff;
          text-align: left;

          p:first-child {
            font-size: 50px;
            line-height: 60px;
          }

          p:last-child {
            font-size: 40px;
            line-height: 60px;
          }
        }
      }

      .loginBox {
        float: left;
        width: 522px;
        height: 540px;
        text-align: left;
        padding: 163px 0 0 58px;
        box-sizing: border-box;

        p:first-child {
          color: #475669;
          font-size: 24px;
          line-height: 29px;
          margin-bottom: 3px;
        }

        p:nth-child(2) {
          color: #879BAA;
          font-size: 16px;
          line-height: 19px;
          margin-bottom: 18.6px;
        }

        .item {
          width: 401px;
          height: 44px;
          border-radius: 4px;
          border: 1px solid #EBF0F5;
          margin-bottom: 12px;
          font-size: 14px;
          line-height: 17px;
          padding: 11px 0 16px 16px;
          box-sizing: border-box;
          color: #879BAA;
          outline: none;
        }

        .btn {
          width: 162px;
          height: 45px;
          background-image: linear-gradient(-90deg, #50BEBE 0%, #009999 39%, #0099CB 69%, #0099B0 100%);
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.32);
          border-radius: 4px;
          color: #fff;
          font-size: 16px;
          margin-left: 239px;

          &.el-button.is-disabled {
            border-color: #BECDD7 !important;
          }
        }
      }
    }
  }
</style>
