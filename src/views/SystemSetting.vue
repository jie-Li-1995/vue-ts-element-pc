<template>
  <div class='system_setting'>
    <div class="CommentTable NotDifferentBg CommentContainer positionDiv">
      <div class="SystemForm">
        <h3 class="EditTitle">System Setting</h3>
        <el-form ref="params" :model="params" label-width="140px">
          <el-form-item label="System Name:">
            <el-input v-model="params.SystemNameEn" placeholder="System Name"></el-input>
          </el-form-item>
          <el-form-item label="Version:">
            <el-input disabled v-model="params.Version" placeholder="System Name"></el-input>
          </el-form-item>
          <el-form-item label="Support E-mail:">
            <el-input v-model="params.SupportEMail" placeholder="Support E-mail"></el-input>
          </el-form-item>
          <el-form-item label="Mail Password:" class="SettingHost">
            <el-input v-model="params.MailPassword" placeholder="Mail Password"
                      :type="eye ? 'text':'password'"></el-input>
            <div class="LoginRight Settingeyes" :class="{active:eye}" @click.stop="EyeClick">
              <i class="fa fa-eye-slash" aria-hidden="true" v-if="!eye" style="font-size: 18px"></i>
              <i class="fa fa-eye" aria-hidden="true" v-if="eye" style="font-size: 18px"></i>
            </div>
          </el-form-item>
          <el-form-item label="Mail Host:">
            <el-input v-model="params.MailHost" placeholder="Mail Host"></el-input>
          </el-form-item>
          <el-form-item label="Mail Port:">
            <el-input v-model="params.MailPort" placeholder="Mail Host"></el-input>
          </el-form-item>
          <el-form-item label="Mail enable SSL:">
            <el-switch
              v-model="params.MailSSLStatusId"
              active-color="#00677f"
              inactive-color="#ddd"
              :active-value="1"
              :inactive-value="0">
            </el-switch>
          </el-form-item>
          <el-form-item label="MailCopyTo:">
            <el-input v-model="params.MailCopyTo" placeholder="MailCopyTo"></el-input>
          </el-form-item>
          <el-form-item label="Domain Name:">
            <el-input v-model="params.DomainName" placeholder="Mail Host"></el-input>
          </el-form-item>
          <el-form-item label="User default view:">
            <el-select v-model="params.DefaultViewTemplateId" placeholder="Please Select">
              <el-option
                v-for="item in SystemViewTemplates"
                :key="item.Id"
                :label="item.Name"
                :value="item.Id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Buyer role:">
            <el-select v-model="params.BuyerRoleId" clearable placeholder="Please Select">
              <el-option
                v-for="item in AllRoles"
                :key="item.RoleId"
                :label="item.NameEn"
                :value="item.RoleId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Max of uploadfile:">
            <el-input v-model="params.MaxOfFileUpload" placeholder="Max of uploadfile"></el-input>
          </el-form-item>
          <el-form-item label="Data Import Unlock:">
            <el-button class="unlockBtn" @click="unlockClick" size="small">Unlock</el-button>
          </el-form-item>
          <el-form-item label="Vehicle part freeze:">
            <el-button class="freeze" type="primary" @click="AddVehiclePartsVersion" size="small">
              Freeze
            </el-button>
          </el-form-item>
          <el-form-item label="Email Send:">
            <el-switch
              v-model="params.ISSendOut"
              active-color="#00677f"
              inactive-color="#ddd"
              :active-value="1"
              :inactive-value="0">
            </el-switch>
          </el-form-item>
          <el-form-item class="BtnS">
            <el-button type="primary" @click.native="onSubmit" size="small">Save</el-button>
            <el-button @click="Reset" size="small">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { SystemSettingApi } from '@/api'

@Component
export default class SystemSetting extends Vue {
  eye = false
  SystemViewTemplates = []
  AllRoles = []
  params = {
    Id: '',
    MailHost: '',
    MailPassword: '',
    type: [],
    SupportEMail: '',
    SystemNameEn: '',
    DomainName: '',
    MailCopyTo: '',
    Version: '', // 新加的五个属性
    MailPort: '',
    BuyerRoleId: '',
    MailSSLStatusId: '',
    MaxOfFileUpload: '',
    DefaultViewTemplateId: '',
    ISSendOut: 0
  }

