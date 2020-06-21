<template>
  <div class="announcement">
    <div class="batch filterDiv clear-fix">
      <el-button v-if="$route.name === 'AnnouncementMenu'" class="SignUpBtn fll"
                 @click="dialogVisible2 = true" style="margin-right: 20px">Add New
      </el-button>
      <el-select class="fll inputHeight" style="width: 200px" @change="tableList"
                 v-model="page.Status">
        <el-option v-for="item in states" :key="item.Value" :label="item.Text"
                   :value="item.Value"></el-option>
      </el-select>
    </div>
    <el-table :data="tableData"
              stripe
              border
              tooltip-effect="dark"
              style="width: 100%">
      <el-table-column align="center" width="120" label="Operation">
        <template slot-scope="scope">
          <el-tooltip content="Edit" placement="top" v-if="$route.name === 'AnnouncementMenu'">
            <el-button type="text" size="small" class="button1" icon="icon-edit"
                       @click="handleClickEdit(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip content="View" placement="top">
            <el-button @click.native.prevent="handleView(scope.row)"
                       type="text" size="small" class="button1" icon="icon-view">
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="TitleEn" label="Title" show-overflow-tooltip></el-table-column>
      <el-table-column prop="SubTitleEn" label="SubTitle" show-overflow-tooltip></el-table-column>
      <el-table-column prop="AuthorEn" label="Author" show-overflow-tooltip></el-table-column>
      <el-table-column prop="ShowStartTime" label="ShowStartTime" show-overflow-tooltip>
        <template slot-scope="scope"
                  v-if="scope.row.ShowStartTime!== null && scope.row.ShowStartTime!== undefined && scope.row.ShowStartTime!== ''">
          {{scope.row.ShowStartTime}}
        </template>
      </el-table-column>
      <el-table-column prop="ShowEndTime" label="ShowEndTime" show-overflow-tooltip>
        <template slot-scope="scope"
                  v-if="scope.row.ShowEndTime!== null && scope.row.ShowEndTime!== undefined && scope.row.ShowEndTime!== ''">
          {{scope.row.ShowEndTime}}
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="text-align: left;margin-top:20px;">
      <el-pagination
        @size-change="val => handleSizeChange(val, tableList)"
        @current-change="val => handleCurrentChange(val, tableList)"
        :current-page="currentPage4"
        :page-sizes="pageSizes"
        :page-size="page.PageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="DataTotalCount">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogVisible2" width="60%" :before-close="handleClose">
      <h3 class="EditTitle">Add</h3>
      <div class="createMessage">
        <el-form label-width="80px" label-position="left">
          <el-form-item label="Title">
            <el-input v-model.trim="baseInfo.TitleEn"></el-input>
          </el-form-item>
          <el-form-item label="SubTitle">
            <el-input v-model.trim="baseInfo.SubTitleEn"></el-input>
          </el-form-item>
          <el-form-item label="Author">
            <el-input v-model.trim="baseInfo.AuthorEn"></el-input>
          </el-form-item>
          <el-form-item label="ShowTime">
            <div class="clear-fix">
              <el-date-picker style="margin-right: 20px;" class="fll" v-model="baseInfo.ShowStartTime"
                              type="date"
                              placeholder="Select Start Date"></el-date-picker>
              <el-date-picker class="fll" v-model="baseInfo.ShowEndTime" type="date"
                              placeholder="Select End Date"></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="Content">
            <el-input v-model.trim="baseInfo.ContentEn" type="textarea"
                      :autosize="{ minRows: 3, maxRows: 6}"></el-input>
          </el-form-item>
          <el-form-item label="IsTop">
            <el-switch v-model="baseInfo.TopStatusId" active-color="#00677f" inactive-color="#ddd"
                       :active-value="1" :inactive-value="0"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer borderFooter">
          <el-button @click="dialogVisible2 = false">Cancel</el-button>
          <el-button type="primary" @click="SaveTest">Save</el-button>
          <el-button type="primary" @click="SaveTest(1)">Publish</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
      <h3 class="EditTitle">Edit</h3>
      <div class="createMessage">
        <el-form label-width="80px" label-position="left">
          <el-form-item label="Title">
            <el-input v-model.trim="EditBaseInfo.TitleEn"></el-input>
          </el-form-item>
          <el-form-item label="SubTitle">
            <el-input v-model.trim="EditBaseInfo.SubTitleEn"></el-input>
          </el-form-item>
          <el-form-item label="Author">
            <el-input v-model.trim="EditBaseInfo.AuthorEn"></el-input>
          </el-form-item>
          <el-form-item label="ShowTime">
            <div class="clear-fix">
              <el-date-picker style="margin-right: 20px;" class="fll"
                              v-model="EditBaseInfo.ShowStartTime" type="date"
                              placeholder="Select Start Date"></el-date-picker>
              <el-date-picker class="fll" v-model="EditBaseInfo.ShowEndTime" type="date"
                              placeholder="Select End Date"></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="Content">
            <el-input v-model.trim="EditBaseInfo.ContentEn" type="textarea"
                      :autosize="{ minRows: 3, maxRows: 6}"></el-input>
          </el-form-item>
          <el-form-item label="IsTop">
            <el-switch v-model="EditBaseInfo.TopStatusId" active-color="#00677f" inactive-color="#ddd"
                       :active-value="1" :inactive-value="0"></el-switch>
          </el-form-item>
          <el-form-item label="States">
            <el-select class="fll" style="width: 200px;margin-left: 20px;"
                       v-model="EditBaseInfo.StatusId">
              <el-option v-for="item in states" :key="item.Value" :label="item.Text"
                         :value="item.Value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer borderFooter">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="SaveTest2">Save</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="viewDialog" width="60%" :before-close="handleClose">
      <h3 class="EditTitle">View</h3>
      <div class="createMessage">
        <h2 style="font-size: 25px;line-height: 1.5em;text-align: center;margin: 0;">
          {{viewBaseInfo.TitleEn}}
        </h2>
        <h3 style="font-size: 16px;line-height: 1.5em;text-align: center;margin: 0;">
          {{viewBaseInfo.SubTitleEn}}
        </h3>
        <h4 style="font-size: 16px;line-height: 1.5em;text-align: center;margin: 0;">
          {{viewBaseInfo.AuthorEn}}
        </h4>
        <p
          style="font-size: 14px;line-height: 1.5em;margin: 0 0 20px 0;text-indent:28px"
          v-for="item in viewBaseInfo.ContentEn" :key="item.ContentEn">
          {{item}}
        </p>
        <div slot="footer" class="dialog-footer borderFooter">
          <el-button @click="viewDialog = false">Close</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { AnnouncementApi } from '@/api'
