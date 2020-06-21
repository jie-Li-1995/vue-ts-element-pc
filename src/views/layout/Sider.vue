<template>
  <div class="ccw_sider scroll_line" :class="{active:isCollapse }">
    <div class="right">
      <span class="spanCollapse">
        <i class="icon-menu-open"
           @click="CollapseClick"
           aria-hidden="true"
           style="color:#ffffff"
           v-show="!isCollapse"/>
        <i class="icon-menu-close"
           @click="CollapseClick"
           aria-hidden="true"
           style="color:#ffffff"
           v-show="isCollapse"/>
      </span>
    </div>
    <div style="text-align: left;color:#fff;padding:10px 20px 10px 20px;position:relative;line-height: 18px">
      <span v-show="!isCollapse">Welcome:</span>
      <span class="c-color" style="padding:0 6px;" v-show="!isCollapse">{{userName}}</span>
    </div>
    <div id="heightMenu" ref="elememt">
      <el-menu
        background-color="#3c3c3c"
        text-color="#fff"
        active-text-color="#00adef"
        :default-active="$router.name"
        @select="handleSelect"
        :collapse="isCollapse"
        :unique-opened="true">
        <div
          style="text-align: left;color:#fff;padding:35px 20px 15px 20px"
          v-show="!isCollapse"
          v-role="'View|Edit|Import|DeletedParts'">
          Parts Info Management
        </div>
        <el-menu-item index="ManualInput" v-role="'Edit'">
          <i class="icon-manual" aria-hidden="true"></i>
          <span slot="title"> Parts List</span>
        </el-menu-item>
        <el-menu-item index="VehicleList" v-role="'VehicleList'">
          <i class="fa iconfont icon-qiache" style="font-size:21px!important" aria-hidden="true"></i>
          <span slot="title">Vehicle List（Prototype）</span>
        </el-menu-item>
        <el-menu-item index="PartList" v-role="'PartList'">
          <i class="icon-manual" aria-hidden="true"></i>
          <span slot="title">Parts List</span>
        </el-menu-item>
        <el-menu-item index="DataImport" v-role="'Import'">
          <i class="icon-import" aria-hidden="true"></i>
          <span slot="title"> Import</span>
        </el-menu-item>
        <el-submenu index="ChangeOverView"
                    v-role="'NewAdd|ChangeLog|PartsDelete'">
          <template slot="title">
            <i class="fa iconfont icon-overviewmonitor" aria-hidden="true"></i>
            <span>Change Overview</span>
          </template>
          <el-menu-item index="NewAdd" v-role="'NewAdd'">
            New Added
          </el-menu-item>
          <el-menu-item index="VehicleListChange" v-role="'VehicleListChange'">
            Vehicle List Change
          </el-menu-item>
          <el-menu-item index="ChangeLog" v-role="'ChangeLog'">
            Modification
          </el-menu-item>
          <el-menu-item index="PartsDelete" v-role="'DeletedParts'">
            Deleted Parts
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="ImportReport" v-role="'ImportReport'">
          <i class="icon-import" aria-hidden="true"></i>
          <span slot="title"> Import Report</span>
        </el-menu-item>
        <el-menu-item index="DataAccess" v-role="'DataAccessOverview'">
          <i class="icon-access" aria-hidden="true"></i>
          <span slot="title">Data Access Overview</span>
        </el-menu-item>
        <el-menu-item index="MTReport" v-role="'MTReport'">
          <i class="fa iconfont icon-baogaochaxun" style="font-size: 18px!important;" aria-hidden="true"></i>
          <span slot="title">MT Report</span>
        </el-menu-item>
        <div style="text-align: left;color:#fff;padding:35px 20px 15px 20px"
             v-show="!isCollapse"
             v-role="'AccountList|ApprovalList|RoleView|MessageView|LoginLog|SystemSetting'">
          Administration
        </div>
        <el-submenu index="Account" v-role="'AccountList|ApprovalList'">
          <template slot="title">
            <i class="icon-account" aria-hidden="true"></i>
            <span>Account Management</span>
          </template>
          <el-menu-item index="AccountList" v-role="'AccountList'">Account List
          </el-menu-item>
          <el-menu-item index="ApprovalList" v-role="'ApprovalList'">Approval List
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="RoleView" v-role="'RoleView'">
          <i class="icon-role" aria-hidden="true"></i>
          <span slot="title">Roles Management</span>
        </el-menu-item>
        <el-menu-item index="NoticeMessage" v-role="'NoticeMessage'">
          <i class="fa  el-icon-message-solid" aria-hidden="true" style="font-size:13px;width:21px !important;
                                height:21px;text-align: center;"></i>
          <span slot="title">Change Notice</span>
        </el-menu-item>
        <el-menu-item index="Announcement" v-role="'Announcement'">
          <i class="fa iconfont icon-tongzhi" aria-hidden="true"></i>
          <span slot="title">Announcement</span>
        </el-menu-item>
        <el-menu-item index="ColumnManagement" v-role="'DataEntityProperty'">
          <i class="fa el-icon-s-marketing" aria-hidden="true"></i>
          <span slot="title">Column management</span>
        </el-menu-item>
        <el-menu-item index="ViewTemplate" v-role="'ViewTemplate'">
          <i class="fa iconfont icon-view1" aria-hidden="true"></i>
          <span slot="title">View Template</span>
        </el-menu-item>
        <el-menu-item index="VersionManagement" v-role="'VersionManagement'">
          <i class="fa el-icon-s-flag" aria-hidden="true"></i>
          <span slot="title">Version Management</span>
        </el-menu-item>
        <el-menu-item index="LoginLog" v-role="'LoginLog'">
          <i class="icon-login" aria-hidden="true"></i>
          <span slot="title">Login Log</span></el-menu-item>
        <el-menu-item index="DictionaryManagement" v-role="'DictionaryManagement'">
          <i class="fa iconfont icon-zidian" aria-hidden="true"></i>
          <span slot="title">Dictionary Management</span>
        </el-menu-item>
        <el-menu-item index="EmailSetting" v-role="'EmailSetting'">
          <i class="el-icon-s-data" aria-hidden="true"></i>
          <span slot="title">Email Setting</span>
        </el-menu-item>
        <el-menu-item index="SystemSetting" v-role="'SystemSetting'">
          <i class="icon-system" aria-hidden="true"></i>
          <span slot="title">System Setting</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'

