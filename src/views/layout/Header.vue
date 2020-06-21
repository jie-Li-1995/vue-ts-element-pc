<template>
  <div class="ccw-header">
    <div class="clear-fix">
      <div class="HeaderLogo clear-fix fll">
        <div class="HeaderLogoDiv fll" style="cursor: pointer" @click="toPage('HomePage')">
          <img src="@/assets/img/H6-logo.png" style="height:100%"/>
        </div>
        <div class="HeaderText fll">
          {{pName}}&nbsp;
          <span style="font-size: 14px">{{SystemVersion}}</span>
        </div>
      </div>
      <div class="HeaderBack clear-fix flr">
        <span @click="toPage('InfoEdit')" class="HeaderIcons">
          <i class="icon-info" aria-hidden="true"/>
          Profile
        </span>
        <div style="display: inline-block;border-right: 1px solid #666666">
          <span class="HeaderIcons" style="padding-right: 20px;margin: 0;" @click="GetH6HelpDocument">
            <i class="el-icon-question" style="cursor: pointer;margin-top:2px;"/>
            Help
          </span>
        </div>
        <span @click="LogOut" class="HeaderIcons">
          <i class="icon-exit" aria-hidden="true" style="cursor: pointer;margin-top:1px;"/>
          Exit
        </span>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="800px" style="font-size: 16px">
      <h3 class="EditTitle">About {{SystemName}}</h3>
      <p>For question,suggestion or problems with the database,</p>
      <p>please contact our support:</p>
      <p class="spec clear-fix"><i class="iconfont icon-youxiang fll"></i><a :href="EMailto">{{EMail}}</a></p>
      <p>Or refer to the following guidelines:</p>
      <p class="spec clear-fix" v-for="item in HelpArr" :key="item.Id" @click="goPdf(item.Url)"><i
        class="iconfont icon-shu fll"></i><span class="fll">{{item.NameEn}}</span></p>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { LoginApi } from '@/api'

@Component
export default class CcwHeader extends Vue {
  pName = ''
  SystemVersion = ''
  HelpArr = []
  dialogVisible = false
  SystemName = ''
  EMail = ''
  EMailto = ''

  mounted () {
    this.getSystemName()
  }

  async getSystemName () {
    const res = await LoginApi.GetSystemName()
    if (res.data.Success) {
      this.SystemVersion = res.data.Data.Version || ''
      this.pName = res.data.Data.SystemNameEn || ''
    }
  }

  async GetH6HelpDocument () {
    const res = await LoginApi.GetH6HelpDocument()
    if (res.data.Success) {
      this.HelpArr = res.data.Data.Data || []
      this.SystemName = res.data.Data.SystemName
      this.EMail = res.data.Data.EMail
      this.EMailto = 'mailto:' + res.data.Data.EMail
      this.dialogVisible = true
    }
  }

  goPdf (val?: string) {
    if (val) window.open(val)
  }

  toPage (name: string) {
    this.$router.push({ name })
  }

  LogOut () {
    window.localStorage.clear()
    this.$router.push({ name: 'Login' })
  }
}
</script>

<style lang="less" scoped>
  .ccw-header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 80px;
    background-color: #000;
    color: #fff;
    z-index: 998;

    .el-dialog {
      width: 500px !important;
      min-width: 0;
    }

    .el-dialog__body {
      padding: 30px 20px;
      color: #606266;
      font-size: 18px;

      p {
        i {
          display: inline-block;
          font-size: 20px !important;
          line-height: 25px;
          color: #00677F;
        }

        &.spec {
          padding-left: 30px;
          line-height: 25px;

          > span, a {
            cursor: pointer;
            display: inline-block;
            padding-left: 5px;
            text-decoration: underline;
            color: #00677F;
          }
        }
      }
    }

    #spec {
      position: relative;
      color: #fff;
      font-size: 16px;
      padding-right: 30px;
      height: 20px;
      line-height: 20px;
      margin-right: 0 !important;
      border: none !important;

      > i {
        position: absolute;
        top: -2px;
      }
    }

    .HeaderIcons:nth-child(2) .el-badge.item {
      padding-bottom: 5px;
    }

    .el-badge__content.is-fixed {
      top: 10px;
    }

    .el-badge__content {
      border: none;
      background-color: #ff0000;
    }

    .NoticeSPan {
      color: #00adef;

    }

    .el-table th.el-table-column--selection {
      text-align: center !important;
    }

    .HeaderText {
      display: inline-block;
      line-height: 80px;
      margin-left: 20px;
      font-size: 18px;
    }

    .HeaderLogo {
      .HeaderLogoDiv {
        display: inline-block;
        border-right: 1px solid #2A2A2A;
        height: 50px;
        padding: 0 20px;
        margin-top: 15px;

        img {
          height: 100%;
        }
      }
    }

    .el-menu li {
      border-bottom: 1px solid #5c5c5c;
    }

    .headerLogo {
      text-align: left;
    }

    .HeaderBack {
      text-align: right;
      padding-right: 20px;
      padding-top: 15px;
      padding-bottom: 15px;

      span {
        position: relative;
        display: inline-block;
        line-height: 50px;
        height: 50px;
        cursor: pointer;
        padding-right: 20px;
        margin-right: 10px;
        border-right: 1px solid #666666;
        padding-left: 40px;
      }

      span:last-child {
        padding-right: 0;
        border-right: none;
      }

      span:nth-child(2) {
        padding-right: 30px;
      }

      i {
        cursor: pointer;
        color: #878D99;
        padding: 0 10px;
        position: absolute;
        left: 0;
        top: 12px;
        font-size: 21px;
      }
    }

    .headerToggle {
      span {
        display: inline-block;
        padding: 0 10px;
        cursor: pointer;
      }

      span.active {
        border-bottom: 2px solid #409EFF;
      }
    }
  }
</style>