import { NormalObject, pageSize } from '@/utils'
import moment from 'moment'
import MyMixins from '@/components/ mixins'

@Component
export default class Announcement extends Mixins(MyMixins) {
  dialogVisible = false
  dialogVisible2 = false
  pageSizes = pageSize
  currentPage4 = 1
  DataTotalCount = 0
  tableData = []
  viewDialog = false
  viewBaseInfo: NormalObject = {}
  loading = false
  states = []
  baseInfo = {
    TitleEn: '',
    SubTitleEn: '',
    AuthorEn: '',
    TopStatusId: 0,
    ContentEn: '',
    ShowEndTime: '',
    ShowStartTime: ''
  }

  EditBaseInfo: NormalObject = {
    TitleEn: '',
    SubTitleEn: '',
    AuthorEn: '',
    TopStatusId: 0,
    ContentEn: '',
    ShowEndTime: '',
    ShowStartTime: '',
    StatusId: ''
  }

  mounted () {
    this.GetStatus()
    if (this.$route.query.Id) {
      this.getDetail()
    }
  }

  async getDetail () {
    const res = await AnnouncementApi.GetNotificationById({
      Id: this.$route.query.Id
    })
    if (res.data.Success) {
      this.viewDialog = true
      this.viewBaseInfo = res.data.Data
      this.viewBaseInfo.ContentEn = (this.viewBaseInfo.ContentEn as string).split('\n')
    } else {
      this.$message.error(res.data.Message)
    }
  }

