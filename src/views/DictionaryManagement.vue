<template>
  <div class="dictionary_management">
    <div class="CommentTable CommentContainer NotDifferentBg ">
      <div class="batch filterDiv clear-fix">
        <el-button class="SignUpBtn fll" @click="OpenAdd" style="margin-right: 20px">Add New
        </el-button>
        <el-select class="fll inputHeight" style="width: 400px" @change="tableList" v-model="StateId">
          <el-option v-for="item in states" :key="item.Label" :label="item.Label"
                     :value="item.Id"></el-option>
        </el-select>
      </div>
      <template>
        <el-table :data="tableData"
                  stripe
                  border
                  tooltip-effect="dark"
                  style="width: 100%">
          <el-table-column prop="TitleEn" label="SN" width="60" show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column align="center" width="100" label="Operation">
            <template slot-scope="scope">
              <el-tooltip content="Edit" placement="top">
                <el-button type="text" size="small" class="button1" icon="icon-edit"
                           @click="handleClickEdit(scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="Text" label="Text" show-overflow-tooltip></el-table-column>
          <el-table-column prop="Code" label="Value" show-overflow-tooltip></el-table-column>
        </el-table>
      </template>
    </div>
    <div class="commentDialong filterDialongW">
      <el-dialog :visible.sync="dialogVisible2" width="30%">
        <h3 class="EditTitle">Add</h3>
        <div class="createMessage">
          <el-form label-width="80px" label-position="left">
            <el-form-item label="Text">
              <el-input v-model.trim="baseInfo.Text"></el-input>
            </el-form-item>
            <el-form-item label="Value">
              <el-input v-model.trim="baseInfo.Code"></el-input>
            </el-form-item>
            <el-form-item label="Seq.">
              <el-input-number v-model="baseInfo.Sequence" :min="1" :max="tableData.length + 1"></el-input-number>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer borderFooter">
            <el-button @click="dialogVisible2 = false">Cancel</el-button>
            <el-button type="primary" @click="AddSave()">Save</el-button>
          </div>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="dialogVisible" width="30%">
        <h3 class="EditTitle">Edit</h3>
        <div class="createMessage">
          <el-form label-width="50px" label-position="left">
            <el-form-item label="Text">
              <el-input v-model.trim="EditBaseInfo.Text"></el-input>
            </el-form-item>
            <el-form-item label="Value">
              <el-input v-model.trim="EditBaseInfo.Code"></el-input>
            </el-form-item>
            <el-form-item label="Delete">
              <el-switch v-model="EditBaseInfo.StatusId" :active-value="0" :inactive-value="1"></el-switch>
            </el-form-item>
            <el-form-item label="Seq.">
              <el-input-number v-model="EditBaseInfo.Sequence" :min="1" :max="tableData.length"></el-input-number>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer borderFooter">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="EditSave">Save</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { DictionaryManagementApi } from '@/api'

@Component
export default class DictionaryManagement extends Vue {
  StateId = ''
  states = []
  tableData = []
  dialogVisible = false
  dialogVisible2 = false
  baseInfo = {
    Code: '',
    Sequence: 0,
    Text: ''
  }

  EditBaseInfo = {
    Code: '',
    Id: '',
    Sequence: 0,
    StatusId: 0,
    Text: '',
    TypeId: 0
  }

  mounted () {
    this.GetDicOfColumn()
  }

  OpenAdd () {
    this.dialogVisible2 = true
    this.baseInfo.Code = ''
    this.baseInfo.Sequence = this.tableData.length + 1
    this.baseInfo.Text = ''
  }

  async GetDicOfColumn () {
    const res = await DictionaryManagementApi.GetDicOfColumn()
    if (res.data.Success) {
      this.states = res.data.Data.map((item: { Label: string; Alias: string; DisplayName: string }) => {
        item.Label = `(${item.Alias})${item.DisplayName}`
        return item
      })
      this.StateId = (this.states[0] as { Id: string }).Id || ''
      this.tableList()
    }
  }

  handleClickEdit (val: any) {
    this.EditBaseInfo = { ...val }
    this.dialogVisible = true
  }

  async EditSave () {
    if (!this.EditBaseInfo.Text) {
      this.$message.warning('Please enter Text')
      return
    }
    const res = await DictionaryManagementApi.EditDic({
      ...this.EditBaseInfo,
      PropertyId: this.StateId
    })
    if (res.data.Success) {
      this.tableList(0)
      this.dialogVisible = false
    } else {
      this.$message.warning('Modification failed')
    }
  }

  async AddSave () {
    if (!this.baseInfo.Text) {
      this.$message.warning('Please enter Text')
      return
    }
    const res = await DictionaryManagementApi.InsertDic({
      ...this.baseInfo,
      PropertyId: this.StateId
    })
    if (res.data.Success) {
      this.tableList(1)
      this.dialogVisible2 = false
    } else {
      this.$message.warning('Add failed')
    }
  }

  async tableList (val?: number) {
    const res = await DictionaryManagementApi.GetDic({
      params: { PropertyId: this.StateId }
    })
    this.tableData = res.data.Data || []
    if (val === 0) {
      this.$message.success('Modified Success')
    } else if (val === 1) {
      this.$message.success('Add Success')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
