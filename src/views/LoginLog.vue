<template>
  <div class="login_log">
    <div class="CommentTable NotDifferentBg CommentContainer">
      <div class="batch filterDiv" style="min-height: 32px;">
        <el-tooltip content="Search" placement="top">
                 <span class="filterIcon" @click="openDialog" :class="{heightLightIcon:heightLightIcon}">
                       <i class="fa el-icon-search" aria-hidden="true"></i>
                  </span>
        </el-tooltip>
      </div>
      <el-table stripe border :data="tableData" style="width: 100%">
        <el-table-column prop="Name" label="Windows ID"></el-table-column>
        <el-table-column prop="Display" label="Display name"></el-table-column>
        <el-table-column prop="LoginTime" label="Login Time"></el-table-column>
      </el-table>
      <div v-if="tableData.length>0" class="block" style="text-align: left;margin-top:20px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="params.PageIndex"
          :page-sizes="pageSizes"
          :page-size="params.PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="params.DataTotalCount">
        </el-pagination>
      </div>
    </div>
    <div class="filterDialongW">
      <el-dialog :visible.sync="dialogFormVisible">
        <h3 class="EditTitle" v-if="filterModal">Search</h3>
        <h3 class="EditTitle" v-if="!filterModal">Edit</h3>
        <div class="CommentForm" v-if="filterModal">
          <el-form ref="form" :model="params" label-width="90px">
            <el-form-item label="Windows ID:">
              <el-input v-model="params.Name" @keyup.enter.native="ConfirmBtn(1)"></el-input>
            </el-form-item>
            <el-form-item label="Time:">
              <el-date-picker
                :editable="false"
                v-model="value03" type="daterange"
                @change="setTrainingTime03" ref="value03" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer borderFooter">
            <el-button @click="ConfirmBtn(0)">Clear</el-button>
            <el-button type="primary" @click="ConfirmBtn(1)">Search</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { pageSize, NormalObject } from '@/utils'
import { LoginLogApi } from '@/api'

@Component
export default class LoginLog extends Vue {
  pageSizes: number[] = pageSize
  heightLightIcon = false
  dialogFormVisible = false
  filterModal = false
  tableData = []
  value03: string[] = []
  params: NormalObject = {
    Name: '',
    PageIndex: 1,
    PageSize: 20,
    LoginTimeStart: '',
    LoginTimeEnd: '',
    DataTotalCount: 0
  }

  mounted () {
    this.tableList()
    this.getDefaultTime()
  }

  getDefaultTime () {
    const data = new Date()
    const curDate = (new Date()).getTime()
    const day14 = 14 * 24 * 3600 * 1000
    const day = curDate - day14
    const data2 = new Date(day)
    const endTime = data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate()
    const startTime = data2.getFullYear() + '-' + (data2.getMonth() + 1) + '-' + data2.getDate()
    this.params.LoginTimeStart = startTime
    this.params.LoginTimeEnd = endTime
    this.value03 = [startTime, endTime]
  }

  async tableList () {
    const res = await LoginLogApi.GetLogs({
      LoginTimeEnd: encodeURIComponent(this.params.LoginTimeEnd as string),
      LoginTimeStart: encodeURIComponent(this.params.LoginTimeStart as string),
      Name: encodeURIComponent(this.params.Name as string),
      PageIndex: this.params.PageIndex,
      PageSize: this.params.PageSize
    })
    if (res.data.Success) {
      this.tableData = res.data.Data || []
      this.params.DataTotalCount = res.data.DataTotalCount || 0
    }
  }

  ConfirmBtn (val: number) {
    if (val === 1) {
      this.params.PageIndex = 1
      this.tableList()
      this.dialogFormVisible = false
      this.heightLightIcon = this.isFilter()
    } else {
      this.clearFilter()
    }
  }

  isFilter () {
    const arr = ['Name', 'LoginTimeStart', 'LoginTimeEnd']
    let num = 0
    arr.forEach((el: string) => {
      if (this.params[el]) num++
    })
    return num > 0
  }

  clearFilter () {
    this.params.Name = ''
    this.params.LoginTimeStart = ''
    this.params.LoginTimeEnd = ''
    this.value03 = []
  }

  setTrainingTime03 (val: string[]) {
    this.params.LoginTimeStart = val[0] || ''
    this.params.LoginTimeEnd = val[1] || ''
  }

  openDialog () {
    this.dialogFormVisible = true
    this.filterModal = true
  }

  handleSizeChange (val: number) {
    this.params.PageSize = val
    this.tableList()
  }

  handleCurrentChange (val: number) {
    this.params.PageIndex = val
    this.tableList()
  }
}
</script>

<style lang="less" scoped>
  .login_log {
  }
</style>