  mounted () {
    this.tableList()
  }

  AddVehiclePartsVersion () {
    this.$confirm(
      'Are you sure you want to freeze the current data?',
      'Tips',
      {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(async () => {
      const res = await SystemSettingApi.AddVehiclePartsVersion()
      if (res.data.Success) {
        this.$message.success(res.data.Message)
      } else {
        this.$message.error(res.data.Message)
      }
    }).catch(() => {
      this.$message({
        type: 'info',
        message: 'Canceled deletion'
      })
    })
  }

  async unlockClick () {
    const res = await SystemSettingApi.Unlock()
    if (res.data.Success) {
      this.$message.success(res.data.Message)
    } else {
      this.$message.error(res.data.Message)
    }
  }

  async tableList () {
    const res = await SystemSettingApi.GetSystemConfig()
    if (res.data.Data) {
      this.params = res.data.Data
    }
  }

  EyeClick () {
    this.eye = !this.eye
  }

  emailCheck () {
    const reg = /^$|([a-zA-Z0-9]+.*[a-zA-Z0-9]+)+@(([a-zA-Z0-9-])+)+(\.[a-zA-Z]{2,6})(\.[a-zA-Z]{2})?$/
    return reg.test(this.params.SupportEMail)
  }

  async onSubmit () {
    const match = /^(https|http):\/\/([\w-]+)+([\w-.,@?^=%&:/~+#]*[\w-@?^=%&/~+#])?$/
    const IsNum = /^[0-9]+.?[0-9]*$/
    if (this.params.SystemNameEn === '') {
      this.$message.error('Please enter the System name')
    } else if (this.params.SupportEMail === '') {
      this.$message.error('Please enter Support E-mail address')
    } else if (!this.emailCheck()) {
      this.$message.error('Please enter the correct Support E-mail')
    } else if (this.params.MailPassword === '') {
      this.$message.error('Please enter the password of your mailbox')
    } else if (this.params.MailHost === '') {
      this.$message.error('Please enter host of your mainbox')
    } else if (!IsNum.test(this.params.MailPort)) {
      this.$message.error('Port of your mainbox is Invalid')
    } else if (this.params.DomainName === '') {
      this.$message.error('Please enter host of your mainbox')
    } else if (!match.test(this.params.DomainName)) {
      this.$message.error('Domain Name format is incorrect')
    } else if (this.params.DefaultViewTemplateId === '') {
      this.$message.error('Please select User default view')
    } else {
      const res = await SystemSettingApi.SaveSystemConfig(this.params)
      if (res.data.Success) {
        this.$message.success('Data modification success')
      } else {
        this.$message.error(res.data.Message)
      }
    }
  }

  Reset () {
    this.tableList()
  }
}
</script>

<style lang='less' scoped>
  .system_setting {
    .freeze {
      border-radius: 4px;
      height: 30px !important;
    }

    .el-button--default.unlockBtn {
      background: #fff;
      border: 2px solid #E6E6E6;
      border-radius: 4px;
    }

    .el-button--default.unlockBtn:hover {
      border: 2px solid #FF3535;

      i {
        color: #000;
      }
    }

    .SettingHost {
      position: relative;
    }

    .Settingeyes {
      position: absolute;
      right: 0;
      top: 2px;
      height: 36px;
      padding: 0 20px;
      background: #ddd;
      cursor: pointer;
    }

    .Settingeyes.active {
      color: #00adef;
    }

    .BtnS {
      border-top: 2px solid #E6E6E6;
      padding-top: 20px;
      margin-top: 20px;
      margin-bottom: 0;

      div {
        text-align: right;
      }
    }

    .el-form-item__label {
      width: 140px !important;
      text-align: left;
    }

    .el-form-item__content {
      margin-left: 140px !important;

      .el-select {
        width: 100%;
      }

    }

    .SystemForm {
      width: 600px;
      background: #fff;
      padding: 20px 20px;
      box-shadow: 1px 1px 5px 2px #ddd;
      margin: 0 auto;

      .el-form {
        width: 100%;
      }
    }

    .flex {
      display: flex;

      > div {
        height: 40px;
        line-height: 40px;
        margin-right: 10px;
        margin-bottom: 16px;
      }

      > div:first-child {
        width: 160px;
        text-align: left;
      }
    }
  }
</style>
