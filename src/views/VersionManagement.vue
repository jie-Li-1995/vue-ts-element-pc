<template>
  <div class="version_management">
    <div class="CommentTable NotDifferentBg CommentContainer">
      <el-table stripe border :data="tableData" style="width: 100%">
        <el-table-column label="Operation" width="80">
          <template slot-scope="scope">
            <el-tooltip content="Edit" placement="top">
              <el-button @click.native.prevent="openDialog(scope.row)"
                         type="text" size="small" class="button1"
                         icon="icon-edit"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="Version" label="Display" show-overflow-tooltip></el-table-column>
        <el-table-column prop="ImportTime" label="Import Time" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Status" label="Status" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Name" label="Name" show-overflow-tooltip></el-table-column>
        <el-table-column prop="CompleteTime" label="Complete Time" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
    <div class="block" style="text-align: left;margin-top:20px;">
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
    <div class="filterDialongW">
      <el-dialog :visible.sync="dialogFormVisible" width="60%">
        <h3 class="EditTitle">Edit</h3>
        <div class="chooseTemplate">
          <el-form label-width="130px">
            <el-form-item label="Name:">
              <el-input v-model="EditData.Name"></el-input>
            </el-form-item>
            <el-form-item label="Status:">
              <el-switch
                v-model="EditData.StatusId"
                active-color="#00677f"
                inactive-color="#ddd"
                :active-value="1"
                :inactive-value="0">
              </el-switch>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer borderFooter">
            <el-button @click="SaveSetting">Cancel</el-button>
            <el-button type="primary" @click="SaveSetting(1)">Save</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { pageSize, NormalObject } from '@/utils'
import { VersionManagementApi } from '@/api'

@Component
export default class VersionManagement extends Vue {
  dialogFormVisible = false
  tableData = []
  pageSizes = pageSize
  params: NormalObject = {
    PageIndex: 1,
    PageSize: pageSize[0],
    DataTotalCount: 0
  }

  EditData: NormalObject = {
    Id: '',
    Name: '',
    StatusId: ''
  }

  mounted () {
    this.tableList()
  }

  openDialog (val: NormalObject) {
    this.EditData.Id = val.Id
    this.EditData.Name = val.Name
    this.EditData.StatusId = val.StatusId
    this.dialogFormVisible = true
  }

  async SaveSetting (val = 0) {
    if (val === 0) {
      this.dialogFormVisible = false
    } else {
      const res = await VersionManagementApi.VersionEdit(this.EditData)
      if (res.data.Success) {
        this.$message.success('Save success')
      } else {
        this.$message.error(res.data.Message)
      }
      this.dialogFormVisible = false
      this.tableList()
    }
  }

  async tableList () {
    const res = await VersionManagementApi.VersionData(
      this.params
    )
    if (res.data.Success) {
      this.tableData = res.data.Data || []
      this.params.DataTotalCount = res.data.DataTotalCount || 0
    }
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

</style>