@Component
export default class CcwSider extends Vue {
  userName = ''
  isCollapse = false

  mounted () {
    this.userName = window.localStorage.getItem('userName') || ''
  }

  @Emit('isCollapse')
  emitIsCollapse (): boolean {
    return this.isCollapse
  }

  CollapseClick () {
    this.isCollapse = !this.isCollapse
    this.emitIsCollapse()
  }

  handleSelect (name: string) {
    this.$router.push({ name })
  }
}
</script>

<style lang="less">
  .ccw_sider {
    height: calc(100vh - 80px);
    background: #3c3c3c;
    width: 235px;
    padding-bottom: 50px;
    box-sizing: border-box;
    text-align: left;
    position: relative;

    &.active {
      width: 73px;
      position: relative;

      .right .spanCollapse {
        i {
          left: 20px;
          top: 90px;
        }

      }
    }

    .el-submenu.is-active > div {
      color: rgba(3, 132, 168, 1);
    }

    .fa-save {
      height: 21px;
      text-align: center;
      line-height: 21px;
    }

    .fa-save:before, .fa-floppy-o:before {
      font-size: 17px;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }

    .c-color, .el-menu-item.is-active {
      color: rgba(3, 132, 168, 1) !important;
    }

    .spanCollapse.resetCollapseIcon i {
      left: 174px;
    }

    .right {
      width: 100%;
      height: 62px;
      background: #3c3c3c;

      .spanCollapse {
        display: block;
        height: 62px;
        z-index: 100;

        i {
          position: fixed;
          top: 90px;
          left: 182px;
          z-index: 100;
          height: 30px;
          display: inline-block;
          line-height: 30px;
          background: #242424;
          padding: 6px 10px;
          text-align: center;
          color: #666666;
          cursor: pointer;
        }
      }
    }

    .el-menu-item i {
      padding-right: 20px;
      vertical-align: top;
      display: inline-block;
      line-height: 40px;
    }

    .el-icon-arrow-down {
      color: #fff !important;
    }

    .el-submenu__icon-arrow {
      font-size: 14px;
      margin-top: -5px;
    }

    .el-menu-item:hover {
      background: #222 !important;
    }

    .el-submenu.is-active.is-opened div {
      i, span, .icon-account:before {
        color: rgba(3, 132, 168, 1) !important;
      }

    }

    .el-menu-item.is-active {
      background: #222 !important;
    }

    .el-submenu__title + .el-menu .el-menu-item {
      padding-left: 60px !important;
    }

    .flexDiv {
      display: flex;
    }

    .el-menu {
      border-right: none;
    }

    .el-menu.el-menu-vertical-demo {
      text-align: left
    }

    .el-menu li {
      border-bottom: 1px solid #979797;
    }

    .el-menu .adminMenu > li:last-child, .el-menu .partsMenu > li:last-child {
      border-bottom: 1px solid #979797;

    }

    .el-menu li:last-child {
      border: none;
    }

    .el-submenu__title {
      height: 40px;
      line-height: 40px;
    }

    .el-menu-item, .el-submenu__title {
      height: 40px;
      line-height: 40px;

      i:first-child {
        padding-right: 20px;
      }
    }

    i.fa {
      display: inline-block;
      width: 20px !important;
    }

  }
</style>