  handleView (val: NormalObject) {
    this.viewBaseInfo = { ...val, StatusId: val.Status.toString(), TopStatusId: val.TopStatus }
    this.viewBaseInfo.ContentEn = (this.viewBaseInfo.ContentEn as string).split('\n')
    this.viewDialog = true
  }

  handleClose (done: Function) {
    this.baseInfo = {
      TitleEn: '',
      SubTitleEn: '',
      AuthorEn: '',
      TopStatusId: 0,
      ContentEn: '',
      ShowEndTime: '',
      ShowStartTime: ''
    }
    this.EditBaseInfo = {
      TitleEn: '',
      SubTitleEn: '',
      AuthorEn: '',
      TopStatusId: 0,
      ContentEn: '',
      ShowEndTime: '',
      ShowStartTime: '',
      StatusId: ''
    }
    done()
  }

  handleClickEdit (val: NormalObject) {
    this.EditBaseInfo = { ...val, StatusId: val.Status.toString(), TopStatusId: val.TopStatus }
    this.dialogVisible = true
  }

  SaveTest2 () {
    if (!this.EditBaseInfo.TitleEn) {
      this.$message.warning('Please enter Title')
    } else {
      this.saveEdit()
    }
  }

  SaveTest (val = 0) {
    if (!this.baseInfo.TitleEn) {
      this.$message.warning('Please enter Title')
    } else {
      if (val === 0) this.saveAdd()
      else this.publishAdd()
    }
  }

  async GetStatus () {
    const res = await AnnouncementApi.GetStatus(this.EditBaseInfo)
    if (res.data.Success) {
      this.states = res.data.Data
      this.page.Status = res.data.Data[1].Value
      this.tableList()
    } else {
      this.$message.warning(res.data.Message)
    }
  }

  async saveEdit () {
    const res = await AnnouncementApi.EditAnnouncement({
      ...this.EditBaseInfo,
      ShowEndTime: moment((this.EditBaseInfo.ShowEndTime as string)).format('L'),
      ShowStartTime: moment((this.EditBaseInfo.ShowStartTime as string)).format('L')
    })
    if (res.data.Success) {
      this.$message.success('Success')
      this.tableList()
    } else {
      this.$message.warning(res.data.Message)
    }
  }

  async publishAdd () {
    const res = await AnnouncementApi.PublishAnnouncement({
      ...this.baseInfo,
      ShowEndTime: moment(this.baseInfo.ShowEndTime).format('L'),
      ShowStartTime: moment(this.baseInfo.ShowStartTime).format('L')
    })
    if (res.data.Success) {
      this.$message.success('Success')
      this.tableList()
    } else {
      this.$message.warning(res.data.Message)
    }
  }

  async saveAdd () {
    const res = await AnnouncementApi.AddAnnouncement({
      ...this.baseInfo,
      ShowEndTime: moment(this.baseInfo.ShowEndTime).format('L'),
      ShowStartTime: moment(this.baseInfo.ShowStartTime).format('L')
    })
    if (res.data.Success) {
      this.$message.success('Success')
      this.tableList()
    } else {
      this.$message.warning(res.data.Message)
    }
  }

  async tableList () {
    const res = await AnnouncementApi.GetNotificationByPage({
      PageIndex: this.page.PageIndex,
      PageSize: this.page.PageSize,
      Statues: [this.page.Status]
    })
    if (res.data.Success) {
      this.tableData = res.data.Data
      this.tableData.forEach((item: NormalObject) => {
        item.ShowEndTime = item.ShowEndTime ? moment((item.ShowEndTime as string)).format('L') : item.ShowEndTime
        item.ShowStartTime = item.ShowStartTime ? moment((item.ShowStartTime as string)).format('L') : item.ShowStartTime
      })
      this.DataTotalCount = res.data.DataTotalCount
    } else {
      this.tableData = []
    }
    this.loading = false
  }
}
</script>

<style lang="less" scoped>

</style>
